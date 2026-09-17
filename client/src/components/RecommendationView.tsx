import type { AnbefalingResultat } from "../../../shared/recommendation/types";

type Props = {
  resultat: AnbefalingResultat;
};

export function RecommendationView({ resultat }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-slate-500">
        Veiledende anbefaling basert på tekniske data og informasjonen du oppga. Ingen prisestimat
        gis — vi har ikke datagrunnlag for det.
      </p>

      {resultat.rangert.map((kanal, i) => (
        <div
          key={kanal.kanal}
          className={`rounded-lg border p-4 ${i === 0 ? "border-slate-900 bg-slate-50" : "border-slate-200"}`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              {i + 1}. {kanal.navn}
            </h3>
            <span className="text-sm text-slate-400">score {kanal.score}</span>
          </div>
          {kanal.begrunnelse.length > 0 ? (
            <ul className="mt-2 list-inside list-disc text-sm text-slate-600">
              {kanal.begrunnelse.map((grunn, idx) => (
                <li key={idx}>{grunn}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-400">Ingen spesifikke signaler for denne kanalen.</p>
          )}
        </div>
      ))}
    </div>
  );
}
