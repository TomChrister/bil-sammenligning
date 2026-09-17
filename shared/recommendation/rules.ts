import type { Vehicle } from "../vehicle";
import type { SalgsvurderingInput, SalgskanalId } from "./types";

export const KANAL_NAVN: Record<SalgskanalId, string> = {
  nettbil: "Nettbil",
  "finn-privat": "FINN privat",
  innbytte: "Innbytte hos forhandler",
  oppkjopstjeneste: "Oppkjøpstjeneste (f.eks. Rebil)",
};

export type Justering = {
  kanal: SalgskanalId;
  poeng: number;
  grunn: string;
};

export type Rule = (vehicle: Vehicle, input: SalgsvurderingInput) => Justering[];

function alderIAr(vehicle: Vehicle): number | null {
  if (!vehicle.forstegangsregistrert) return null;
  const registrert = new Date(vehicle.forstegangsregistrert).getTime();
  if (Number.isNaN(registrert)) return null;
  const nå = Date.now();
  return (nå - registrert) / (1000 * 60 * 60 * 24 * 365.25);
}

function dagerTil(dato: string | null): number | null {
  if (!dato) return null;
  const tid = new Date(dato).getTime();
  if (Number.isNaN(tid)) return null;
  return (tid - Date.now()) / (1000 * 60 * 60 * 24);
}

const avregistrertRegel: Rule = (vehicle) => {
  if (!vehicle.avregistrert) return [];
  return [
    {
      kanal: "nettbil",
      poeng: 2,
      grunn: "Bilen er avregistrert — forhandlere på auksjon har rutiner for dette.",
    },
    {
      kanal: "oppkjopstjeneste",
      poeng: 2,
      grunn: "Oppkjøpstjenester håndterer avregistrerte biler uten ekstra friksjon.",
    },
    {
      kanal: "finn-privat",
      poeng: -3,
      grunn: "Private kjøpere kvier seg ofte for avregistrerte biler.",
    },
    {
      kanal: "innbytte",
      poeng: -1,
      grunn: "Avregistrering kan gjøre innbytteverdien lavere hos forhandler.",
    },
  ];
};

const kilometerstandRegel: Rule = (_vehicle, input) => {
  if (input.kilometerstand > 150_000) {
    return [
      { kanal: "nettbil", poeng: 1, grunn: "Høy kilometerstand gjør auksjon blant forhandlere til en effektiv kanal." },
      { kanal: "oppkjopstjeneste", poeng: 1, grunn: "Høy kilometerstand passer godt med fastpris-oppkjøp." },
      { kanal: "finn-privat", poeng: -1, grunn: "Høy kilometerstand demper interessen fra private kjøpere." },
    ];
  }
  if (input.kilometerstand < 50_000) {
    return [
      { kanal: "finn-privat", poeng: 2, grunn: "Lav kilometerstand er attraktivt for private kjøpere og kan gi høyere pris." },
    ];
  }
  return [];
};

const alderRegel: Rule = (vehicle) => {
  const alder = alderIAr(vehicle);
  if (alder === null) return [];
  if (alder > 15) {
    return [
      { kanal: "nettbil", poeng: 1, grunn: "Eldre biler omsettes ofte greit gjennom forhandlerauksjon." },
      { kanal: "oppkjopstjeneste", poeng: 1, grunn: "Eldre biler passer godt for et raskt fastpris-oppkjøp." },
    ];
  }
  if (alder <= 5) {
    return [{ kanal: "finn-privat", poeng: 1, grunn: "Nyere biler har typisk høyest prispotensial i privatmarkedet." }];
  }
  return [];
};

