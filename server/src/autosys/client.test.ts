import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// client.ts leser miljøvariablene når modulen lastes, så den importeres på nytt per test.
async function lastKlient() {
  vi.resetModules();
  return import("./client");
}

function mockFetch(...svar: Response[]) {
  const fetchMock = vi.fn();
  for (const s of svar) fetchMock.mockResolvedValueOnce(s);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

beforeEach(() => {
  vi.stubEnv("AUTOSYS_HOST", "https://autosys.example");
  vi.stubEnv("AUTOSYS_API_KEY", "hemmelig");
  // Uten Redis og utenfor Vercel telles kvoten i minnet, uten fetch.
  vi.stubEnv("KV_REST_API_URL", "");
  vi.stubEnv("KV_REST_API_TOKEN", "");
  vi.stubEnv("VERCEL", "");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("hentKjoretoydata", () => {
  it("prøver én gang til etter 5xx og returnerer svaret", async () => {
    const fetchMock = mockFetch(
      new Response("", { status: 503 }),
      new Response(JSON.stringify({ kjoretoydataListe: [] }), { status: 200 }),
    );
    const { hentKjoretoydata } = await lastKlient();

    await expect(hentKjoretoydata("EB11111")).resolves.toEqual({ kjoretoydataListe: [] });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("prøver ikke på nytt etter 4xx, så kvoten ikke brukes dobbelt", async () => {
    const fetchMock = mockFetch(new Response("", { status: 404 }));
    const { hentKjoretoydata, AutosysError } = await lastKlient();

    await expect(hentKjoretoydata("EB11111")).rejects.toBeInstanceOf(AutosysError);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("kaller ikke Autosys når konfigurasjonen mangler", async () => {
    vi.stubEnv("AUTOSYS_HOST", "");
    const fetchMock = mockFetch();
    const { hentKjoretoydata, AutosysKonfigurasjonsfeil } = await lastKlient();

    await expect(hentKjoretoydata("EB11111")).rejects.toBeInstanceOf(AutosysKonfigurasjonsfeil);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
