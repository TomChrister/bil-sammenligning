/**
 * Flatt kjøretøyobjekt som frontend bruker. Bygges av server/src/autosys/normalize.ts
 * ut fra den dypt nøstede Autosys-responsen. Frontend ser aldri råstrukturen.
 */
export type Vehicle = {
  kjennemerke: string;
  merke: string | null;
  modell: string | null;
  variant: string | null;
  forstegangsregistrert: string | null; // ISO-dato
  drivstoff: string | null;
  effektKw: number | null;
  girkasse: string | null;
  karosseri: string | null;
  antallSeter: number | null;
  egenvektKg: number | null;
  totalvektKg: number | null;
  co2GPrKm: number | null;
  euroklasse: string | null;
  rekkeviddeKm: number | null;
  registreringsstatus: string | null;
  avregistrert: boolean;
  euKontrollfrist: string | null; // ISO-dato
  euKontrollSistGodkjent: string | null; // ISO-dato
};

export type VehicleLookupRequest = {
  kjennemerke: string;
};

export type VehicleLookupResponse =
  | { ok: true; vehicle: Vehicle }
  | { ok: false; error: string };
