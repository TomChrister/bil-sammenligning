import rateLimit from "express-rate-limit";

/**
 * Beskytter mot at én bruker (bevisst eller ved feil, f.eks. en løkke i frontend)
 * brenner av døgnkvoten på 50 000 Autosys-kall. Grensen her er satt godt under
 * det som trengs for normal bruk av et hobbyprosjekt.
 */
export const vehicleLookupRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "For mange oppslag. Vent litt og prøv igjen." },
});
