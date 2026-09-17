import { Router } from "express";
import { hentKjoretoydata, AutosysError } from "../autosys/client";
import { normalizeVehicle } from "../autosys/normalize";
import { vehicleCache } from "../cache/vehicleCache";
import { isValidPlate, normalizePlate } from "../utils/validatePlate";
import { maskPlate } from "../utils/maskPlate";
import type { VehicleLookupRequest, VehicleLookupResponse } from "../../../shared/vehicle";

export const vehicleRouter = Router();

// POST i stedet for GET/query: kjennemerke regnes som personopplysning og skal
// ikke havne i URL-en (unngår lekkasje via serverlogger, Referer-header, analytics).
vehicleRouter.post("/vehicle", async (req, res) => {
  const body = req.body as Partial<VehicleLookupRequest>;
  const rawPlate = body?.kjennemerke;

  if (typeof rawPlate !== "string" || !isValidPlate(rawPlate)) {
    const response: VehicleLookupResponse = { ok: false, error: "Ugyldig kjennemerke" };
    res.status(400).json(response);
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
      const response: VehicleLookupResponse = {
        ok: false,
        error: raw.feilmelding ?? "Fant ikke kjøretøy på dette kjennemerket",
      };
      res.status(404).json(response);
      return;
    }

    const vehicle = normalizeVehicle(raw.kjoretoydataListe[0], plate);
    vehicleCache.set(plate, vehicle);

    const response: VehicleLookupResponse = { ok: true, vehicle };
    res.json(response);
  } catch (err) {
    const status = err instanceof AutosysError ? err.status : undefined;
    console.error(`Autosys-oppslag feilet for ${maskPlate(plate)}`, status ?? err);
    const response: VehicleLookupResponse = {
      ok: false,
      error: "Klarte ikke hente kjøretøydata akkurat nå",
    };
    res.status(502).json(response);
  }
});
