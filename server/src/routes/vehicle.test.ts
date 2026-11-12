import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { createApp } from "../app";
import { AutosysError, AutosysKonfigurasjonsfeil, hentKjoretoydata } from "../autosys/client";
import { KvoteBruktOpp, KvoteUtilgjengelig } from "../autosys/dailyQuota";

vi.mock("../autosys/client", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../autosys/client")>()),
  hentKjoretoydata: vi.fn(),
}));

const hentMock = vi.mocked(hentKjoretoydata);

let server: Server;
let url: string;

beforeAll(async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  server = createApp().listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  url = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api/vehicle`;
});

afterAll(() => {
  server.close();
  vi.restoreAllMocks();
});

// Hver test bruker sitt eget kjennemerke, ellers treffer den cachen fra en annen test.
async function slaOpp(kjennemerke: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kjennemerke }),
  });
  return { status: res.status, body: await res.json() };
}

describe("POST /api/vehicle", () => {
  it("avviser ugyldig kjennemerke med 400", async () => {
    expect(await slaOpp("EB-11111")).toEqual({
      status: 400,
      body: { ok: false, error: "Ugyldig kjennemerke" },
    });
    expect(hentMock).not.toHaveBeenCalled();
  });

  it("returnerer kjøretøyet, og bruker cachen ved neste oppslag", async () => {
    hentMock.mockResolvedValueOnce({ kjoretoydataListe: [{}] });
    const forste = await slaOpp("aa 10001");
    expect(forste.status).toBe(200);
    expect(forste.body).toMatchObject({ ok: true, vehicle: { kjennemerke: "AA10001" } });

    hentMock.mockClear();
    expect((await slaOpp("AA10001")).status).toBe(200);
    expect(hentMock).not.toHaveBeenCalled();
  });

  it("gir 404 når Autosys ikke finner kjøretøyet", async () => {
    hentMock.mockResolvedValueOnce({ kjoretoydataListe: [] });
    expect(await slaOpp("AA10002")).toEqual({
      status: 404,
      body: { ok: false, error: "Fant ikke kjøretøy på dette skiltnummeret" },
    });
  });

  it.each([
    [
      "konfigurasjonsfeil",
      new AutosysKonfigurasjonsfeil("mangler"),
      500,
      "Tjenesten er ikke riktig konfigurert på serveren. Kontakt driftsansvarlig.",
    ],
    [
      "brukt opp kvote",
      new KvoteBruktOpp(),
      503,
      "Tjenesten har nådd dagens grense for oppslag. Prøv igjen i morgen.",
    ],
    [
      "utilgjengelig kvoteteller",
      new KvoteUtilgjengelig("redis"),
      503,
      "Oppslag er midlertidig utilgjengelig. Prøv igjen om litt.",
    ],
    [
      "5xx fra Autosys",
      new AutosysError("feil", 500),
      503,
      "Statens vegvesen sin oppslagstjeneste er utilgjengelig eller ustabil akkurat nå. Prøv igjen om litt.",
    ],
    [
      "nettverksfeil",
      new Error("ECONNRESET"),
      503,
      "Statens vegvesen sin oppslagstjeneste er utilgjengelig eller ustabil akkurat nå. Prøv igjen om litt.",
    ],
    ["4xx fra Autosys", new AutosysError("feil", 403), 502, "Klarte ikke hente kjøretøydata akkurat nå"],
  ])("oversetter %s til riktig status og melding", async (_navn, feil, status, error) => {
    hentMock.mockRejectedValueOnce(feil);
    // Unikt kjennemerke per rad, avledet av status og meldingslengde.
    expect(await slaOpp(`BB${status}${error.length % 100}`)).toEqual({
      status,
      body: { ok: false, error },
    });
  });
});
