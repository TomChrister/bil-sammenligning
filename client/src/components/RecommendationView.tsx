import { useState } from "react";
import type {
  KanalResultat,
  Salgsvurdering,
  SalgsvurderingInput,
} from "../../../shared/recommendation/types";
import type { Vehicle } from "../../../shared/vehicle";
import { DisclosureNote } from "../design-system/components/product/DisclosureNote.jsx";
import { Icon } from "../design-system/components/core/Icon.jsx";
import { Button } from "../design-system/components/core/Button.jsx";
import { PlateInput } from "../design-system/components/forms/PlateInput.jsx";
import { Dialog } from "../design-system/components/feedback/Dialog.jsx";
import { HowItWorks } from "./HowItWorks";
import { RankedChannel } from "./RankedChannel";
import { AnswerSummary } from "./AnswerSummary";

type Props = {
  vehicle: Vehicle;
  input: SalgsvurderingInput;
  resultat: Salgsvurdering;
  onVelgKanal: (kanal: KanalResultat) => void;
  onRediger: () => void;
};

export function RecommendationView({
  vehicle,
  input,
  resultat,
  onVelgKanal,
  onRediger,
}: Props) {
  const [forklaringApen, setForklaringApen] = useState(false);
  // Bare ett kort i resten av rangeringen er åpent om gangen.
  const [apenKanal, setApenKanal] = useState<KanalResultat["kanal"] | null>(null);

  const [vinner, ...resten] = resultat.rangering;
  const bilNavn =
    [vehicle.merke, vehicle.modell, vehicle.variant].filter(Boolean).join(" ") || "bilen din";

  return (
    <div className="k-flow">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div className="min-w-[min(100%,28rem)] flex-1">
          <div className="k-eyebrow">
            <Icon name="list-ordered" size={16} />
            Rangering for {bilNavn}
          </div>
          <h1>{vinner ? `${vinner.navn} passer best` : "Rangeringen din"}</h1>
          <p className="k-lead mt-4">
            Rangeringen bygger på de tekniske dataene og svarene dine.{" "}
            <button
              type="button"
              onClick={() => setForklaringApen(true)}
              className="text-ink underline underline-offset-4"
            >
              Slik beregnes den
            </button>
            .
          </p>
        </div>
        <PlateInput value={vehicle.kjennemerke} readOnly />
      </header>

      <AnswerSummary input={input} onRediger={onRediger} />

      {resultat.forbehold.length > 0 && (
        <div className="mt-6 rounded-xl bg-sunken p-4">
          <div className="[font:var(--type-label)]">Dette kan påvirke rangeringen</div>
          <ul className="k-bullets mt-2 [font:var(--type-body-sm)] text-ink-secondary">
            {resultat.forbehold.map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {vinner && (
        <div className="k-reveal mt-10">
          <RankedChannel kanal={vinner} rank={1} onVelg={() => onVelgKanal(vinner)} />
        </div>
      )}

      {resten.length > 0 && (
        <section className="k-reveal mt-12" style={{ animationDelay: "80ms" }}>
          <h2 className="k-h3 mb-4">Resten av rangeringen</h2>
          <div className="flex flex-col gap-3">
            {resten.map((kanal, i) => (
              <RankedChannel
                key={kanal.kanal}
                kanal={kanal}
                rank={i + 2}
                onVelg={() => onVelgKanal(kanal)}
                apen={apenKanal === kanal.kanal}
                onToggle={() => setApenKanal((a) => (a === kanal.kanal ? null : kanal.kanal))}
              />
            ))}
          </div>
        </section>
      )}

      <DisclosureNote variant="both" boxed className="mt-10" />

      <Dialog
        open={forklaringApen}
        title="Slik beregnes rangeringen"
        icon="list-ordered"
        onClose={() => setForklaringApen(false)}
        footer={<Button onClick={() => setForklaringApen(false)}>Greit</Button>}
      >
        <HowItWorks vinner={vinner} />
      </Dialog>
    </div>
  );
}
