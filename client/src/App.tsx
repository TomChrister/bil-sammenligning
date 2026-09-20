import { useState } from "react";
import { slaOppKjoretoy } from "./api/vehicleClient";
import { beregnSalgsvurdering, type SalgsvurderingResultat } from "../../shared/recommendation/score";
import type { Vehicle } from "../../shared/vehicle";
import type { SalgsvurderingInput } from "../../shared/recommendation/types";
import { RegnrForm } from "./components/RegnrForm";
import { VehicleResult } from "./components/VehicleResult";
import { ConditionForm } from "./components/ConditionForm";
import { RecommendationView } from "./components/RecommendationView";
import { HowItWorks } from "./components/HowItWorks";

function App() {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [vurdering, setVurdering] = useState<SalgsvurderingResultat | null>(null);
  const [loading, setLoading] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  async function handleOppslag(kjennemerke: string) {
    setLoading(true);
    setFeil(null);
    setVehicle(null);
    setVurdering(null);

    const respons = await slaOppKjoretoy(kjennemerke);
    setLoading(false);

    if (!respons.ok) {
      setFeil(respons.error);
      return;
    }

    setVehicle(respons.vehicle);
  }

  function handleSalgsvurdering(input: SalgsvurderingInput) {
    if (!vehicle) return;
    setVurdering(beregnSalgsvurdering(vehicle, input));
  }

  return (
    <main className="mx-auto flex max-w-xl flex-col gap-6 px-4 py-10">
      <header>
        <h1 className="text-2xl font-bold">Bilsalg-anbefaler</h1>
        <p className="text-sm text-slate-500">
          Slå opp registreringsnummeret ditt og få en veiledende anbefaling om salgskanal.
        </p>
      </header>

      <HowItWorks />

      <RegnrForm onSubmit={handleOppslag} loading={loading} />

      {feil && <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{feil}</p>}

      {vehicle && (
        <>
          <VehicleResult vehicle={vehicle} />
          <ConditionForm onSubmit={handleSalgsvurdering} />
        </>
      )}

      {vurdering && <RecommendationView resultat={vurdering} />}
    </main>
  );
}

export default App;
