import { BASISPOENG } from "../../../shared/recommendation/rules";
import type { KanalResultatMedLeverandorer } from "../../../shared/recommendation/score";
import { Divider } from "../design-system/components/core/Divider.jsx";

type Props = {
  /** Vinnerkanalen for en konkret bil. Utelates for en helt generell forklaring. */
  vinner?: KanalResultatMedLeverandorer;
};

export function HowItWorks({ vinner }: Props) {
  return (
    <div className="flex flex-col gap-3 text-body-sm text-ink-secondary">
      <p>
        Rangeringen er ikke et prisanslag, men et mål på hvor godt hver salgskanal passer for
        akkurat din bil. Hver kanal starter med et basispoeng for en gjennomsnittlig bil, som
        vi justerer opp eller ned ut fra kjøretøydataene og svarene dine. For eksempel løftes
        fastpris-oppkjøp og trekkes privatsalg ned ved høy kilometerstand. Til slutt gjør vi
        poengsummen om til et tall mellom 40 og 100 for hver kanal: jo høyere tall, jo bedre
        passer kanalen. Tallet sier altså ingenting om pris — det brukes kun til å
        sammenligne kanalene mot hverandre.
      </p>

      {vinner && (
        <>
          <Divider />

          <div>
            <div className="mb-2 [font:var(--type-eyebrow)] uppercase tracking-[var(--tracking-eyebrow)] text-ink-muted">
              Eksempel: slik ble {vinner.navn.toLowerCase()} rangert for din bil
            </div>

            <ul className="flex flex-col gap-1.5">
              <li className="flex items-baseline justify-between gap-3">
                <span>Basispoeng for kanalen</span>
                <span className="tabular-nums font-medium text-ink-primary">
                  {BASISPOENG[vinner.kanal]}
                </span>
              </li>
              {[...vinner.taler_for, ...vinner.taler_mot]
                .sort((a, b) => b.poeng - a.poeng)
                .map((j, idx) => (
                  <li key={idx} className="flex items-baseline justify-between gap-3">
                    <span>{j.grunn}</span>
                    <span
                      className={
                        "tabular-nums font-medium " +
                        (j.poeng > 0 ? "text-ink-success" : "text-ink-danger")
                      }
                    >
                      {j.poeng > 0 ? `+${j.poeng}` : j.poeng}
                    </span>
                  </li>
                ))}
            </ul>

            <Divider className="my-2" />

            <div className="flex items-baseline justify-between gap-3">
              <span className="font-medium text-ink-primary">Sum</span>
              <span className="tabular-nums font-semibold text-ink-primary">
                {vinner.raapoeng} poeng
              </span>
            </div>

            <p className="mt-3">
              Denne summen regner vi så om til et tall mellom 40 og 100, der høyere tall betyr
              bedre match. For {vinner.navn.toLowerCase()} ble det <strong>{vinner.indeks}</strong>.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
