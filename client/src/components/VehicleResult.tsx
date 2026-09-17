import type { Vehicle } from "../../../shared/vehicle";

type Props = {
  vehicle: Vehicle;
};

function felt(label: string, verdi: string | number | null) {
  return (
    <div className="flex justify-between border-b border-slate-100 py-1 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900">{verdi ?? "—"}</span>
    </div>
  );
}

export function VehicleResult({ vehicle }: Props) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <h2 className="mb-2 text-lg font-semibold">
        {vehicle.merke} {vehicle.modell} {vehicle.variant}
      </h2>

      {vehicle.avregistrert && (
        <p className="mb-2 rounded bg-amber-50 px-2 py-1 text-sm text-amber-800">
          Kjøretøyet er avregistrert.
        </p>
      )}

      {felt("Kjennemerke", vehicle.kjennemerke)}
      {felt("Førstegangsregistrert", vehicle.forstegangsregistrert)}
      {felt("Drivstoff", vehicle.drivstoff)}
      {felt("Effekt", vehicle.effektKw ? `${Math.round(vehicle.effektKw)} kW` : null)}
      {felt("Girkasse", vehicle.girkasse)}
      {felt("Karosseri", vehicle.karosseri)}
      {felt("Antall seter", vehicle.antallSeter)}
      {felt("Egenvekt", vehicle.egenvektKg ? `${vehicle.egenvektKg} kg` : null)}
      {felt("Totalvekt", vehicle.totalvektKg ? `${vehicle.totalvektKg} kg` : null)}
      {felt("CO2-utslipp", vehicle.co2GPrKm ? `${vehicle.co2GPrKm} g/km` : null)}
      {felt("Euroklasse", vehicle.euroklasse)}
      {felt("Rekkevidde", vehicle.rekkeviddeKm ? `${vehicle.rekkeviddeKm} km` : null)}
      {felt("Registreringsstatus", vehicle.registreringsstatus)}
      {felt("EU-kontrollfrist", vehicle.euKontrollfrist)}
      {felt("Sist godkjent EU-kontroll", vehicle.euKontrollSistGodkjent)}

      <p className="mt-4 text-xs text-slate-400">
        Tekniske kjøretøydata fra Statens vegvesen (Autosys), lisensiert under CC BY 4.0. Denne
        tjenesten er ikke offisiell eller godkjent av Statens vegvesen.
      </p>
    </div>
  );
}
