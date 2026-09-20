import { describe, expect, it } from "vitest";
import { beregnSalgsvurdering } from "./score";
import { leverandorerForKanal } from "./providers";
import { BASISPOENG } from "./rules";
import type { Vehicle } from "../vehicle";
import type { SalgsvurderingInput } from "./types";

function lagBil(overrides: Partial<Vehicle> = {}): Vehicle {
  return {
    kjennemerke: "EB11111",
    merke: "Volkswagen",
    modell: "Golf",
    variant: "Comfortline",
    forstegangsregistrert: "2020-01-01",
    drivstoff: "Bensin",
    effektKw: 85,
    girkasse: "Manuell",
    karosseri: "Skapbil",
    antallSeter: 5,
    egenvektKg: 1300,
    totalvektKg: 1800,
    co2GPrKm: 120,
    euroklasse: "6",
    rekkeviddeKm: null,
    registreringsstatus: "Registrert",
    avregistrert: false,
    euKontrollfrist: "2027-01-01",
    euKontrollSistGodkjent: "2025-01-01",
    ...overrides,
  };
}

function lagInput(overrides: Partial<SalgsvurderingInput> = {}): SalgsvurderingInput {
  return {
    kilometerstand: 80_000,
    tilstand: "god",
    hastverk: "normal",
    onsketInnsats: "noe",
    planleggerNybilkjop: false,
    heftelser: false,
    antattVerdi: null,
    ...overrides,
  };
}

