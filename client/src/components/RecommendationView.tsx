import type { SalgsvurderingResultat } from "../../../shared/recommendation/score";

type Props = {
  resultat: SalgsvurderingResultat;
};

export function RecommendationView({ resultat }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-slate-500">
        Tallene under er en poengsum vi har regnet ut basert på kjøretøydataene og svarene du
        selv oppga i skjemaet over — ikke et prisanslag og ikke hentet fra noen markedsdata.{" "}
        <a href="#slik-fungerer-det" className="underline">
          Se hvordan poengsummen beregnes
        </a>
        .
      </p>

      {resultat.forbehold.length > 0 && (
        <ul className="list-inside list-disc rounded-md bg-amber-50 p-3 text-xs text-amber-800">
          {resultat.forbehold.map((f, idx) => (
            <li key={idx}>{f}</li>
          ))}
        </ul>
      )}

      {resultat.rangering.map((kanal, i) => (
        <div
          key={kanal.kanal}
          className={`rounded-lg border p-4 ${i === 0 ? "border-slate-900 bg-slate-50" : "border-slate-200"}`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              {i + 1}. {kanal.navn}
            </h3>
            <span className="flex flex-col items-end text-sm text-slate-400">
              <span>indeks {kanal.indeks}</span>
              <span className="text-xs">basert på dine svar</span>
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600">{kanal.beskrivelse}</p>

          {(kanal.taler_for.length > 0 || kanal.taler_mot.length > 0) && (
            <ul className="mt-2 list-inside list-disc text-sm">
              {kanal.taler_for.map((j, idx) => (
                <li key={`for-${idx}`} className="text-slate-600">
                  {j.grunn}
                </li>
              ))}
              {kanal.taler_mot.map((j, idx) => (
                <li key={`mot-${idx}`} className="text-red-700">
                  {j.grunn}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-3 flex flex-col gap-2 border-t border-slate-200 pt-3">
            {kanal.leverandorer.map((l) => (
              <div key={l.id} className="text-sm">
                <div className="flex items-center justify-between">
                  <a href={l.url} target="_blank" rel="noreferrer" className="font-medium underline">
                    {l.navn}
                  </a>
                  <span className="text-xs text-slate-400">verifisert {l.sistVerifisert}</span>
                </div>
                <p className="text-slate-600">{l.kostnadSelger}</p>
                <p className="text-slate-500">Utbetaling: {l.utbetaling}</p>
                {l.uverifisert && (
                  <p className="text-xs text-amber-600">Tallene er ikke verifisert mot primærkilde.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
