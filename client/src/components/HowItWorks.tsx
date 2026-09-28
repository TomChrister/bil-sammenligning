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
        Rangeringen er en poengsum, ikke et prisanslag. Den bygger på to ting: tekniske
        kjøretøydata fra Statens vegvesen (alder, EU-kontroll, drivstoff, rekkevidde med mer),
        og svarene du selv oppgir om tilstand, kilometerstand, hastverk, ønsket innsats,
        heftelser og eventuelt eget verdianslag.
      </p>

      <p>
        Hver salgskanal starter på et basispoeng som sier hva som er fornuftig for en helt
        gjennomsnittlig bil. Derfra justerer et sett med regler poengsummen opp eller ned ut
        fra akkurat din bil og din situasjon — for eksempel gir høy kilometerstand i forhold
        til alder et løft til fastpris-oppkjøp og et trekk for privatsalg, mens en bil du
        uansett skal bytte inn hos forhandler løftes kraftig mot innbytte.
      </p>

      <p>
        Til slutt skaleres poengsummen til en indeks fra 40 til 100, slik at kanalene blir
        enkle å sammenligne. Bunnen er bevisst ikke null — selv den lavest rangerte kanalen kan
        være et reelt alternativ for deg. Under hver kanal ser du hvilke konkrete forhold som
        talte for og imot, og hvilke aktører som faktisk tar imot bilen din.
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
              De seks kanalenes sumpoeng skaleres deretter til en indeks fra 40 til 100. For{" "}
              {vinner.navn.toLowerCase()} ga det en indeks på <strong>{vinner.indeks}</strong>.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
