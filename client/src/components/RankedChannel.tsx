import type { KanalResultat } from "../../../shared/recommendation/types";
import { CHANNEL_PRESENTATION, grunnerFor } from "../lib/channelPresentation";
import { RankBadge } from "../design-system/components/product/RankBadge.jsx";
import { ReasonList } from "../design-system/components/product/ReasonList.jsx";
import { TradeoffMeter } from "../design-system/components/product/TradeoffMeter.jsx";
import { ProviderRow } from "../design-system/components/product/ProviderRow.jsx";
import { Badge } from "../design-system/components/core/Badge.jsx";
import { Button } from "../design-system/components/core/Button.jsx";
import { Icon } from "../design-system/components/core/Icon.jsx";

type Props = {
  kanal: KanalResultat;
  /** Plassering i rangeringen, 1 er best. */
  rank: number;
  onVelg: () => void;
  /** Gjelder plass 2 og nedover. Vinneren er alltid åpen. */
  apen?: boolean;
  onToggle?: () => void;
};

export function RankedChannel({ kanal, rank, onVelg, apen = false, onToggle }: Props) {
  const presentation = CHANNEL_PRESENTATION[kanal.kanal];
  const grunner = grunnerFor(kanal);

  const innhold = (
    <>
      <ReasonList items={grunner} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {presentation.meters.map((m) => (
          <TradeoffMeter key={m.label} {...m} />
        ))}
      </div>
      <div>
        <h4 className="k-label mb-2">
          {kanal.leverandorer.length === 1 ? "Tilbyder" : "Tilbydere"}
        </h4>
        <div className="k-rows">
          {kanal.leverandorer.map((l) => (
            <ProviderRow key={l.id} name={l.navn} note={l.modell} href={l.url || undefined} />
          ))}
        </div>
      </div>
      <Button variant="secondary" iconAfter="chevron-right" className="self-start" onClick={onVelg}>
        Se kostnader og utbetaling
      </Button>
    </>
  );

  if (rank === 1) {
    return (
      <article className="k-winner k-chalk">
        <div className="flex items-center gap-3">
          <RankBadge rank={rank} />
          <Badge tone="accent">Anbefalt</Badge>
        </div>
        <div>
          <h2 className="flex items-center gap-3">
            <Icon name={presentation.icon} size={32} />
            {kanal.navn}
          </h2>
          <p className="k-lead mt-3">{kanal.beskrivelse}</p>
        </div>
        {innhold}
      </article>
    );
  }

  const innholdId = `kanal-${kanal.kanal}`;
  const forsteGrunn = grunner[0];

  return (
    <article className="k-collapse k-chalk">
      <h3>
        <button
          type="button"
          className="k-collapse__head"
          aria-expanded={apen}
          aria-controls={innholdId}
          onClick={(e) => {
            const head = e.currentTarget;
            onToggle?.();
            // Et åpent kort over dette lukkes og flytter siden. Rull kortet som åpnes opp under toppstripen.
            if (!apen) requestAnimationFrame(() => head.scrollIntoView({ block: "start", behavior: "smooth" }));
          }}
        >
          <RankBadge rank={rank} />
          <span className="min-w-0 flex-1">
            <span className="k-rowtitle">{kanal.navn}</span>
            <span className="block [font:var(--type-body-sm)] text-ink-secondary">
              {presentation.meta.map((m) => m.label).join(" · ")}
            </span>
            {!apen && forsteGrunn && (
              <span className={`bs-reason bs-reason--${forsteGrunn.type} mt-2`}>
                <Icon
                  name={forsteGrunn.type === "con" ? "triangle-alert" : "check"}
                  size={16}
                  className="bs-reason__icon"
                />
                <span>{forsteGrunn.text}</span>
              </span>
            )}
          </span>
          <Icon name="chevron-down" size={20} className="k-collapse__chev" />
        </button>
      </h3>
      {apen && (
        <div id={innholdId} className="k-collapse__body">
          <p className="[font:var(--type-body)] text-ink-secondary">{kanal.beskrivelse}</p>
          {innhold}
        </div>
      )}
    </article>
  );
}
