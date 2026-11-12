import { Router, type Response } from "express";
import { hentKjoretoydata, AutosysError, AutosysKonfigurasjonsfeil } from "../autosys/client";
import { KvoteBruktOpp, KvoteUtilgjengelig } from "../autosys/dailyQuota";
import { normalizeVehicle } from "../autosys/normalize";
import { vehicleCache } from "../cache/vehicleCache";
import { isValidPlate, normalizePlate } from "../utils/validatePlate";
import { maskPlate } from "../utils/maskPlate";
import type { VehicleLookupRequest, VehicleLookupResponse } from "../../../shared/vehicle";

export const vehicleRouter = Router();

function sendFeil(res: Response, status: number, error: string) {
  const response: VehicleLookupResponse = { ok: false, error };
  res.status(status).json(response);
}

function feilsvar(err: unknown): [status: number, error: string] {
  if (err instanceof AutosysKonfigurasjonsfeil) {
    return [500, "Tjenesten er ikke riktig konfigurert på serveren. Kontakt driftsansvarlig."];
  }
  if (err instanceof KvoteBruktOpp) {
    return [503, "Tjenesten har nådd dagens grense for oppslag. Prøv igjen i morgen."];
  }
  if (err instanceof KvoteUtilgjengelig) {
    return [503, "Oppslag er midlertidig utilgjengelig. Prøv igjen om litt."];
  }
  // Nettverksfeil (timeout/ECONNRESET) eller 5xx betyr som regel at Statens
  // vegvesen sin egen tjeneste er nede eller ustabil, ikke at noe er galt hos oss.
  const status = err instanceof AutosysError ? err.status : undefined;
  if (status === undefined || status >= 500) {
    return [
      503,
      "Statens vegvesen sin oppslagstjeneste er utilgjengelig eller ustabil akkurat nå. Prøv igjen om litt.",
    ];
  }
  return [502, "Klarte ikke hente kjøretøydata akkurat nå"];
}

// POST i stedet for GET/query: kjennemerke regnes som personopplysning og skal
// ikke havne i URL-en (unngår lekkasje via serverlogger, Referer-header, analytics).
vehicleRouter.post("/vehicle", async (req, res) => {
  const body = req.body as Partial<VehicleLookupRequest>;
  const rawPlate = body?.kjennemerke;

  if (typeof rawPlate !== "string" || !isValidPlate(rawPlate)) {
    sendFeil(res, 400, "Ugyldig kjennemerke");
    return;
  }

  const plate = normalizePlate(rawPlate);

  const cached = vehicleCache.get(plate);
  if (cached) {
    const response: VehicleLookupResponse = { ok: true, vehicle: cached };
    res.json(response);
    return;
  }

  try {
    const raw = await hentKjoretoydata(plate);

    if (raw.feilmelding || !raw.kjoretoydataListe?.length) {
      sendFeil(res, 404, raw.feilmelding ?? "Fant ikke kjøretøy på dette skiltnummeret");
      return;
    }

    const vehicle = normalizeVehicle(raw.kjoretoydataListe[0], plate);
    vehicleCache.set(plate, vehicle);

    const response: VehicleLookupResponse = { ok: true, vehicle };
    res.json(response);
  } catch (err) {
    const status = err instanceof AutosysError ? err.status : undefined;
    console.error(`Autosys-oppslag feilet for ${maskPlate(plate)}`, status ?? err);
    sendFeil(res, ...feilsvar(err));
  }
});