describe("beregnSalgsvurdering", () => {
  it("rangerer alle seks kanaler for en helt vanlig bil", () => {
    const resultat = beregnSalgsvurdering(lagBil(), lagInput());
    expect(resultat.rangering).toHaveLength(6);
    expect(resultat.rangering.map((k) => k.kanal)).toEqual(
      expect.arrayContaining([
        "privatsalg",
        "forhandlerauksjon",
        "fastpris-oppkjop",
        "kommisjon",
        "innbytte",
        "auksjonshus",
      ]),
    );
  });

  it("sorterer synkende etter råpoeng", () => {
    const resultat = beregnSalgsvurdering(lagBil(), lagInput());
    const raapoeng = resultat.rangering.map((k) => k.raapoeng);
    expect(raapoeng).toEqual([...raapoeng].sort((a, b) => b - a));
  });

  it("normaliserer indeksen til mellom 40 og 100", () => {
    const resultat = beregnSalgsvurdering(lagBil(), lagInput());
    for (const kanal of resultat.rangering) {
      expect(kanal.indeks).toBeGreaterThanOrEqual(40);
      expect(kanal.indeks).toBeLessThanOrEqual(100);
    }
  });

  it("løfter privatsalg for en fersk bil med lav km og meget god stand", () => {
    const treArSiden = new Date();
    treArSiden.setFullYear(treArSiden.getFullYear() - 3);
    const resultat = beregnSalgsvurdering(
      lagBil({ forstegangsregistrert: treArSiden.toISOString() }),
      lagInput({ kilometerstand: 10_000, tilstand: "meget-god" }),
    );
    const privatsalg = resultat.rangering.find((k) => k.kanal === "privatsalg")!;
    expect(resultat.rangering[0].kanal).toBe("privatsalg");
    expect(privatsalg.raapoeng).toBeGreaterThan(0);
  });

  it("straffer privatsalg og løfter forhandlerauksjon/fastpris-oppkjop for avregistrert bil", () => {
    const medBasis = beregnSalgsvurdering(lagBil(), lagInput());
    const avregistrert = beregnSalgsvurdering(lagBil({ avregistrert: true }), lagInput());

    const privatsalgBasis = medBasis.rangering.find((k) => k.kanal === "privatsalg")!.raapoeng;
    const privatsalgAvreg = avregistrert.rangering.find((k) => k.kanal === "privatsalg")!.raapoeng;
    const forhandlerBasis = medBasis.rangering.find((k) => k.kanal === "forhandlerauksjon")!.raapoeng;
    const forhandlerAvreg = avregistrert.rangering.find((k) => k.kanal === "forhandlerauksjon")!.raapoeng;

    expect(privatsalgAvreg).toBeLessThan(privatsalgBasis);
    expect(forhandlerAvreg).toBeGreaterThan(forhandlerBasis);
  });

  it("løfter innbytte kraftig når bruker skal kjøpe ny bil", () => {
    const utenNybil = beregnSalgsvurdering(lagBil(), lagInput({ planleggerNybilkjop: false }));
    const medNybil = beregnSalgsvurdering(lagBil(), lagInput({ planleggerNybilkjop: true }));
    const innbytteUten = utenNybil.rangering.find((k) => k.kanal === "innbytte")!.raapoeng;
    const innbytteMed = medNybil.rangering.find((k) => k.kanal === "innbytte")!.raapoeng;
    expect(innbytteMed).toBeGreaterThan(innbytteUten);
  });

  it("løfter innbytte/fastpris-oppkjøp og straffer privatsalg for gammel elbil med kort rekkevidde", () => {
    const gammelDato = new Date();
    gammelDato.setFullYear(gammelDato.getFullYear() - 8);
    const resultat = beregnSalgsvurdering(
      lagBil({
        drivstoff: "Elektrisk",
        rekkeviddeKm: 150,
        forstegangsregistrert: gammelDato.toISOString(),
      }),
      lagInput(),
    );
    const privatsalg = resultat.rangering.find((k) => k.kanal === "privatsalg")!;
    const innbytte = resultat.rangering.find((k) => k.kanal === "innbytte")!;
    expect(innbytte.raapoeng).toBeGreaterThan(BASISPOENG.innbytte);
    expect(privatsalg.raapoeng).toBeLessThan(BASISPOENG.privatsalg);
  });

  it("straffer privatsalg og løfter oppkjøpskanaler når bilen ikke er kjørbar", () => {
    const resultat = beregnSalgsvurdering(lagBil(), lagInput({ tilstand: "ikke-kjorbar" }));
    const privatsalg = resultat.rangering.find((k) => k.kanal === "privatsalg")!;
    const fastpris = resultat.rangering.find((k) => k.kanal === "fastpris-oppkjop")!;
    expect(privatsalg.raapoeng).toBeLessThan(BASISPOENG.privatsalg);
    expect(fastpris.raapoeng).toBeGreaterThan(BASISPOENG["fastpris-oppkjop"]);
  });

  it("straffer privatsalg når bilen har heftelser", () => {
    const utenHeftelser = beregnSalgsvurdering(lagBil(), lagInput({ heftelser: false }));
    const medHeftelser = beregnSalgsvurdering(lagBil(), lagInput({ heftelser: true }));
    const privatsalgUten = utenHeftelser.rangering.find((k) => k.kanal === "privatsalg")!.raapoeng;
    const privatsalgMed = medHeftelser.rangering.find((k) => k.kanal === "privatsalg")!.raapoeng;
    expect(privatsalgMed).toBeLessThan(privatsalgUten);
  });

  it("straffer kommisjon kraftig for en rimelig bil", () => {
    const resultat = beregnSalgsvurdering(lagBil(), lagInput({ antattVerdi: 40_000 }));
    const kommisjon = resultat.rangering.find((k) => k.kanal === "kommisjon")!;
    expect(kommisjon.raapoeng).toBeLessThan(BASISPOENG.kommisjon);
  });

  it("gir hver kanal minst én justering i taler_for eller taler_mot når poengsummen avviker fra basispoeng", () => {
    const resultat = beregnSalgsvurdering(lagBil({ avregistrert: true }), lagInput());
    for (const kanal of resultat.rangering) {
      if (kanal.raapoeng !== BASISPOENG[kanal.kanal]) {
        expect(kanal.taler_for.length + kanal.taler_mot.length).toBeGreaterThan(0);
      }
    }
  });

  it("filtrerer bort leverandører som krever testsenter når bilen ikke er kjørbar, men beholder de som ikke krever det", () => {
    const ikkeKjorbarInput = lagInput({ tilstand: "ikke-kjorbar" });
    const forhandlere = leverandorerForKanal("forhandlerauksjon", lagBil(), ikkeKjorbarInput);
    expect(forhandlere.map((l) => l.id)).not.toContain("nettbil");
    expect(forhandlere.map((l) => l.id)).not.toContain("bilnett");
    expect(forhandlere.map((l) => l.id)).toContain("bilskifte");
  });
});
