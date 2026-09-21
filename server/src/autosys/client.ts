import type { components } from "./types.generated";

export type KjoretoydataResponse = components["schemas"]["KjoretoydataResponse"];

const AUTOSYS_HOST = process.env.AUTOSYS_HOST;
const AUTOSYS_API_KEY = process.env.AUTOSYS_API_KEY;

export class AutosysError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "AutosysError";
  }
}

// Skilles ut fra AutosysError fordi dette er en oppsettsfeil hos oss (mangler
// miljøvariabler), ikke noe galt med selve kallet mot Statens vegvesen.
export class AutosysKonfigurasjonsfeil extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AutosysKonfigurasjonsfeil";
  }
}

const MAX_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 300;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Nettverksfeil (f.eks. ECONNRESET) og 5xx fra Autosys er som regel forbigående,
// mens 4xx (ugyldig kjennemerke, manglende tilgang osv.) og oppsettsfeil hos oss
// blir ikke bedre av å prøve igjen.
function erTransientFeil(err: unknown): boolean {
  if (err instanceof AutosysKonfigurasjonsfeil) {
    return false;
  }
  if (err instanceof AutosysError) {
    return err.status !== undefined && err.status >= 500;
  }
  return true;
}

async function hentKjoretoydataUtenRetry(kjennemerke: string): Promise<KjoretoydataResponse> {
  if (!AUTOSYS_HOST || !AUTOSYS_API_KEY) {
    throw new AutosysKonfigurasjonsfeil("AUTOSYS_HOST/AUTOSYS_API_KEY er ikke satt i miljøvariabler");
  }

  const url = new URL("/enkeltoppslag/kjoretoydata", AUTOSYS_HOST);
  url.searchParams.set("kjennemerke", kjennemerke);

  const res = await fetch(url, {
    headers: {
      "SVV-Authorization": `Apikey ${AUTOSYS_API_KEY}`,
      Accept: "application/json",
    },
  });

  // Autosys svarer 204 (tomt body) når kjennemerket ikke finnes.
  if (res.status === 204) {
    return { kjoretoydataListe: [] };
  }

  if (!res.ok) {
    throw new AutosysError(`Autosys svarte med feilkode`, res.status);
  }

  return (await res.json()) as KjoretoydataResponse;
}

export async function hentKjoretoydata(kjennemerke: string): Promise<KjoretoydataResponse> {
  for (let forsok = 0; ; forsok++) {
    try {
      return await hentKjoretoydataUtenRetry(kjennemerke);
    } catch (err) {
      if (forsok >= MAX_RETRIES || !erTransientFeil(err)) {
        throw err;
      }
      await sleep(RETRY_BASE_DELAY_MS * 2 ** forsok);
    }
  }
}
