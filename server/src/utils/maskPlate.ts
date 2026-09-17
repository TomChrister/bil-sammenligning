/**
 * Kjennemerke regnes som personopplysning (GDPR) og skal ikke havne i serverlogger.
 * Brukes i alle log-/feilmeldinger som ellers ville inneholdt et regnr.
 */
export function maskPlate(plate: string): string {
  const trimmed = plate.trim();
  if (trimmed.length <= 2) return "**";
  return `${trimmed.slice(0, 2)}${"*".repeat(trimmed.length - 2)}`;
}
