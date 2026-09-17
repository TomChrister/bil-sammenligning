import { describe, expect, it } from "vitest";
import { anbefalSalgskanal } from "./engine";
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
    planleggerNybilkjop: false,
    ...overrides,
  };
}

describe("anbefalSalgskanal", () => {
  it("rangerer alle fire kanaler", () => {
    const resultat = anbefalSalgskanal(lagBil(), lagInput());
    expect(resultat.rangert).toHaveLength(4);
    expect(resultat.rangert.map((k) => k.kanal)).toEqual(
      expect.arrayContaining(["nettbil", "finn-privat", "innbytte", "oppkjopstjeneste"]),
    );
  });

  it("sorterer synkende etter score", () => {
    const resultat = anbefalSalgskanal(lagBil(), lagInput());
    const scores = resultat.rangert.map((k) => k.score);
    expect(scores).toEqual([...scores].sort((a, b) => b - a));
  });

  it("løfter FINN privat for en fersk bil med lav km og meget god stand", () => {
    const resultat = anbefalSalgskanal(
      lagBil({ forstegangsregistrert: new Date().toISOString() }),
      lagInput({ kilometerstand: 10_000, tilstand: "meget-god" }),
    );
    const finn = resultat.rangert.find((k) => k.kanal === "finn-privat")!;
    expect(finn.score).toBeGreaterThan(0);
    expect(resultat.rangert[0].kanal).toBe("finn-privat");
  });

  it("straffer FINN privat og løfter Nettbil/oppkjøpstjeneste for avregistrert bil", () => {
    const resultat = anbefalSalgskanal(lagBil({ avregistrert: true }), lagInput());
    const finn = resultat.rangert.find((k) => k.kanal === "finn-privat")!;
    const nettbil = resultat.rangert.find((k) => k.kanal === "nettbil")!;
    expect(finn.score).toBeLessThan(0);
    expect(nettbil.score).toBeGreaterThan(0);
  });

  it("løfter innbytte kraftig når bruker skal kjøpe ny bil", () => {
    const utenNybil = anbefalSalgskanal(lagBil(), lagInput({ planleggerNybilkjop: false }));
    const medNybil = anbefalSalgskanal(lagBil(), lagInput({ planleggerNybilkjop: true }));
    const innbytteUten = utenNybil.rangert.find((k) => k.kanal === "innbytte")!.score;
    const innbytteMed = medNybil.rangert.find((k) => k.kanal === "innbytte")!.score;
    expect(innbytteMed).toBeGreaterThan(innbytteUten);
  });

  it("løfter innbytte/oppkjøpstjeneste og straffer FINN privat for gammel elbil med kort rekkevidde", () => {
    const gammelDato = new Date();
    gammelDato.setFullYear(gammelDato.getFullYear() - 8);
    const resultat = anbefalSalgskanal(
      lagBil({
        drivstoff: "Elektrisk",
        rekkeviddeKm: 150,
        forstegangsregistrert: gammelDato.toISOString(),
      }),
      lagInput(),
    );
    const finn = resultat.rangert.find((k) => k.kanal === "finn-privat")!;
    const innbytte = resultat.rangert.find((k) => k.kanal === "innbytte")!;
    expect(innbytte.score).toBeGreaterThan(0);
    expect(finn.score).toBeLessThan(0);
  });

  it("gir hver kanal minst én begrunnelse når en regel har truffet", () => {
    const resultat = anbefalSalgskanal(lagBil({ avregistrert: true }), lagInput());
    for (const kanal of resultat.rangert) {
      if (kanal.score !== 0) {
        expect(kanal.begrunnelse.length).toBeGreaterThan(0);
      }
    }
  });
});
