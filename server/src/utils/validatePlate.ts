// Dekker vanlige kjennemerker (2 bokstaver + 4-5 siffer) og personlige kjennemerker
// (2-7 alfanumeriske tegn). Ikke uttømmende for alle norske skiltkategorier.
const PLATE_PATTERN = /^[A-Z0-9]{4,8}$/;

export function normalizePlate(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

export function isValidPlate(raw: string): boolean {
  return PLATE_PATTERN.test(normalizePlate(raw));
}
