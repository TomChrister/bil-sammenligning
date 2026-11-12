import { CHANNEL_PRESENTATION } from "../lib/channelPresentation";

/** Statisk innhold til forsiden, holdt adskilt fra oppsettet i LandingScreen. */

export const HVORDAN = [
  {
    n: "01",
    title: "Slå opp skiltet",
    text: "Vi henter tekniske data fra Statens vegvesen: modell, år, drivstoff og EU-kontroll.",
  },
  {
    n: "02",
    title: "Svar på noen spørsmål",
    text: "Tilstand, kilometerstand, hvor fort bilen må vekk og hvor mye jobb du vil legge i salget.",
  },
  {
    n: "03",
    title: "Få kanalene rangert",
    text: "Seks salgskanaler rangert, med begrunnelse og faktiske tilbydere under hver kanal.",
  },
] as const;

export const KANALER = [
  {
    icon: CHANNEL_PRESENTATION.privatsalg.icon,
    name: "Privatsalg",
    text: "Du annonserer selv og selger til en privatperson.",
  },
  {
    icon: CHANNEL_PRESENTATION.forhandlerauksjon.icon,
    name: "Forhandlerauksjon",
    text: "Forhandlere byr mot hverandre på bilen din.",
  },
  {
    icon: CHANNEL_PRESENTATION["fastpris-oppkjop"].icon,
    name: "Fastpris-oppkjøp",
    text: "En aktør kjøper bilen direkte til fast pris.",
  },
  {
    icon: CHANNEL_PRESENTATION.kommisjon.icon,
    name: "Kommisjonssalg",
    text: "Forhandler selger bilen for deg mot provisjon.",
  },
  {
    icon: CHANNEL_PRESENTATION.innbytte.icon,
    name: "Innbytte",
    text: "Bilen går i bytte mot en ny bil hos forhandler.",
  },
  {
    icon: CHANNEL_PRESENTATION.auksjonshus.icon,
    name: "Auksjonshus",
    text: "Åpen auksjon med spesialiserte kjøpergrupper.",
  },
];

export const EKSEMPEL_RADER = [
  { rank: 1, name: "Forhandlerauksjon", note: "Oppgjør 2–5 dager" },
  { rank: 2, name: "Fastpris-oppkjøp", note: "Oppgjør 1–3 dager" },
  { rank: 3, name: "Innbytte", note: "Ved levering" },
  { rank: 4, name: "Privatsalg", note: "2–8 uker" },
] as const;

export const DATAKILDE_LENKER = [
  {
    mark: "SVV",
    name: "API for tekniske kjøretøyopplysninger",
    note: "Om API-et, vilkår og bestilling hos vegvesen.no",
    href: "https://www.vegvesen.no/kjoretoy/kjop-og-salg/kjoretoyopplysninger/api-er-for-tekniske-kjoretoyopplysninger/api-for-tekniske-kjoretoyopplysninger/",
  },
  {
    mark: "API",
    name: "Dokumentasjon for enkeltoppslag",
    note: "Beskrivelse av felter og bruk",
    href: "https://autosys-kjoretoy-api.atlas.vegvesen.no/api-ui/index-api.html?apiId=enkeltoppslag",
  },
  {
    mark: "{ }",
    name: "Swagger / OpenAPI",
    note: "Teknisk spesifikasjon av endepunktet",
    href: "https://akfell-datautlevering.atlas.vegvesen.no/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/enkelt-oppslag-resource/hentKjoretoydata",
  },
] as const;

/** Feltene vi henter fra Autosys, vist som tagger under «Om dataene». */
export const DATAFELT = [
  "Merke",
  "Modell",
  "Registreringsstatus",
  "Drivstoff",
  "Girkasse",
  "Effekt",
  "Egenvekt",
  "Karosseri",
  "Antall seter",
  "Totalvekt",
  "Euroklasse",
  "CO2-utslipp",
  "Rekkevidde",
  "EU-kontroll",
];
