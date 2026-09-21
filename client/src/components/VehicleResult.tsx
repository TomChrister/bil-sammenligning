import type { Vehicle } from "../../../shared/vehicle";
import { Card } from "../design-system/components/core/Card.jsx";
import { Callout } from "../design-system/components/core/Callout.jsx";
import { SpecGrid } from "../design-system/components/product/SpecGrid.jsx";
import { DisclosureNote } from "../design-system/components/product/DisclosureNote.jsx";

type Props = {
  vehicle: Vehicle;
};

export function VehicleResult({ vehicle }: Props) {
  const specs = [
    { label: "Kjennemerke", value: vehicle.kjennemerke },
    { label: "Førstegangsregistrert", value: vehicle.forstegangsregistrert ?? "—" },
    { label: "Drivstoff", value: vehicle.drivstoff ?? "—" },
    { label: "Effekt", value: vehicle.effektKw ? `${Math.round(vehicle.effektKw)} kW` : "—" },
    { label: "Girkasse", value: vehicle.girkasse ?? "—" },
    { label: "Karosseri", value: vehicle.karosseri ?? "—" },
    { label: "Antall seter", value: vehicle.antallSeter ?? "—" },
    { label: "Egenvekt", value: vehicle.egenvektKg ? `${vehicle.egenvektKg} kg` : "—" },
    { label: "Totalvekt", value: vehicle.totalvektKg ? `${vehicle.totalvektKg} kg` : "—" },
    { label: "CO2-utslipp", value: vehicle.co2GPrKm ? `${vehicle.co2GPrKm} g/km` : "—" },
    { label: "Euroklasse", value: vehicle.euroklasse ?? "—" },
    { label: "Rekkevidde", value: vehicle.rekkeviddeKm ? `${vehicle.rekkeviddeKm} km` : "—" },
    { label: "Registreringsstatus", value: vehicle.registreringsstatus ?? "—" },
    { label: "EU-kontrollfrist", value: vehicle.euKontrollfrist ?? "—" },
    { label: "Sist godkjent EU-kontroll", value: vehicle.euKontrollSistGodkjent ?? "—" },
  ];

  return (
    <Card pad="lg" className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-h3 font-core font-semibold text-ink">
          {vehicle.merke} {vehicle.modell} {vehicle.variant}
        </h2>
        {vehicle.avregistrert && <Callout tone="warning">Kjøretøyet er avregistrert.</Callout>}
      </div>

      <SpecGrid columns={2} items={specs} />

      <DisclosureNote variant="source" />
    </Card>
  );
}
