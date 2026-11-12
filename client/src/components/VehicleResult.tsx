import type { Vehicle } from "../../../shared/vehicle";
import { Callout } from "../design-system/components/core/Callout.jsx";
import { PlateInput } from "../design-system/components/forms/PlateInput.jsx";
import { SpecGrid } from "../design-system/components/product/SpecGrid.jsx";
import { DisclosureNote } from "../design-system/components/product/DisclosureNote.jsx";

type Props = {
  vehicle: Vehicle;
};

const medEnhet = (verdi: number | null, enhet: string) => (verdi ? `${verdi} ${enhet}` : null);

export function VehicleResult({ vehicle }: Props) {
  // Felt registeret ikke har verdi for skjules, i stedet for å vises som tomme rader.
  const specs = [
    { label: "Førstegangsregistrert", value: vehicle.forstegangsregistrert },
    { label: "Drivstoff", value: vehicle.drivstoff },
    { label: "Effekt", value: medEnhet(vehicle.effektKw && Math.round(vehicle.effektKw), "kW") },
    { label: "Girkasse", value: vehicle.girkasse },
    { label: "Karosseri", value: vehicle.karosseri },
    { label: "Antall seter", value: vehicle.antallSeter },
    { label: "Egenvekt", value: medEnhet(vehicle.egenvektKg, "kg") },
    { label: "Totalvekt", value: medEnhet(vehicle.totalvektKg, "kg") },
    { label: "CO2-utslipp", value: medEnhet(vehicle.co2GPrKm, "g/km") },
    { label: "Euroklasse", value: vehicle.euroklasse },
    { label: "Rekkevidde", value: medEnhet(vehicle.rekkeviddeKm, "km") },
    { label: "Registreringsstatus", value: vehicle.registreringsstatus },
    { label: "EU-kontrollfrist", value: vehicle.euKontrollfrist },
    { label: "Sist godkjent EU-kontroll", value: vehicle.euKontrollSistGodkjent },
  ].filter((s) => s.value != null && s.value !== "");

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="k-eyebrow">Er dette bilen din?</div>
          <h1>{[vehicle.merke, vehicle.modell].filter(Boolean).join(" ") || vehicle.kjennemerke}</h1>
          {vehicle.variant && <p className="k-lead mt-2">{vehicle.variant}</p>}
        </div>
        <PlateInput value={vehicle.kjennemerke} readOnly />
      </header>

      {vehicle.avregistrert && <Callout tone="warning">Kjøretøyet er avregistrert.</Callout>}

      <SpecGrid columns={2} items={specs} />

      <DisclosureNote variant="source" />
    </div>
  );
}
