import { useState } from "react";
import type {
  KanalResultatMedLeverandorer,
  SalgsvurderingResultat,
} from "../../../shared/recommendation/score";
import type { SalgsvurderingInput } from "../../../shared/recommendation/types";
import type { Vehicle } from "../../../shared/vehicle";
import { CHANNEL_PRESENTATION } from "../lib/channelPresentation";
import { ChannelRankCard } from "../design-system/components/product/ChannelRankCard.jsx";
import { ReasonList } from "../design-system/components/product/ReasonList.jsx";
import { TradeoffMeter } from "../design-system/components/product/TradeoffMeter.jsx";
import { ProviderRow } from "../design-system/components/product/ProviderRow.jsx";
import { RankBadge } from "../design-system/components/product/RankBadge.jsx";
import { DisclosureNote } from "../design-system/components/product/DisclosureNote.jsx";
import { Card } from "../design-system/components/core/Card.jsx";
import { Icon } from "../design-system/components/core/Icon.jsx";
import { Button } from "../design-system/components/core/Button.jsx";
import { Divider } from "../design-system/components/core/Divider.jsx";
import { PlateInput } from "../design-system/components/forms/PlateInput.jsx";
import { Tabs } from "../design-system/components/navigation/Tabs.jsx";
import { StepProgress } from "../design-system/components/navigation/StepProgress.jsx";
import { Dialog } from "../design-system/components/feedback/Dialog.jsx";
import { HowItWorks } from "./HowItWorks";

type Props = {
  vehicle: Vehicle;
  input: SalgsvurderingInput;
  resultat: SalgsvurderingResultat;
  onVelgKanal: (kanal: KanalResultatMedLeverandorer) => void;
  onRediger: () => void;
  onRestart: () => void;
};

const FLOW_STEPS = ["Skilt", "Bilen", "Spørsmål", "Resultat"];

const TILSTAND_LABEL: Record<SalgsvurderingInput["tilstand"], string> = {
  "meget-god": "Meget god",
  god: "Normal bruksslitasje",
  akseptabel: "Akseptabel",
  darlig: "Dårlig",
  "ikke-kjorbar": "Ikke kjørbar",
};

const HASTVERK_LABEL: Record<SalgsvurderingInput["hastverk"], string> = {
  haster: "Haster",
  normal: "Innen noen uker",
  fleksibel: "God tid",
};

const INNSATS_LABEL: Record<SalgsvurderingInput["onsketInnsats"], string> = {
  minimalt: "Minst mulig",
  noe: "Noe",
  mye: "Mye",
};

