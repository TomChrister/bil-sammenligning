import { useEffect, useState } from "react";
import { slaOppKjoretoy } from "./api/vehicleClient";
import {
  beregnSalgsvurdering,
  type KanalResultatMedLeverandorer,
  type SalgsvurderingResultat,
} from "../../shared/recommendation/score";
import type { Vehicle } from "../../shared/vehicle";
import type { SalgsvurderingInput } from "../../shared/recommendation/types";
import { TopBar } from "./components/TopBar";
import { LandingScreen } from "./components/LandingScreen";
import { VehicleResult } from "./components/VehicleResult";
import { ConditionForm } from "./components/ConditionForm";
import { RecommendationView } from "./components/RecommendationView";
import { ChannelDetailView } from "./components/ChannelDetailView";
import { Button } from "./design-system/components/core/Button.jsx";

type Step = "landing" | "vehicle" | "questions" | "results" | "channel-detail";

function App() {
  const [step, setStep] = useState<Step>("landing");
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [svar, setSvar] = useState<SalgsvurderingInput | null>(null);
  const [vurdering, setVurdering] = useState<SalgsvurderingResultat | null>(null);
  const [valgtKanal, setValgtKanal] = useState<KanalResultatMedLeverandorer | null>(null);
  const [loading, setLoading] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  async function handleOppslag(kjennemerke: string) {
    if (kjennemerke.trim().length === 0) return;

    setLoading(true);
    setFeil(null);

    const respons = await slaOppKjoretoy(kjennemerke);
    setLoading(false);

    if (!respons.ok) {
      setFeil(respons.error);
      return;
    }

    setVehicle(respons.vehicle);
    setStep("vehicle");
  }

  function handleSalgsvurdering(input: SalgsvurderingInput) {
    if (!vehicle) return;
    setSvar(input);
    setVurdering(beregnSalgsvurdering(vehicle, input));
    setStep("results");
  }

  function startPaNytt() {
    setStep("landing");
    setVehicle(null);
    setSvar(null);
    setVurdering(null);
    setValgtKanal(null);
    setFeil(null);
  }

  function fokuserSkiltInput() {
    document.getElementById("skilt-oppslag")?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("skilt-input")?.focus({ preventScroll: true });
  }

  return (
    <div className="k-shell">
      <TopBar onHome={startPaNytt} onStart={fokuserSkiltInput} compact={step !== "landing"} />

      <main className="k-main">
        {step === "landing" && (
          <LandingScreen onSubmit={handleOppslag} loading={loading} feil={feil} />
        )}

        {step === "vehicle" && vehicle && (
          <div className="mx-auto flex max-w-[var(--container-narrow)] flex-col gap-6 px-4 py-10">
            <VehicleResult vehicle={vehicle} />
            <div className="flex justify-between">
              <Button variant="ghost" onClick={startPaNytt}>
                Tilbake
              </Button>
              <Button onClick={() => setStep("questions")}>Neste</Button>
            </div>
          </div>
        )}

        {step === "questions" && (
          <div className="mx-auto max-w-[var(--container-narrow)] px-4 py-10">
            <ConditionForm onSubmit={handleSalgsvurdering} />
          </div>
        )}

        {step === "results" && vehicle && svar && vurdering && (
          <RecommendationView
            vehicle={vehicle}
            input={svar}
            resultat={vurdering}
            onVelgKanal={(kanal) => {
              setValgtKanal(kanal);
              setStep("channel-detail");
            }}
            onRediger={() => setStep("questions")}
            onRestart={startPaNytt}
          />
        )}

        {step === "channel-detail" && valgtKanal && (
          <div className="mx-auto max-w-[var(--container-narrow)] px-4 py-10">
            <ChannelDetailView kanal={valgtKanal} onTilbake={() => setStep("results")} />
          </div>
        )}
      </main>

      {step === "landing"}
    </div>
  );
}

export default App;
