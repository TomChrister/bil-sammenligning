import type { Vehicle } from "../vehicle";
import type { Leverandor } from "./providers";

// Kanaltyper (arketyper), ikke enkeltaktører.
// Poengsystemet rangerer arketyper. Aktørene ligger i providers.ts og filtreres
// inn under den arketypen de tilhører. Det er dette som gjør tjenesten til en
// sammenligningstjeneste framfor en ren anbefaling.
export type SalgskanalId =
  | "privatsalg"
  | "forhandlerauksjon"
  | "fastpris-oppkjop"
  | "kommisjon"
  | "innbytte"
  | "auksjonshus";

export const KANAL_NAVN: Record<SalgskanalId, string> = {
  privatsalg: "Privatsalg (rubrikk)",
  forhandlerauksjon: "Forhandlerauksjon",
  "fastpris-oppkjop": "Fastpris-oppkjøp",
  kommisjon: "Kommisjon / bilmegler",
  innbytte: "Innbytte hos forhandler",
  auksjonshus: "Auksjonshus / spesialmarked",
};

export const KANAL_BESKRIVELSE: Record<SalgskanalId, string> = {
  privatsalg:
    "Du annonserer selv og selger til en privatperson. Høyest pris, mest arbeid, og du sitter igjen med mangelsansvaret etter kjøpsloven.",
  forhandlerauksjon:
    "Bilen legges ut på budrunde der forhandlere konkurrerer. Rask og trygg avslutning til en pris som normalt ligger under privatmarkedet.",
  "fastpris-oppkjop":
    "Én aktør kjøper bilen direkte til et fast tilbud. Raskest og enklest, og normalt den laveste prisen.",
  kommisjon:
    "En megler eller forhandler selger bilen for deg mot et gebyr eller en provisjon. Nær privatmarkedspris uten at du gjør jobben.",
  innbytte:
    "Bilen leveres inn som del av et nybilkjøp. Enklest av alt, ofte lavest pris, men kan gi bedre totalbetingelser på den nye bilen.",
  auksjonshus:
    "Åpen auksjon for nisje, veteran, defekte biler og næringskjøretøy. Uforutsigbart utfall, men riktig kanal når de andre ikke passer.",
};

export type Tilstand =
  | "ikke-kjorbar"
  | "darlig"
  | "akseptabel"
  | "god"
  | "meget-god";

export type Hastverk = "haster" | "normal" | "fleksibel";

export type Innsats = "minimalt" | "noe" | "mye";

export type SalgsvurderingInput = {
  /** Avlest kilometerstand. */
  kilometerstand: number;
  tilstand: Tilstand;
  /** Hvor raskt bilen må være solgt. */
  hastverk: Hastverk;
  /** Hvor mye jobb brukeren er villig til å legge inn selv. */
  onsketInnsats: Innsats;
  /** Skal kjøpe ny bil samtidig. */
  planleggerNybilkjop: boolean;
  /** Pant eller gjeld registrert på bilen. null = vet ikke. */
  heftelser: boolean | null;
  /** Brukerens eget verdianslag i kroner. Valgfritt, brukes kun som signal. */
  antattVerdi?: number | null;
};

export type Justering = {
  kanal: SalgskanalId;
  poeng: number;
  grunn: string;
  /** Hvilken regel som ga utslaget. Brukes til debugging og til "hvorfor dette?" i UI. */
  regel: string;
};

/** Det en regel returnerer. Regel-id-en legges på av score.ts. */
export type Regelutslag = Omit<Justering, "regel">;

export type Rule = {
  id: string;
  /** Kjøres alltid, men kan returnere tom liste. */
  apply: (vehicle: Vehicle, input: SalgsvurderingInput) => Regelutslag[];
};

export type KanalResultat = {
  kanal: SalgskanalId;
  navn: string;
  beskrivelse: string;
  /** Relativ indeks 40 til 100. Dette er en rangering, ikke et prisanslag. */
  indeks: number;
  raapoeng: number;
  talerFor: Justering[];
  talerMot: Justering[];
  /** Aktørene i kanalen som tar imot denne bilen. */
  leverandorer: Leverandor[];
};

export type Salgsvurdering = {
  rangering: KanalResultat[];
  /** Opplysninger som mangler og som svekker treffsikkerheten. */
  forbehold: string[];
};
