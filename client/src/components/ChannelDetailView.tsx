import type { KanalResultat } from "../../../shared/recommendation/types";
import { CHANNEL_PRESENTATION, grunnerFor } from "../lib/channelPresentation";
import { Button } from "../design-system/components/core/Button.jsx";
import { Icon } from "../design-system/components/core/Icon.jsx";
import { TradeoffMeter } from "../design-system/components/product/TradeoffMeter.jsx";
import { ReasonList } from "../design-system/components/product/ReasonList.jsx";
import { ProviderRow } from "../design-system/components/product/ProviderRow.jsx";
import { DisclosureNote } from "../design-system/components/product/DisclosureNote.jsx";

type Props = {
  kanal: KanalResultat;
  onTilbake: () => void;
};

export function ChannelDetailView({ kanal, onTilbake }: Props) {
  const presentation = CHANNEL_PRESENTATION[kanal.kanal];
  const grunner = grunnerFor(kanal);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Button
          variant="ghost"
          size="sm"
          icon="arrow-left"
          className="mb-6 -ml-4"
          onClick={onTilbake}
        >
          Tilbake til rangeringen
        </Button>
        <h1 className="flex items-center gap-4">
          <Icon name={presentation.icon} size={40} />
          {kanal.navn}
        </h1>
        <p className="k-lead mt-4">{kanal.beskrivelse}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 border-y border-line-subtle py-8 sm:grid-cols-3">
        {presentation.meters.map((m) => (
          <TradeoffMeter key={m.label} {...m} />
        ))}
      </div>

      {grunner.length > 0 && (
        <section>
          <h2 className="k-h3 mb-4">Slik passer kanalen for din bil</h2>
          <ReasonList items={grunner} />
        </section>
      )}

      <section>
        <h2 className="k-h3 mb-2">Tilbydere</h2>
        <div className="k-rows">
          {kanal.leverandorer.map((l) => (
            <div key={l.id}>
              <ProviderRow
                name={l.navn}
                note={`${l.kostnadSelger} · Utbetaling: ${l.utbetaling}`}
                href={l.url || undefined}
              />
              {l.uverifisert && (
                <p className="pb-4 [font:var(--type-caption)] text-ink-secondary">
                  Tallene er ikke verifisert mot primærkilde. Sist sjekket {l.sistVerifisert}.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <DisclosureNote variant="noPrice" boxed />
    </div>
  );
}
