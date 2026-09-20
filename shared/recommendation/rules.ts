import type { Vehicle } from "../vehicle";
import type { Rule, SalgskanalId, SalgsvurderingInput } from "./types";

/**
 * Vektskala. Alle tall i regelsettet skal hentes herfra, slik at justering av
 * systemet skjer ett sted og ikke ved å lete etter magiske tall i regelkroppene.
 */
export const VEKT = {
  svak: 1,
  moderat: 2,
  sterk: 3,
  avgjorende: 5,
} as const;

/**
 * Basispoeng er utgangsposisjonen før noen regel har kjørt.
 *
 * Dette manglet i første utkast, og uten det blir resultatet skjevt: en kanal som
 * ingen regel nevner ender på null, mens privatsalg nevnes i nesten alle regler og
 * derfor beveger seg mest uansett retning. Basispoengene sier hva som er et fornuftig
 * standardsvar for en helt gjennomsnittlig bil, og reglene flytter derfra.
 */
export const BASISPOENG: Record<SalgskanalId, number> = {
  privatsalg: 10,
  forhandlerauksjon: 10,
  "fastpris-oppkjop": 8,
  kommisjon: 6,
  innbytte: 5,
  auksjonshus: 1,
};

function alderIAr(vehicle: Vehicle): number | null {
  if (!vehicle.forstegangsregistrert) return null;
  const registrert = new Date(vehicle.forstegangsregistrert).getTime();
  if (Number.isNaN(registrert)) return null;
  return (Date.now() - registrert) / (1000 * 60 * 60 * 24 * 365.25);
}

function dagerTil(dato: string | null | undefined): number | null {
  if (!dato) return null;
  const tid = new Date(dato).getTime();
  if (Number.isNaN(tid)) return null;
  return (tid - Date.now()) / (1000 * 60 * 60 * 24);
}

function erElektrisk(vehicle: Vehicle): boolean {
  // TODO: bytt til kodeVerdi fra Autosys framfor tekstmatching.
  // kodeBeskrivelse varierer ("Elektrisk", "Elektrisitet"), og hydrogen og
  // ladbar hybrid må skilles fra rene elbiler.
  const d = vehicle.drivstoff?.toLowerCase() ?? "";
  return d.includes("elektr");
}

// ---------------------------------------------------------------------------
// Regler
// ---------------------------------------------------------------------------

const kjorbarhetRegel: Rule = {
  id: "kjorbarhet",
  apply: (_vehicle, input) => {
    if (input.tilstand !== "ikke-kjorbar") return [];
    return [
      {
        kanal: "fastpris-oppkjop",
        poeng: VEKT.sterk,
        grunn: "Flere oppkjøpere henter biler som ikke er kjørbare, og priser inn feilen i tilbudet.",
      },
      {
        kanal: "auksjonshus",
        poeng: VEKT.sterk,
        grunn: "Biler med kjente feil finner oftest kjøper i et åpent auksjonsmarked.",
      },
      {
        kanal: "forhandlerauksjon",
        poeng: -VEKT.moderat,
        grunn: "Flere auksjonstjenester krever at bilen kjøres til testsenter for tilstandssjekk.",
      },
      {
        kanal: "privatsalg",
        poeng: -VEKT.avgjorende,
        grunn: "En bil som ikke kan prøvekjøres er svært tung å selge privat.",
      },
      {
        kanal: "kommisjon",
        poeng: -VEKT.avgjorende,
        grunn: "Kommisjon forutsetter at bilen kan klargjøres og vises fram.",
      },
      {
        kanal: "innbytte",
        poeng: -VEKT.moderat,
        grunn: "Forhandlere gir lite eller ingenting i innbytte for en bil som ikke ruller.",
      },
    ];
  },
};

const avregistrertRegel: Rule = {
  id: "avregistrert",
  apply: (vehicle) => {
    if (!vehicle.avregistrert) return [];
    return [
      {
        kanal: "forhandlerauksjon",
        poeng: VEKT.moderat,
        grunn: "Forhandlere har rutiner for påregistrering og håndterer avregistrerte biler greit.",
      },
      {
        kanal: "fastpris-oppkjop",
        poeng: VEKT.moderat,
        grunn: "Oppkjøpere tar avregistrerte biler uten ekstra friksjon.",
      },
      {
        kanal: "privatsalg",
        poeng: -VEKT.sterk,
        grunn: "Private kjøpere kvier seg for avregistrerte biler og lurer på hvorfor den står.",
      },
      {
        kanal: "innbytte",
        poeng: -VEKT.svak,
        grunn: "Avregistrering trekker normalt ned innbytteverdien.",
      },
    ];
  },
};

