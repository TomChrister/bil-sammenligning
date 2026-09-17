import { useState } from "react";
import { slaOppKjoretoy } from "./api/vehicleClient";
import { anbefalSalgskanal } from "../../shared/recommendation/engine";
import type { Vehicle } from "../../shared/vehicle";
import type { AnbefalingResultat, SalgsvurderingInput } from "../../shared/recommendation/types";
import { RegnrForm } from "./components/RegnrForm";
import { VehicleResult } from "./components/VehicleResult";
import { ConditionForm } from "./components/ConditionForm";
import { RecommendationView } from "./components/RecommendationView";

function App() {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [anbefaling, setAnbefaling] = useState<AnbefalingResultat | null>(null);
  const [loading, setLoading] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  async function handleOppslag(kjennemerke: string) {
    setLoading(true);
    setFeil(null);
    setVehicle(null);
    setAnbefaling(null);

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
    setAnbefaling(anbefalSalgskanal(vehicle, input));
  }

  return (
    <main className="mx-auto flex max-w-xl flex-col gap-6 px-4 py-10">
      <header>
        <h1 className="text-2xl font-bold">Bilsalg-anbefaler</h1>
        <p className="text-sm text-slate-500">
          Slå opp registreringsnummeret ditt og få en veiledende anbefaling om salgskanal.
        </p>
      </header>

      <RegnrForm onSubmit={handleOppslag} loading={loading} />

      {feil && <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{feil}</p>}

      {vehicle && (
        <>
          <VehicleResult vehicle={vehicle} />
          <ConditionForm onSubmit={handleSalgsvurdering} />
        </>
      )}

      {anbefaling && <RecommendationView resultat={anbefaling} />}
    </main>
  );
}

export default App;
