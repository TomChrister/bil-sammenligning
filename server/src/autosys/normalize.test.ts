import { describe, expect, it } from "vitest";
import { normalizeVehicle } from "./normalize";

type RawVehicle = Parameters<typeof normalizeVehicle>[0];

describe("normalizeVehicle", () => {
  it("tåler et tomt objekt og faller tilbake til oppgitt kjennemerke", () => {
    const vehicle = normalizeVehicle({}, "EB11111");
    expect(vehicle.kjennemerke).toBe("EB11111");
    expect(vehicle.merke).toBeNull();
    expect(vehicle.effektKw).toBeNull();
    expect(vehicle.avregistrert).toBe(false);
  });

  it("flater ut nøstede felt og summerer effekt fra alle motorer", () => {
    const raw = {
      kjoretoyId: { kjennemerke: "EB 11111" },
      forstegangsregistrering: { registrertForstegangNorgeDato: "2020-01-01" },
      registrering: { avregistrertSidenDato: "2024-05-01" },
      godkjenning: {
        tekniskGodkjenning: {
          tekniskeData: {
            generelt: { merke: [{ merke: "TESLA" }], handelsbetegnelse: ["MODEL 3"] },
            motorOgDrivverk: {
              motor: [
                { drivstoff: [{ maksNettoEffekt: 100 }] },
                { drivstoff: [{ maksNettoEffekt: 150 }] },
              ],
            },
          },
        },
      },
    } as RawVehicle;

    const vehicle = normalizeVehicle(raw, "EB11111");
    expect(vehicle.kjennemerke).toBe("EB 11111");
    expect(vehicle.merke).toBe("TESLA");
    expect(vehicle.modell).toBe("MODEL 3");
    expect(vehicle.forstegangsregistrert).toBe("2020-01-01");
    expect(vehicle.effektKw).toBe(250);
    expect(vehicle.avregistrert).toBe(true);
  });
});
