/**
 * Felles døgngrense for kall mot Autosys, på tvers av alle Vercel-instanser.
 *
 * Statens vegvesen gir 50 000 kall i døgnet. Rate limiten per IP stopper ikke
 * noen som bruker mange IP-adresser, så denne telleren er siste skanse: ved
 * DAILY_LIMIT stopper vi selv, med margin, før kvoten er brukt opp for alle.
 *
 * Telleren ligger i Upstash Redis (KV_REST_API_URL / KV_REST_API_TOKEN). På
 * Vercel nekter vi oppslag hvis Redis mangler eller ikke svarer, i stedet for å
 * slippe kall gjennom uten telling. Lokalt, uten Redis, telles det i minnet.
 */
export const DAILY_LIMIT = 40_000;

// Nøkkelen lever i to døgn, så den rekker å utløpe selv rundt midnatt.
const KEY_TTL_SECONDS = 2 * 24 * 60 * 60;
const REDIS_TIMEOUT_MS = 2000;

export class KvoteBruktOpp extends Error {
  constructor() {
    super("Døgngrensen for Autosys-kall er nådd");
    this.name = "KvoteBruktOpp";
  }
}

export class KvoteUtilgjengelig extends Error {
  constructor(message: string) {
    super(message);
    this.name = "KvoteUtilgjengelig";
  }
}

// Døgnet regnes i norsk tid, ikke serverens UTC-klokke.
function dagsnokkel(now = new Date()): string {
  const dato = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Oslo" }).format(now);
  return `autosys:${dato}`;
}

async function tellIRedis(url: string, token: string, key: string): Promise<number> {
  let res: Response;
  try {
    res = await fetch(`${url}/multi-exec`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(KEY_TTL_SECONDS)],
      ]),
      signal: AbortSignal.timeout(REDIS_TIMEOUT_MS),
    });
  } catch (err) {
    throw new KvoteUtilgjengelig(`Fikk ikke kontakt med Redis: ${(err as Error).name}`);
  }

  if (!res.ok) {
    throw new KvoteUtilgjengelig(`Redis svarte med status ${res.status}`);
  }

  const svar = (await res.json().catch(() => null)) as { result?: unknown }[] | null;
  const antall = svar?.[0]?.result;
  if (typeof antall !== "number") {
    throw new KvoteUtilgjengelig("Uventet svar fra Redis");
  }
  return antall;
}

const minneteller = new Map<string, number>();

/** Teller ett Autosys-kall. Kaster hvis døgngrensen er nådd eller telleren ikke virker. */
export async function taKvote(): Promise<void> {
  const key = dagsnokkel();
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  let antall: number;
  if (url && token) {
    antall = await tellIRedis(url, token, key);
  } else if (process.env.VERCEL) {
    throw new KvoteUtilgjengelig("KV_REST_API_URL/KV_REST_API_TOKEN er ikke satt");
  } else {
    antall = (minneteller.get(key) ?? 0) + 1;
    minneteller.clear();
    minneteller.set(key, antall);
  }

  if (antall > DAILY_LIMIT) {
    throw new KvoteBruktOpp();
  }
}
