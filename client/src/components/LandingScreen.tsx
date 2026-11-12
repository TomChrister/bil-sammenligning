import type { ReactNode } from "react";
import { RegnrForm } from "./RegnrForm";
import { DATAFELT, DATAKILDE_LENKER, EKSEMPEL_RADER, HVORDAN, KANALER } from "./landingContent";
import { scrollTilOppslag } from "../lib/scrollTilOppslag";
import { Icon } from "../design-system/components/core/Icon.jsx";
import { Button } from "../design-system/components/core/Button.jsx";
import { Callout } from "../design-system/components/core/Callout.jsx";
import { PlateInput } from "../design-system/components/forms/PlateInput.jsx";
import { RankBadge } from "../design-system/components/product/RankBadge.jsx";
import { DisclosureNote } from "../design-system/components/product/DisclosureNote.jsx";
import { ProviderRow } from "../design-system/components/product/ProviderRow.jsx";

type Props = {
  onSubmit: (kjennemerke: string) => void;
  loading: boolean;
  feil: string | null;
};

const TO_KOLONNER = "k-wrap grid grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-20";

function SectionHead({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return (
    <div className="k-secthead">
      <div>
        <div className="k-eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function HeroPreview() {
  return (
    <div className="k-panel">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="k-eyebrow">Eksempel på resultat</div>
          <div className="k-rowtitle">Volkswagen Golf 1.6 TDI</div>
        </div>
        <PlateInput size="sm" value="EK 84213" readOnly />
      </div>
      <ol className="k-rows">
        {EKSEMPEL_RADER.map((r) => (
          <li key={r.rank} className="flex items-center gap-3 py-4">
            <RankBadge rank={r.rank} size="sm" />
            <span className="[font:var(--type-h4)]">{r.name}</span>
            <span className="ml-auto text-right [font:var(--type-caption)] text-ink-secondary">
              {r.note}
            </span>
          </li>
        ))}
      </ol>
      <div className="pt-4 [font:var(--type-caption)] text-ink-secondary">+ 2 kanaler til</div>
    </div>
  );
}

export function LandingScreen({ onSubmit, loading, feil }: Props) {
  return (
    <div>
      <section className="k-hero k-chalk">
        <div className="k-wrap k-hero__grid">
          <div>
            <div className="k-eyebrow">
              <Icon name="shield-check" size={16} />
              Uavhengig · ingen prisvurdering
            </div>
            <h1 className="k-h1">Hvor bør bilen din selges?</h1>
            <p className="k-lead">
              Slå opp skiltet, svar på noen spørsmål, og få seks salgskanaler rangert — med
              begrunnelse og faktiske tilbydere under hver kanal.
            </p>
            <div id="skilt-oppslag">
              <RegnrForm onSubmit={onSubmit} loading={loading} />
            </div>
            {feil && (
              <Callout tone="danger" className="mb-4 bg-card">
                {feil}
              </Callout>
            )}
            <DisclosureNote variant="both" />
          </div>
          <HeroPreview />
        </div>
      </section>

      <section id="slik-virker-det" className="k-section">
        <div className="k-wrap">
          <SectionHead eyebrow="Slik virker det" title="Tre steg, ingen registrering" />
          <ol className="k-grid3">
            {HVORDAN.map((h) => (
              <li key={h.n} className="k-step">
                <span className="k-stepnum" aria-hidden="true">
                  {h.n}
                </span>
                <h3>{h.title}</h3>
                <p className="text-ink-secondary">{h.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="salgskanaler" className="k-section k-chalk">
        <div className="k-wrap">
          <SectionHead
            eyebrow="Seks kanaler"
            title="Kanalene vi rangerer"
            action={
              <Button variant="secondary" iconAfter="arrow-right" onClick={scrollTilOppslag}>
                Se hva som passer din bil
              </Button>
            }
          />
          <ul className="k-grid3">
            {KANALER.map((c) => (
              <li key={c.name} className="k-chan">
                <Icon name={c.icon} size={24} />
                <div>
                  <h3 className="k-h4">{c.name}</h3>
                  <p className="mt-1 [font:var(--type-body-sm)] text-ink-secondary">{c.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="om-dataene" className="k-section">
        <div className={TO_KOLONNER}>
          <div>
            <div className="k-eyebrow">Om dataene</div>
            <h2 className="mb-6">Tekniske data fra registeret, vurderingen fra deg</h2>
            <p className="k-lead">
              Vi slår opp skiltnummeret hos Statens vegvesen og bruker de tekniske dataene som de
              er. Alt som handler om tilstand, hastverk og egeninnsats er dine egne svar. Vi
              legger ikke til en verdivurdering.
            </p>
            <div className="mt-8">
              <Button iconAfter="arrow-right" onClick={scrollTilOppslag}>
                Slå opp bilen din
              </Button>
            </div>
          </div>
          <div>
            <div className="k-eyebrow">Dette henter vi</div>
            <ul className="flex flex-wrap gap-2">
              {DATAFELT.map((t) => (
                <li key={t} className="bs-tag bs-tag--lg">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <DisclosureNote variant="official" />
            </div>
          </div>
        </div>
      </section>

      <section id="datakilde" className="k-section k-section--dark">
        <div className={TO_KOLONNER}>
          <div>
            <div className="k-eyebrow">Datakilde</div>
            <h2 className="mb-6">Kjøretøydata fra Statens vegvesen</h2>
            <p className="max-w-[56ch] text-ink-inverse-secondary">
              Tekniske kjøretøyopplysninger hentes fra Statens vegvesens API for enkeltoppslag
              i motorvognregisteret (Autosys). Dataene er levert av Statens vegvesen og
              lisensiert under{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/deed.no"
                target="_blank"
                rel="noreferrer"
                className="text-ink-inverse"
              >
                Creative Commons Navngivelse 4.0 (CC BY 4.0)
              </a>
              . Bilmatch er ikke tilknyttet Statens vegvesen.
            </p>
          </div>
          <div className="k-rows">
            {DATAKILDE_LENKER.map((l) => (
              <ProviderRow key={l.href} name={l.name} note={l.note} mark={l.mark} href={l.href} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
