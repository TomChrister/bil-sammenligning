import type { Vehicle } from "../vehicle";
import type {
  SalgsvurderingInput,
  SalgskanalId,
  KanalAnbefaling,
  AnbefalingResultat,
} from "./types";
import { rules, KANAL_NAVN } from "./rules";

const ALLE_KANALER: SalgskanalId[] = ["nettbil", "finn-privat", "innbytte", "oppkjopstjeneste"];

/**
 * Ren funksjon: samme input gir alltid samme output. Ingen sideeffekter,
 * ingen avhengighet til Express eller Autosys — enkel å enhetsteste isolert.
 */
export function anbefalSalgskanal(
  vehicle: Vehicle,
  input: SalgsvurderingInput,
): AnbefalingResultat {
  const akkumulator = new Map<SalgskanalId, { score: number; begrunnelse: string[] }>(
    ALLE_KANALER.map((kanal) => [kanal, { score: 0, begrunnelse: [] }]),
  );

  for (const rule of rules) {
    for (const justering of rule(vehicle, input)) {
      const entry = akkumulator.get(justering.kanal)!;
      entry.score += justering.poeng;
      entry.begrunnelse.push(justering.grunn);
    }
  }

  const rangert: KanalAnbefaling[] = ALLE_KANALER.map((kanal) => {
    const entry = akkumulator.get(kanal)!;
    return {
      kanal,
      navn: KANAL_NAVN[kanal],
      score: entry.score,
      begrunnelse: entry.begrunnelse,
    };
  }).sort((a, b) => b.score - a.score);

  return { rangert };
}
