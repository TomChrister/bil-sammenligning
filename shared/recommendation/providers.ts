import type { SalgskanalId, SalgsvurderingInput, Tilstand } from "./types";
import type { Vehicle } from "../vehicle";

/**
 * Registeret over faktiske aktører i det norske markedet.
 *
 * VIKTIG: gebyrer, utbetalingstid og hvilke biler den enkelte tar imot endrer seg.
 * Hvert oppslag har derfor `sistVerifisert`. UI bør vise datoen, og det bør ligge
 * en rutine for å gå gjennom listen jevnlig. Utdaterte gebyrer er den vanligste
 * måten en sammenligningstjeneste mister troverdighet på.
 *
 * Alt som er merket `uverifisert: true` er hentet fra aktørenes egen markedsføring
 * eller fra en konkurrents sammenligning, og må bekreftes mot primærkilde før
 * det vises som faktapåstand i UI.
 */

export type Leverandor = {
  id: string;
  navn: string;
  url: string;
  kanal: SalgskanalId;
  /** Kort beskrivelse av modellen, vises i kortet. */
  modell: string;
  /** Hva det koster selger. Fritekst fordi modellene ikke er sammenlignbare som ett tall. */
  kostnadSelger: string;
  /** Typisk tid fra avtale til penger på konto. */
  utbetaling: string;
  /** Krav og forbehold som kan diskvalifisere en bil. */
  krav?: {
    kreverTestsenter?: boolean;
    kreverKjorbar?: boolean;
    maksAlderAr?: number;
    tarIkke?: string[];
    kunBedrift?: boolean;
  };
  /** Dekning. "landsdekkende" eller liste over fylker. */
  dekning: "landsdekkende" | string[];
  merknad?: string;
  sistVerifisert: string;
  uverifisert?: boolean;
};

