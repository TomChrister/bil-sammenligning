import type { Vehicle } from "../vehicle";
import { BASISPOENG, rules } from "./rules";
import { leverandorerForKanal, type Leverandor } from "./providers";
import {
  KANAL_BESKRIVELSE,
  KANAL_NAVN,
  type Justering,
  type KanalResultat,
  type SalgskanalId,
  type Salgsvurdering,
  type SalgsvurderingInput,
} from "./types";

export type KanalResultatMedLeverandorer = KanalResultat & {
  leverandorer: Leverandor[];
};

export type SalgsvurderingResultat = Omit<Salgsvurdering, "rangering"> & {
  rangering: KanalResultatMedLeverandorer[];
};

/**
 * Rangerer salgskanalene for en konkret bil og en konkret selger.
 *
 * Resultatet er en RANGERING, ikke et prisanslag. Vi har ingen markedsdata, bare
 * tekniske opplysninger fra Autosys pluss det brukeren selv oppgir, og indeksen
 * må presenteres deretter i UI.
 */
export function beregnSalgsvurdering(
  vehicle: Vehicle,
  input: SalgsvurderingInput,
): SalgsvurderingResultat {
  const poeng: Record<SalgskanalId, number> = { ...BASISPOENG };
  const alleJusteringer: Justering[] = [];

  for (const regel of rules) {
    for (const j of regel.apply(vehicle, input)) {
      poeng[j.kanal] += j.poeng;
      alleJusteringer.push({ ...j, regel: regel.id });
    }
  }

  const verdier = Object.values(poeng);
  const maks = Math.max(...verdier);
  const min = Math.min(...verdier);
  const spenn = maks - min || 1;

  const rangering: KanalResultatMedLeverandorer[] = (
    Object.keys(poeng) as SalgskanalId[]
  )
    .map((kanal) => {
      const forKanal = alleJusteringer.filter((j) => j.kanal === kanal);
      return {
        kanal,
        navn: KANAL_NAVN[kanal],
        beskrivelse: KANAL_BESKRIVELSE[kanal],
        // Indeks 40 til 100. Bunnen er bevisst ikke null: også den dårligst
        // rangerte kanalen er et mulig valg, og en nuller gir feil inntrykk.
        indeks: Math.round(40 + ((poeng[kanal] - min) / spenn) * 60),
        raapoeng: poeng[kanal],
        taler_for: forKanal.filter((j) => j.poeng > 0).sort((a, b) => b.poeng - a.poeng),
        taler_mot: forKanal.filter((j) => j.poeng < 0).sort((a, b) => a.poeng - b.poeng),
        leverandorer: leverandorerForKanal(kanal, vehicle, input),
      };
    })
    // En kanal uten tilgjengelige aktører for denne bilen skal ikke vises.
    .filter((r) => r.leverandorer.length > 0)
    .sort((a, b) => b.raapoeng - a.raapoeng);

  return { rangering, forbehold: byggForbehold(vehicle, input) };
}

function byggForbehold(vehicle: Vehicle, input: SalgsvurderingInput): string[] {
  const forbehold: string[] = [
    "Rangeringen bygger på tekniske data fra Statens vegvesen og det du selv har oppgitt. Den sier noe om hvilken kanal som passer, ikke hva bilen er verdt.",
  ];

  if (!vehicle.forstegangsregistrert) {
    forbehold.push("Vi mangler førstegangsregistrering, så alder er ikke tatt med i vurderingen.");
  }
  if (vehicle.euKontrollfrist == null) {
    forbehold.push("Vi mangler kontrollfrist for EU-kontroll.");
  }
  if (input.heftelser === null) {
    forbehold.push(
      "Du har ikke oppgitt om det er pant på bilen. Det kan du sjekke gratis i Løsøreregisteret hos Brønnøysundregistrene.",
    );
  }
  if (input.antattVerdi == null) {
    forbehold.push(
      "Uten et verdianslag kan vi ikke vurdere om et fast meglergebyr er forsvarlig for denne bilen.",
    );
  }

  return forbehold;
}
