export type Tilstand = "meget-god" | "god" | "akseptabel" | "darlig";

export type SalgsvurderingInput = {
  kilometerstand: number;
  tilstand: Tilstand;
  planleggerNybilkjop: boolean;
};

export type SalgskanalId =
  | "nettbil"
  | "finn-privat"
  | "innbytte"
  | "oppkjopstjeneste";

export type KanalAnbefaling = {
  kanal: SalgskanalId;
  navn: string;
  score: number;
  begrunnelse: string[];
};

export type AnbefalingResultat = {
  rangert: KanalAnbefaling[];
};
