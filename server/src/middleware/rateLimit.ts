import rateLimit from "express-rate-limit";

/**
 * Beskytter mot at én bruker (bevisst eller ved feil, f.eks. en løkke i frontend)
 * brenner av døgnkvoten på 50 000 Autosys-kall. Grensen her er satt godt under
 * det som trengs for normal bruk av et hobbyprosjekt.
 *
 * shortcut: telleren ligger i minnet per serverinstans. På Vercel kan flere
 * instanser kjøre samtidig, så samme IP kan få 10 oppslag per instans. Greit ved
 * hobbylast; brennes kvoten likevel, flytt telleren til delt lagring (f.eks.
 * Upstash Redis) eller en rate limit-regel i Vercel Firewall.
 */
export const vehicleLookupRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  // IPv6-adresser telles per /56-blokk, ellers kan én kunde bytte adresse for hvert kall.
  ipv6Subnet: 56,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "For mange oppslag. Vent litt og prøv igjen." },
});
