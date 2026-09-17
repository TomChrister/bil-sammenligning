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

export async function hentKjoretoydata(kjennemerke: string): Promise<KjoretoydataResponse> {
  if (!AUTOSYS_HOST || !AUTOSYS_API_KEY) {
    throw new AutosysError("AUTOSYS_HOST/AUTOSYS_API_KEY er ikke satt i miljøvariabler");
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