/**
 * Kilometerstand vurderes relativt til alder, ikke absolutt.
 * 150 000 km på to år og 150 000 km på femten år er to helt forskjellige biler,
 * og den opprinnelige terskelen på 150 000 behandlet dem likt.
 */
const kilometerstandRegel: Rule = {
  id: "kilometerstand",
  apply: (vehicle, input) => {
    const alder = alderIAr(vehicle);
    const km = input.kilometerstand;
    const ut: ReturnType<Rule["apply"]> = [];

    if (km >= 250_000) {
      ut.push(
        {
          kanal: "fastpris-oppkjop",
          poeng: VEKT.moderat,
          grunn: "Svært høy kilometerstand gjør rask avhending til det mest realistiske.",
        },
        {
          kanal: "privatsalg",
          poeng: -VEKT.moderat,
          grunn: "Svært høy kilometerstand begrenser privatmarkedet kraftig.",
        },
        {
          kanal: "kommisjon",
          poeng: -VEKT.sterk,
          grunn: "Gebyret i kommisjon spiser for mye av det en slik bil er verdt.",
        },
      );
    }

    if (alder != null && alder >= 1) {
      const kmPerAr = km / alder;
      if (kmPerAr > 25_000) {
        ut.push(
          {
            kanal: "forhandlerauksjon",
            poeng: VEKT.svak,
            grunn: "Høy årlig kjørelengde priser forhandlere greit inn, private reagerer sterkere på det.",
          },
          {
            kanal: "privatsalg",
            poeng: -VEKT.moderat,
            grunn: "Kjørelengden ligger godt over normalen for bilens alder, noe private kjøpere er skeptiske til.",
          },
        );
      } else if (kmPerAr < 10_000) {
        ut.push({
          kanal: "privatsalg",
          poeng: VEKT.moderat,
          grunn: "Lav kjørelengde i forhold til alderen er et sterkt salgsargument i privatmarkedet.",
        });
      }
    }

    return ut;
  },
};

const alderRegel: Rule = {
  id: "alder",
  apply: (vehicle) => {
    const alder = alderIAr(vehicle);
    if (alder === null) return [];

    if (alder <= 5) {
      return [
        {
          kanal: "privatsalg",
          poeng: VEKT.moderat,
          grunn: "Nyere biler har størst prispotensial i privatmarkedet.",
        },
        {
          kanal: "kommisjon",
          poeng: VEKT.moderat,
          grunn: "Verdien er høy nok til at et fast meglergebyr utgjør en liten andel av salgssummen.",
        },
      ];
    }
    if (alder > 15) {
      return [
        {
          kanal: "forhandlerauksjon",
          poeng: VEKT.svak,
          grunn: "Eldre biler omsettes greit gjennom forhandlerauksjon.",
        },
        {
          kanal: "fastpris-oppkjop",
          poeng: VEKT.moderat,
          grunn: "På eldre biler er forskjellen mellom kanalene liten, og da vinner det enkleste.",
        },
        {
          kanal: "kommisjon",
          poeng: -VEKT.moderat,
          grunn: "Et fast meglergebyr blir en stor andel av salgssummen på en eldre bil.",
        },
      ];
    }
    return [];
  },
};

/**
 * Veteranregelen var den farligste i første utkast: alder over 30 år ga automatisk
 * pluss til privatsalg. En sliten 1996-modell er ikke en samlerbil, den er en
 * bruktbil på slutten av livet. Bonusen krever derfor at tilstanden faktisk er god.
 */