export function RecommendationView({
  vehicle,
  input,
  resultat,
  onVelgKanal,
  onRediger,
  onRestart,
}: Props) {
  const [tab, setTab] = useState("alle");
  const [forklaringApen, setForklaringApen] = useState(false);

  const vinner = resultat.rangering[0];
  const bilNavn = [vehicle.merke, vehicle.modell].filter(Boolean).join(" ") || "bilen din";

  const svar = [
    { label: "Tilstand", value: TILSTAND_LABEL[input.tilstand] },
    { label: "Kilometerstand", value: `${input.kilometerstand.toLocaleString("nb-NO")} km` },
    { label: "Hastverk", value: HASTVERK_LABEL[input.hastverk] },
    { label: "Egeninnsats", value: INNSATS_LABEL[input.onsketInnsats] },
  ];

  return (
    <div className="k-flow">
      <div className="k-flowhead">
        <StepProgress steps={FLOW_STEPS} current={3} />
        <div className="flex gap-2">
          <Button variant="secondary" icon="rotate-ccw" onClick={onRestart}>
            Start på nytt
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-8">
        <div>
          <div className="k-eyebrow">
            <Icon name="list-ordered" size={14} />
            Rangering for din bil
          </div>
          <h1 className="my-2">{vinner ? `${vinner.navn} passer best` : "Rangeringen din"}</h1>
          <p className="max-w-[62ch] [font:var(--type-body-lg)] text-ink-secondary">
            Rangeringen bygger på de tekniske dataene og svarene dine.{" "}
            <button type="button" onClick={() => setForklaringApen(true)} className="underline">
              Slik beregnes den
            </button>
            .
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="[font:var(--type-h4)]">{bilNavn}</div>
            {vehicle.variant && <div className="[font:var(--type-caption)] text-ink-muted">{vehicle.variant}</div>}
          </div>
          <PlateInput value={vehicle.kjennemerke} readOnly />
        </div>
      </div>

      <div className="mb-6">
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { value: "alle", label: "Alle kanaler", count: resultat.rangering.length }
          ]}
        />
      </div>

      {resultat.forbehold.length > 0 && (
        <Card pad="md" className="mb-4">
          <div className="[font:var(--type-eyebrow)] tracking-[var(--tracking-eyebrow)] uppercase text-ink-muted">
            Dette kan påvirke rangeringen
          </div>
          <ul className="mt-2 list-inside list-disc [font:var(--type-body-sm)] text-ink-secondary">
            {resultat.forbehold.map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        </Card>
      )}

      <div className="k-cols">
        <div className="k-stack">
          {resultat.rangering.map((kanal, i) => {
            const full = i < 2;
            const presentation = CHANNEL_PRESENTATION[kanal.kanal];
            const alleGrunner = [
              ...kanal.taler_for.map((j) => ({ type: "pro" as const, text: j.grunn })),
              ...kanal.taler_mot.map((j) => ({ type: "con" as const, text: j.grunn })),
            ];
            return (
              <div key={kanal.kanal} className="k-reveal" style={{ animationDelay: `${i * 40}ms` }}>
                <ChannelRankCard
                  rank={i + 1}
                  name={kanal.navn}
                  icon={presentation.icon}
                  lede={kanal.beskrivelse}
                  badge={i === 0 ? "Anbefalt" : undefined}
                  meta={full ? presentation.meta : []}
                  footer={
                    <>
                      <span className="[font:var(--type-caption)] text-ink-muted">
                        {kanal.leverandorer.length}{" "}
                        {kanal.leverandorer.length === 1 ? "tilbyder" : "tilbydere"}
                      </span>
                      <Button
                        variant="secondary"
                        iconAfter="chevron-right"
                        onClick={() => onVelgKanal(kanal)}
                      >
                        Se kanalen
                      </Button>
                    </>
                  }
                >
                  {full ? (
                    <>
                      <ReasonList items={alleGrunner} />
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        {presentation.meters.map((m) => (
                          <TradeoffMeter key={m.label} {...m} />
                        ))}
                      </div>
                      <div className="flex flex-col gap-2">
                        {kanal.leverandorer.map((l) => (
                          <ProviderRow key={l.id} name={l.navn} note={l.modell} href={l.url || undefined} />
                        ))}
                      </div>
                    </>
                  ) : (
                    <ReasonList items={alleGrunner.slice(0, 1)} />
                  )}
                </ChannelRankCard>
              </div>
            );
          })}
          <DisclosureNote variant="both" boxed />
        </div>

        <aside className="k-aside">
          <Card pad="md">
            <div className="mb-3 flex items-center justify-between">
              <span className="k-eyebrow">Svarene dine</span>
              <Button variant="ghost" size="sm" icon="pencil" onClick={onRediger}>
                Endre
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              {svar.map((s) => (
                <div key={s.label}>
                  <div className="[font:var(--type-eyebrow)] tracking-[var(--tracking-eyebrow)] uppercase text-ink-muted">
                    {s.label}
                  </div>
                  <div className="mt-0.5 [font:var(--type-body-sm)]">{s.value}</div>
                </div>
              ))}
            </div>
            <div className="my-4">
              <Divider />
            </div>
            <div className="[font:var(--type-caption)] text-ink-muted">
              Endrer du ett svar, endres rekkefølgen. Hastverk vekter mest.
            </div>
          </Card>

          <Card pad="md" tone="sunken">
            <div className="mb-3 k-eyebrow">Rekkefølge</div>
            <div className="flex flex-col gap-2">
              {resultat.rangering.map((kanal, i) => (
                <div key={kanal.kanal} className="flex items-center gap-3">
                  <RankBadge rank={i + 1} size="sm" />
                  <span className="[font:var(--type-body-sm)]">{kanal.navn}</span>
                </div>
              ))}
            </div>
          </Card>

          <DisclosureNote variant="source" />
        </aside>
      </div>

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
