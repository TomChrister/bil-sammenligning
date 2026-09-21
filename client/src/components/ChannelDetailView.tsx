import type { KanalResultatMedLeverandorer } from "../../../shared/recommendation/score";
import { CHANNEL_PRESENTATION } from "../lib/channelPresentation";
import { Breadcrumb } from "../design-system/components/navigation/Breadcrumb.jsx";
import { Button } from "../design-system/components/core/Button.jsx";
import { Card } from "../design-system/components/core/Card.jsx";
import { Icon } from "../design-system/components/core/Icon.jsx";
import { TradeoffMeter } from "../design-system/components/product/TradeoffMeter.jsx";
import { ReasonList } from "../design-system/components/product/ReasonList.jsx";
import { ProviderRow } from "../design-system/components/product/ProviderRow.jsx";
import { DisclosureNote } from "../design-system/components/product/DisclosureNote.jsx";

type Props = {
  kanal: KanalResultatMedLeverandorer;
  onTilbake: () => void;
};

export function ChannelDetailView({ kanal, onTilbake }: Props) {
  const presentation = CHANNEL_PRESENTATION[kanal.kanal];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <Breadcrumb items={[{ label: "Resultat" }, { label: kanal.navn }]} />
        <Button variant="ghost" size="sm" icon="arrow-left" onClick={onTilbake}>
          Tilbake
        </Button>
      </div>

      <Card pad="lg" className="flex flex-col gap-2">
        <h2 className="flex items-center gap-2 text-h3 font-core font-semibold text-ink">
          <Icon name={presentation.icon} size={24} strokeColor="var(--kobolt-600)" />
          {kanal.navn}
        </h2>
        <p className="text-body text-ink-secondary">{kanal.beskrivelse}</p>
      </Card>

      <Card pad="lg" className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {presentation.meters.map((m) => (
          <TradeoffMeter key={m.label} {...m} />
        ))}
      </Card>

      {(kanal.taler_for.length > 0 || kanal.taler_mot.length > 0) && (
        <Card pad="lg">
          <ReasonList
            items={[
              ...kanal.taler_for.map((j) => ({ type: "pro" as const, text: j.grunn })),
              ...kanal.taler_mot.map((j) => ({ type: "con" as const, text: j.grunn })),
            ]}
          />
        </Card>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="text-h4 font-core font-semibold text-ink">Tilbydere</h3>
        {kanal.leverandorer.map((l) => (
          <div key={l.id} className="flex flex-col gap-1">
            <ProviderRow
              name={l.navn}
              note={`${l.kostnadSelger} · Utbetaling: ${l.utbetaling}`}
              href={l.url || undefined}
            />
            {l.uverifisert && (
              <p className="pl-1 text-micro text-ink-warning">
                Tallene er ikke verifisert mot primærkilde. Sist sjekket {l.sistVerifisert}.
              </p>
            )}
          </div>
        ))}
      </div>

      <DisclosureNote variant="noPrice" boxed />
    </div>
  );
}