const veteranRegel: Rule = {
  id: "veteran",
  apply: (vehicle, input) => {
    const alder = alderIAr(vehicle);
    if (alder === null || alder < 30) return [];

    const velholdt = input.tilstand === "god" || input.tilstand === "meget-god";

    if (velholdt) {
      return [
        {
          kanal: "privatsalg",
          poeng: VEKT.sterk,
          grunn: "En velholdt veteranbil har et engasjert samlermarked som betaler over vanlig bruktverdi.",
        },
        {
          kanal: "auksjonshus",
          poeng: VEKT.moderat,
          grunn: "Spesialmarkedet finner ofte riktig kjøper til en veteranbil.",
        },
        {
          kanal: "forhandlerauksjon",
          poeng: -VEKT.moderat,
          grunn: "Forhandlere byr lavt på biler de ikke har en naturlig videresalgskanal for.",
        },
        {
          kanal: "innbytte",
          poeng: -VEKT.sterk,
          grunn: "Innbytte gir sjelden noe i nærheten av samlerverdi.",
        },
      ];
    }

    return [
      {
        kanal: "fastpris-oppkjop",
        poeng: VEKT.moderat,
        grunn: "En gammel bil i middels eller dårlig stand er sjelden verdt den jobben et privatsalg krever.",
      },
      {
        kanal: "privatsalg",
        poeng: -VEKT.moderat,
        grunn: "Alderen alene gir ikke samlerverdi når tilstanden ikke følger med.",
      },
    ];
  },
};

const euKontrollRegel: Rule = {
  id: "eu-kontroll",
  apply: (vehicle) => {
    const ut: ReturnType<Rule["apply"]> = [];
    const tilFrist = dagerTil(vehicle.euKontrollfrist);

    if (tilFrist !== null) {
      if (tilFrist < 0) {
        ut.push(
          {
            kanal: "privatsalg",
            poeng: -VEKT.sterk,
            grunn: "EU-kontrollen er utgått. Det er et rødt flagg for private kjøpere og kan gi bruksforbud.",
          },
          {
            kanal: "forhandlerauksjon",
            poeng: VEKT.svak,
            grunn: "Forhandlere ordner EU-kontroll selv og priser det inn.",
          },
          {
            kanal: "fastpris-oppkjop",
            poeng: VEKT.moderat,
            grunn: "Utgått kontroll er en ren kostnad for en oppkjøper, ikke et hinder.",
          },
        );
      } else if (tilFrist < 60) {
        ut.push(
          {
            kanal: "privatsalg",
            poeng: -VEKT.moderat,
            grunn: "Kontrollfristen er nær. Mange kjøpere vil ha den unnagjort før de byr.",
          },
          {
            kanal: "forhandlerauksjon",
            poeng: VEKT.svak,
            grunn: "Snarlig kontrollfrist betyr lite i en forhandlerauksjon.",
          },
        );
      }
    }

    // Rettet bug: null fra dagerTil ga tidligere dagerSiden = 0 og trigget
    // "nylig godkjent" på biler der datoen manglet eller ikke lot seg parse.
    const tilSistGodkjent = dagerTil(vehicle.euKontrollSistGodkjent);
    if (tilSistGodkjent !== null) {
      const dagerSiden = -tilSistGodkjent;
      if (dagerSiden >= 0 && dagerSiden < 90) {
        ut.push({
          kanal: "privatsalg",
          poeng: VEKT.moderat,
          grunn: "Nylig bestått EU-kontroll er et konkret salgsargument overfor private kjøpere.",
        });
      }
    }

    return ut;
  },
};

const elbilRegel: Rule = {
  id: "elbil-rekkevidde",
  apply: (vehicle, input) => {
    if (!erElektrisk(vehicle)) return [];
    const alder = alderIAr(vehicle);
    const rekkevidde = vehicle.rekkeviddeKm;
    if (rekkevidde == null || alder == null) return [];

    if (rekkevidde < 250 && alder > 6) {
      return [
        {
          kanal: "fastpris-oppkjop",
          poeng: VEKT.moderat,
          grunn: "Batteritilstand er vanskelig for en privatkjøper å vurdere. Et fastpristilbud flytter den risikoen bort fra deg.",
        },
        {
          kanal: "innbytte",
          poeng: VEKT.moderat,
          grunn: "Eldre elbil med kort rekkevidde er ofte enklere å levere i innbytte enn å selge i privatmarkedet.",
        },
        {
          kanal: "privatsalg",
          poeng: -VEKT.moderat,
          grunn: "Kort rekkevidde og usikkerhet om batteriet demper interessen blant private kjøpere.",
        },
      ];
    }

    if (rekkevidde >= 400 && alder <= 5 && input.tilstand !== "darlig") {
      return [
        {
          kanal: "privatsalg",
          poeng: VEKT.moderat,
          grunn: "Nyere elbil med god rekkevidde er ettertraktet i privatmarkedet.",
        },
      ];
    }

    return [];
  },
};