export const LEVERANDORER: Leverandor[] = [
  // ---------- Forhandlerauksjon ----------
  {
    id: "nettbil",
    navn: "Nettbil",
    url: "https://www.nettbil.no/",
    kanal: "forhandlerauksjon",
    modell: "Budrunde blant over 2 000 forhandlere etter tilstandssjekk på testsenter.",
    kostnadSelger: "Gratis for selger. Nettbil betales av forhandleren som kjøper bilen.",
    utbetaling: "Få dager etter akseptert bud.",
    krav: { kreverTestsenter: true, kreverKjorbar: true },
    dekning: "landsdekkende",
    merknad:
      "Testsentrene drives sammen med NAF og Viking. Tilstandssjekken er obligatorisk, så bilen må kunne kjøres dit.",
    sistVerifisert: "2026-09-20",
  },
  {
    id: "bilskifte",
    navn: "Bilskifte",
    url: "https://bilskifte.no/",
    kanal: "forhandlerauksjon",
    modell: "Budrunde blant forhandlere basert på bilder, uten obligatorisk testsenter.",
    kostnadSelger: "Oppgis som gratis for selger. Forhandlerens gebyr legges på budet.",
    utbetaling: "Oppgitt 1 til 3 dager.",
    krav: { kreverTestsenter: false },
    dekning: "landsdekkende",
    merknad:
      "Lavere terskel enn Nettbil siden bilen ikke må leveres på testsenter, men budet gis på bilder og kan justeres ved henting.",
    sistVerifisert: "2026-09-20",
    uverifisert: true,
  },
  {
    id: "bilnett",
    navn: "Bilnett",
    url: "https://www.bilnett.no/",
    kanal: "forhandlerauksjon",
    modell: "Budrunde blant forhandlere med tilstandssjekk, mindre nettverk enn Nettbil.",
    kostnadSelger: "Oppgis som nettopris uten påslag for selger.",
    utbetaling: "Oppgitt 3 til 7 dager.",
    krav: { kreverTestsenter: true, kreverKjorbar: true },
    dekning: "landsdekkende",
    sistVerifisert: "2026-09-20",
    uverifisert: true,
  },

  // ---------- Fastpris-oppkjøp ----------
  {
    id: "rebil",
    navn: "Rebil",
    url: "https://www.rebil.no/",
    kanal: "fastpris-oppkjop",
    modell: "Kjøper bilen direkte til fast tilbud, uten budrunde.",
    kostnadSelger: "Ingen separat kostnad. Marginen ligger i tilbudet.",
    utbetaling: "Oppgitt 1 til 3 dager.",
    krav: {},
    dekning: "landsdekkende",
    merknad: "Én motpart gjennom hele prosessen. Enklest, men ingen konkurranse om bilen.",
    sistVerifisert: "2026-09-20",
  },
  {
    id: "mobile",
    navn: "Mobile",
    url: "https://mobile.no/selg-din-bil/",
    kanal: "fastpris-oppkjop",
    modell: "Forhandlerhus som kjøper bilen direkte etter innsendt skjema og visning.",
    kostnadSelger: "Oppgis som gratis og uforpliktende.",
    utbetaling: "Få virkedager etter levering.",
    krav: { tarIkke: ["gamle biler", "Tesla", "motorsykkel", "lastebil"] },
    dekning: "landsdekkende",
    merknad: "Tar ikke imot alle biler. Sjekk forbeholdene før den vises som et alternativ.",
    sistVerifisert: "2026-09-20",
  },
  {
    id: "biloppkjop",
    navn: "Biloppkjøp.no",
    url: "https://biloppkjop.no/",
    kanal: "fastpris-oppkjop",
    modell: "Oppkjøper som uttrykkelig kjøper biler med feil og mangler.",
    kostnadSelger: "Ingen separat kostnad.",
    utbetaling: "Oppgis som rask.",
    krav: { kreverKjorbar: false },
    dekning: "landsdekkende",
    merknad: "Relevant nettopp når bilen ikke er kjørbar eller har kjente feil.",
    sistVerifisert: "2026-09-20",
    uverifisert: true,
  },

  // ---------- Privatsalg ----------
  {
    id: "finn",
    navn: "FINN motor",
    url: "https://www.finn.no/",
    kanal: "privatsalg",
    modell: "Rubrikkannonse direkte til privatmarkedet.",
    kostnadSelger: "Annonsepakke, i størrelsesorden noen hundre kroner.",
    utbetaling: "Når bilen faktisk blir solgt, typisk uker.",
    krav: {},
    dekning: "landsdekkende",
    merknad:
      "Du beholder mangelsansvaret etter kjøpsloven i fem år. Det er en reell risiko som bør stå i UI.",
    sistVerifisert: "2026-09-20",
    uverifisert: true,
  },

  // ---------- Kommisjon ----------
  {
    id: "car4sale",
    navn: "Car4Sale",
    url: "https://www.car4sale.no/",
    kanal: "kommisjon",
    modell: "Bilmegler som håndterer hele salget for deg og selger til privatmarkedspris.",
    kostnadSelger:
      "Fast gebyr av salgssummen, oppgitt til 16 990 kr, i tillegg til klargjøring rundt 1 800 kr. Ingen salg gir ingen gebyr.",
    utbetaling: "Når bilen er solgt, typisk 30 til 90 dager.",
    krav: {},
    dekning: "landsdekkende",
    merknad:
      "Fast gebyr gjør kanalen dyr for rimelige biler. Under rundt 100 000 kr spiser gebyret for mye av verdien.",
    sistVerifisert: "2026-09-20",
  },
  {
    id: "lokal-kommisjon",
    navn: "Lokal forhandler i kommisjon",
    url: "",
    kanal: "kommisjon",
    modell:
      "Mange bruktbilforhandlere tar biler i kommisjon, for eksempel Komplett Autosalg og Dinbruktbil.",
    kostnadSelger: "Provisjon eller fast gebyr, varierer mye. Forhandles lokalt.",
    utbetaling: "Når bilen er solgt.",
    krav: {},
    dekning: "landsdekkende",
    merknad:
      "Generisk oppføring. Bør på sikt erstattes av en liste med faktiske forhandlere per fylke.",
    sistVerifisert: "2026-09-20",
  },

  // ---------- Innbytte ----------
  {
    id: "innbytte-generisk",
    navn: "Innbytte hos forhandler",
    url: "",
    kanal: "innbytte",
    modell: "Bilen leveres inn som del av kjøp av ny eller nyere bil.",
    kostnadSelger: "Ingen direkte kostnad. Prisen er normalt lavest av alternativene.",
    utbetaling: "Motregnes ved levering av den nye bilen.",
    krav: {},
    dekning: "landsdekkende",
    merknad:
      "Vurder innbytteprisen mot det du ville fått på auksjon, og be om pris på den nye bilen uten innbytte for å se den reelle verdien.",
    sistVerifisert: "2026-09-20",
  },

  // ---------- Auksjonshus ----------
  {
    id: "auksjonen",
    navn: "Auksjonen.no",
    url: "https://www.auksjonen.no/",
    kanal: "auksjonshus",
    modell: "Åpen nettauksjon, mye brukt av profesjonelle aktører.",
    kostnadSelger: "Varierer med oppdrag.",
    utbetaling: "Varierer.",
    krav: {},
    dekning: "landsdekkende",
    merknad: "Mest aktuelt for nisjekjøretøy, næringskjøretøy og biler med kjente feil.",
    sistVerifisert: "2026-09-20",
    uverifisert: true,
  },
];

function alderIAr(vehicle: Vehicle): number | null {
  if (!vehicle.forstegangsregistrert) return null;
  const t = new Date(vehicle.forstegangsregistrert).getTime();
  if (Number.isNaN(t)) return null;
  return (Date.now() - t) / (1000 * 60 * 60 * 24 * 365.25);
}

const IKKE_KJORBAR: Tilstand[] = ["ikke-kjorbar"];

/**
 * Filtrerer bort aktører som åpenbart ikke tar denne bilen.
 * Filteret er bevisst konservativt: er vi i tvil, beholder vi aktøren og lar
 * `merknad` opplyse brukeren framfor å skjule et alternativ.
 */
export function leverandorerForKanal(
  kanal: SalgskanalId,
  vehicle: Vehicle,
  input: SalgsvurderingInput,
): Leverandor[] {
  const alder = alderIAr(vehicle);

  return LEVERANDORER.filter((l) => l.kanal === kanal).filter((l) => {
    if (l.krav?.kunBedrift) return false;
    if (l.krav?.kreverKjorbar && IKKE_KJORBAR.includes(input.tilstand)) return false;
    if (l.krav?.kreverTestsenter && IKKE_KJORBAR.includes(input.tilstand)) return false;
    if (l.krav?.maksAlderAr != null && alder != null && alder > l.krav.maksAlderAr) return false;
    return true;
  });
}
