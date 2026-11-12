import { useEffect, useState } from "react";
import { slaOppKjoretoy } from "./api/vehicleClient";
import { beregnSalgsvurdering } from "../../shared/recommendation/score";
import type { Vehicle } from "../../shared/vehicle";
import type {
  KanalResultat,
  Salgsvurdering,
  SalgsvurderingInput,
} from "../../shared/recommendation/types";
import { TopBar } from "./components/TopBar";
import { LandingScreen } from "./components/LandingScreen";
import { scrollTilOppslag } from "./lib/scrollTilOppslag";
import { VehicleResult } from "./components/VehicleResult";
import { ConditionForm } from "./components/ConditionForm";
import { RecommendationView } from "./components/RecommendationView";
import { ChannelDetailView } from "./components/ChannelDetailView";
import { Button } from "./design-system/components/core/Button.jsx";

type Step = "landing" | "vehicle" | "questions" | "results" | "channel-detail";

/** Felles ramme for de smale stegene i flyten. */
const SMAL_SIDE = "k-flow k-flow--narrow";

/** Plassen hvert steg har i fremdriften i toppstripen. Forsiden viser menyen i stedet. */
const FLYTSTEG: Record<Step, number | undefined> = {
  landing: undefined,
  vehicle: 1,
  questions: 2,
  results: 3,
  "channel-detail": 3,
};

function App() {
  const [step, setStep] = useState<Step>("landing");
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [svar, setSvar] = useState<SalgsvurderingInput | null>(null);
  const [vurdering, setVurdering] = useState<Salgsvurdering | null>(null);
  const [valgtKanal, setValgtKanal] = useState<KanalResultat | null>(null);
  const [loading, setLoading] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  async function handleOppslag(kjennemerke: string) {
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

  return (
    <div className="k-shell">
      <TopBar onHome={startPaNytt} onStart={scrollTilOppslag} flowStep={FLYTSTEG[step]} />

      <main className="k-main">
        {step === "landing" && (
          <LandingScreen onSubmit={handleOppslag} loading={loading} feil={feil} />
        )}

        {step === "vehicle" && vehicle && (
          <div className={SMAL_SIDE}>
            <VehicleResult vehicle={vehicle} />
            <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
              <Button variant="ghost" icon="arrow-left" className="-ml-6" onClick={startPaNytt}>
                Feil bil? Søk på nytt
              </Button>
              <Button
                variant="accent"
                size="lg"
                iconAfter="arrow-right"
                onClick={() => setStep("questions")}
              >
                Dette stemmer
              </Button>
            </div>
          </div>
        )}

        {step === "questions" && (
          <div className={SMAL_SIDE}>
            <ConditionForm onSubmit={handleSalgsvurdering} initial={svar} />
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
          />
        )}

        {step === "channel-detail" && valgtKanal && (
          <div className={SMAL_SIDE}>
            <ChannelDetailView kanal={valgtKanal} onTilbake={() => setStep("results")} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