const tilstandRegel: Rule = {
  id: "tilstand",
  apply: (_vehicle, input) => {
    switch (input.tilstand) {
      case "darlig":
        return [
          {
            kanal: "fastpris-oppkjop",
            poeng: VEKT.sterk,
            grunn: "Et fastpristilbud tar risikoen for tilstanden bort fra deg.",
          },
          {
            kanal: "forhandlerauksjon",
            poeng: VEKT.moderat,
            grunn: "Dårlig stand er enklere å prise inn i en forhandlerauksjon enn i privatmarkedet.",
          },
          {
            kanal: "privatsalg",
            poeng: -VEKT.sterk,
            grunn: "Dårlig stand gir tøff prising og økt risiko for at kjøper kommer tilbake med krav.",
          },
          {
            kanal: "kommisjon",
            poeng: -VEKT.moderat,
            grunn: "Klargjøringskostnaden i kommisjon blir høy på en bil i dårlig stand.",
          },
        ];
      case "akseptabel":
        return [
          {
            kanal: "forhandlerauksjon",
            poeng: VEKT.svak,
            grunn: "Akseptabel stand omsettes greit gjennom forhandlerauksjon.",
          },
          {
            kanal: "privatsalg",
            poeng: -VEKT.svak,
            grunn: "Akseptabel stand gir mindre forhandlingsrom i privatmarkedet.",
          },
        ];
      case "god":
        return [
          {
            kanal: "privatsalg",
            poeng: VEKT.svak,
            grunn: "God stand gir et solid utgangspunkt i privatmarkedet.",
          },
        ];
      case "meget-god":
        return [
          {
            kanal: "privatsalg",
            poeng: VEKT.sterk,
            grunn: "Meget god stand er nettopp der privatsalg gir størst uttelling framfor forhandler.",
          },
          {
            kanal: "kommisjon",
            poeng: VEKT.moderat,
            grunn: "En velholdt bil forsvarer meglergebyret fordi sluttprisen blir høyere.",
          },
        ];
      default:
        return [];
    }
  },
};

/**
 * Hastverk er i praksis den enkeltfaktoren som avgjør mest for hvilken kanal folk
 * lander på, og den manglet helt i første utkast.
 */
const hastverkRegel: Rule = {
  id: "hastverk",
  apply: (_vehicle, input) => {
    if (input.hastverk === "haster") {
      return [
        {
          kanal: "fastpris-oppkjop",
          poeng: VEKT.avgjorende,
          grunn: "Fastpris-oppkjøp er den raskeste veien fra bil til penger på konto.",
        },
        {
          kanal: "forhandlerauksjon",
          poeng: VEKT.moderat,
          grunn: "En budrunde er unnagjort på dager, ikke uker.",
        },
        {
          kanal: "privatsalg",
          poeng: -VEKT.sterk,
          grunn: "Privatsalg tar typisk flere uker fra annonse til oppgjør.",
        },
        {
          kanal: "kommisjon",
          poeng: -VEKT.avgjorende,
          grunn: "Kommisjon tar typisk en til tre måneder før bilen er solgt.",
        },
      ];
    }
    if (input.hastverk === "fleksibel") {
      return [
        {
          kanal: "privatsalg",
          poeng: VEKT.moderat,
          grunn: "Når du kan vente, er tid det du bytter mot høyere pris.",
        },
        {
          kanal: "kommisjon",
          poeng: VEKT.moderat,
          grunn: "Kommisjon trenger tid for å finne riktig kjøper, og den tiden har du.",
        },
      ];
    }
    return [];
  },
};

const innsatsRegel: Rule = {
  id: "innsats",
  apply: (_vehicle, input) => {
    if (input.onsketInnsats === "minimalt") {
      return [
        {
          kanal: "fastpris-oppkjop",
          poeng: VEKT.sterk,
          grunn: "Ett skjema, ett tilbud, én levering.",
        },
        {
          kanal: "kommisjon",
          poeng: VEKT.moderat,
          grunn: "Noen andre gjør jobben, og du beholder mesteparten av prisforskjellen.",
        },
        {
          kanal: "innbytte",
          poeng: VEKT.moderat,
          grunn: "Innbytte krever ingenting av deg utover å møte opp.",
        },
        {
          kanal: "privatsalg",
          poeng: -VEKT.sterk,
          grunn: "Privatsalg betyr annonse, bilder, visninger, prutere og kontrakt.",
        },
      ];
    }
    if (input.onsketInnsats === "mye") {
      return [
        {
          kanal: "privatsalg",
          poeng: VEKT.sterk,
          grunn: "Er du villig til å gjøre jobben selv, er det her gevinsten ligger.",
        },
      ];
    }
    return [];
  },
};