const euKontrollRegel: Rule = (vehicle) => {
  const justeringer: Justering[] = [];
  const tilFrist = dagerTil(vehicle.euKontrollfrist);
  if (tilFrist !== null && tilFrist < 60) {
    justeringer.push(
      { kanal: "finn-privat", poeng: -2, grunn: "EU-kontrollen nærmer seg eller har gått ut — kan skremme private kjøpere." },
      { kanal: "nettbil", poeng: 1, grunn: "Forhandlere er vant til å håndtere snarlig EU-kontroll." },
      { kanal: "oppkjopstjeneste", poeng: 1, grunn: "Fastpris-oppkjøp påvirkes mindre av snarlig EU-kontroll." },
    );
  }

  if (vehicle.euKontrollSistGodkjent) {
    const dagerSiden = -1 * (dagerTil(vehicle.euKontrollSistGodkjent) ?? 0);
    if (dagerSiden >= 0 && dagerSiden < 60) {
      justeringer.push({
        kanal: "finn-privat",
        poeng: 1,
        grunn: "Nylig bestått EU-kontroll er et godt salgsargument overfor private kjøpere.",
      });
    }
  }

  return justeringer;
};

const elbilKortRekkeviddeRegel: Rule = (vehicle) => {
  const alder = alderIAr(vehicle);
  const erElektrisk = vehicle.drivstoff?.toLowerCase().includes("elektrisk") ?? false;
  if (!erElektrisk || vehicle.rekkeviddeKm === null || alder === null) return [];
  if (vehicle.rekkeviddeKm < 250 && alder > 6) {
    return [
      {
        kanal: "innbytte",
        poeng: 2,
        grunn: "Eldre elbil med kort rekkevidde er ofte enklere å bli kvitt via innbytte enn i privatmarkedet.",
      },
      {
        kanal: "oppkjopstjeneste",
        poeng: 1,
        grunn: "Batterilevetid er vanskelig for private kjøpere å vurdere — fastpris-oppkjøp tar den risikoen.",
      },
      {
        kanal: "finn-privat",
        poeng: -2,
        grunn: "Kort rekkevidde og batteribekymring demper interessen i privatmarkedet.",
      },
    ];
  }
  return [];
};

const veteranNisjeRegel: Rule = (vehicle) => {
  const alder = alderIAr(vehicle);
  if (alder === null || alder < 30) return [];
  return [
    {
      kanal: "finn-privat",
      poeng: 2,
      grunn: "Veteran-/nisjebiler har ofte et engasjert marked av private samlere villige til å betale mer.",
    },
    {
      kanal: "nettbil",
      poeng: -1,
      grunn: "Forhandlere byr ofte lavt på nisjebiler uten naturlig videresalgskanal.",
    },
  ];
};

const tilstandRegel: Rule = (_vehicle, input) => {
  switch (input.tilstand) {
    case "darlig":
      return [
        { kanal: "nettbil", poeng: 2, grunn: "Dårlig tilstand er enklere å prise inn i en forhandlerauksjon." },
        { kanal: "oppkjopstjeneste", poeng: 2, grunn: "Fastpris-oppkjøp tar risikoen for tilstanden av dine hender." },
        { kanal: "finn-privat", poeng: -2, grunn: "Dårlig tilstand fører ofte til tøff prisforhandling og reklamasjonsrisiko ved privatsalg." },
      ];
    case "akseptabel":
      return [
        { kanal: "nettbil", poeng: 1, grunn: "Akseptabel stand omsettes greit gjennom forhandlerauksjon." },
        { kanal: "finn-privat", poeng: -1, grunn: "Akseptabel stand gir noe mindre forhandlingsrom i privatmarkedet." },
      ];
    case "meget-god":
      return [
        { kanal: "finn-privat", poeng: 2, grunn: "Meget god stand gir best uttelling nettopp ved privatsalg." },
      ];
    default:
      return [];
  }
};

const planleggerNybilkjopRegel: Rule = (_vehicle, input) => {
  if (!input.planleggerNybilkjop) return [];
  return [
    {
      kanal: "innbytte",
      poeng: 3,
      grunn: "Du skal uansett til forhandler for ny bil — innbytte er det enkleste alternativet og kan gi bedre totalbetingelser.",
    },
  ];
};

export const rules: Rule[] = [
  avregistrertRegel,
  kilometerstandRegel,
  alderRegel,
  euKontrollRegel,
  elbilKortRekkeviddeRegel,
  veteranNisjeRegel,
  tilstandRegel,
  planleggerNybilkjopRegel,
];
