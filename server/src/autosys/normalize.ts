import type { components } from "./types.generated";
import type { Vehicle } from "../../../shared/vehicle";

type RawVehicle = components["schemas"]["EnkeltOppslagKjoretoydata"];

function sumEffektKw(raw: RawVehicle): number | null {
  const motorer = raw.godkjenning?.tekniskGodkjenning?.tekniskeData?.motorOgDrivverk?.motor ?? [];
  const values = motorer.flatMap((motor) =>
    (motor.drivstoff ?? [])
      .map((d) => d.maksNettoEffekt)
      .filter((v): v is number => typeof v === "number"),
  );
  if (values.length === 0) return null;
  return values.reduce((sum, v) => sum + v, 0);
}

export function normalizeVehicle(raw: RawVehicle, requestedPlate: string): Vehicle {
  const tekniskeData = raw.godkjenning?.tekniskGodkjenning?.tekniskeData;
  const generelt = tekniskeData?.generelt;
  const motorOgDrivverk = tekniskeData?.motorOgDrivverk;
  const miljodata = tekniskeData?.miljodata;
  const miljoGruppe = miljodata?.miljoOgdrivstoffGruppe?.[0];
  const forbrukOgUtslipp = miljoGruppe?.forbrukOgUtslipp?.[0];
  const wltp = forbrukOgUtslipp?.wltpKjoretoyspesifikk;

  return {
    kjennemerke: raw.kjoretoyId?.kjennemerke ?? requestedPlate,
    merke: generelt?.merke?.[0]?.merke ?? null,
    modell: generelt?.handelsbetegnelse?.[0] ?? null,
    variant: generelt?.typebetegnelse ?? null,
    forstegangsregistrert: raw.forstegangsregistrering?.registrertForstegangNorgeDato ?? null,
    drivstoff:
      miljoGruppe?.drivstoffKodeMiljodata?.kodeNavn ??
      motorOgDrivverk?.motor?.[0]?.drivstoff?.[0]?.drivstoffKode?.kodeNavn ??
      null,
    effektKw: sumEffektKw(raw),
    girkasse: motorOgDrivverk?.girkassetype?.kodeNavn ?? null,
    karosseri: tekniskeData?.karosseriOgLasteplan?.karosseritype?.kodeNavn ?? null,
    antallSeter: tekniskeData?.persontall?.sitteplasserTotalt ?? null,
    egenvektKg: tekniskeData?.vekter?.egenvekt ?? null,
    totalvektKg: tekniskeData?.vekter?.tillattTotalvekt ?? null,
    co2GPrKm: forbrukOgUtslipp?.co2BlandetKjoring ?? wltp?.co2Kombinert ?? null,
    euroklasse: miljodata?.euroKlasse?.kodeNavn ?? null,
    rekkeviddeKm: forbrukOgUtslipp?.rekkeviddeKm ?? wltp?.rekkeviddeKmBlandetkjoring ?? null,
    registreringsstatus: raw.registrering?.registreringsstatus?.kodeNavn ?? null,
    avregistrert: raw.registrering?.avregistrertSidenDato != null,
    euKontrollfrist: raw.periodiskKjoretoyKontroll?.kontrollfrist ?? null,
    euKontrollSistGodkjent: raw.periodiskKjoretoyKontroll?.sistGodkjent ?? null,
  };
}