const nybilkjopRegel: Rule = {
  id: "nybilkjop",
  apply: (_vehicle, input) => {
    if (!input.planleggerNybilkjop) return [];
    return [
      {
        kanal: "innbytte",
        poeng: VEKT.avgjorende,
        grunn: "Du skal uansett til forhandler. Innbytte er enklest, og kan forhandles som del av totalprisen.",
      },
      {
        kanal: "kommisjon",
        poeng: VEKT.svak,
        grunn: "Flere forhandlere tar bilen i kommisjon som alternativ til innbytte, med høyere pris til deg.",
      },
    ];
  },
};

const heftelserRegel: Rule = {
  id: "heftelser",
  apply: (_vehicle, input) => {
    if (input.heftelser !== true) return [];
    return [
      {
        kanal: "privatsalg",
        poeng: -VEKT.sterk,
        grunn: "Pant på bilen kompliserer et privatsalg. Kjøper vil ha dokumentasjon på at gjelden innfris ved overtakelse.",
      },
      {
        kanal: "forhandlerauksjon",
        poeng: VEKT.moderat,
        grunn: "Profesjonelle kjøpere har rutiner for å innfri pant som del av oppgjøret.",
      },
      {
        kanal: "fastpris-oppkjop",
        poeng: VEKT.moderat,
        grunn: "Oppkjøperen håndterer innfrielse av lånet direkte mot banken.",
      },
      {
        kanal: "innbytte",
        poeng: VEKT.svak,
        grunn: "Forhandleren innfrir restgjelden og motregner i den nye bilen.",
      },
    ];
  },
};

/**
 * Verdinivå. Kanalene har helt ulik kostnadsstruktur, og et fast meglergebyr som
 * er ubetydelig på en bil til 600 000 kr er uforsvarlig på en til 60 000 kr.
 * Brukerens eget anslag er grovt, men retningen er riktig, og alternativet er
 * å ikke ta hensyn til verdi i det hele tatt.
 */
const verdinivaRegel: Rule = {
  id: "verdiniva",
  apply: (_vehicle, input) => {
    const verdi = input.antattVerdi;
    if (verdi == null || verdi <= 0) return [];

    if (verdi < 50_000) {
      return [
        {
          kanal: "kommisjon",
          poeng: -VEKT.avgjorende,
          grunn: "Et fast meglergebyr spiser en urimelig stor del av salgssummen på en rimelig bil.",
        },
        {
          kanal: "fastpris-oppkjop",
          poeng: VEKT.moderat,
          grunn: "På lave summer er forskjellen mellom kanalene liten, og enkelhet veier tyngst.",
        },
        {
          kanal: "privatsalg",
          poeng: VEKT.svak,
          grunn: "På rimelige biler er privatmarkedet ofte det eneste som gir en pris over vrakverdi.",
        },
      ];
    }
    if (verdi >= 500_000) {
      return [
        {
          kanal: "kommisjon",
          poeng: VEKT.sterk,
          grunn: "På dyre biler er gebyret en liten andel, og megleren når kjøpere du ikke når selv.",
        },
        {
          kanal: "innbytte",
          poeng: -VEKT.moderat,
          grunn: "Avstanden mellom innbyttepris og markedspris er størst i kroner nettopp på dyre biler.",
        },
        {
          kanal: "auksjonshus",
          poeng: VEKT.svak,
          grunn: "Dyre og spesielle biler treffer ofte et eget kjøpersegment på auksjon.",
        },
      ];
    }
    return [];
  },
};

export const rules: Rule[] = [
  kjorbarhetRegel,
  avregistrertRegel,
  kilometerstandRegel,
  alderRegel,
  veteranRegel,
  euKontrollRegel,
  elbilRegel,
  tilstandRegel,
  hastverkRegel,
  innsatsRegel,
  nybilkjopRegel,
  heftelserRegel,
  verdinivaRegel,
];

/** Eksporteres for testformål. */
export const _internals = { alderIAr, dagerTil, erElektrisk };
export type { SalgsvurderingInput };
