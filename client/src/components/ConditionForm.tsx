import { useState, type FormEvent } from "react";
import type { SalgsvurderingInput, Tilstand } from "../../../shared/recommendation/types";

type Props = {
  onSubmit: (input: SalgsvurderingInput) => void;
};

const TILSTANDER: { verdi: Tilstand; label: string }[] = [
  { verdi: "meget-god", label: "Meget god" },
  { verdi: "god", label: "God" },
  { verdi: "akseptabel", label: "Akseptabel" },
  { verdi: "darlig", label: "Dårlig" },
];

export function ConditionForm({ onSubmit }: Props) {
  const [kilometerstand, setKilometerstand] = useState("");
  const [tilstand, setTilstand] = useState<Tilstand>("god");
  const [planleggerNybilkjop, setPlanleggerNybilkjop] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const km = Number(kilometerstand);
    if (!Number.isFinite(km) || km < 0) return;
    onSubmit({ kilometerstand: km, tilstand, planleggerNybilkjop });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4">
      <h3 className="font-semibold">Km og tilstand</h3>

      <label className="flex flex-col gap-1 text-sm">
        Kilometerstand
        <input
          type="number"
          min={0}
          value={kilometerstand}
          onChange={(e) => setKilometerstand(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2"
          required
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Tilstand
        <select
          value={tilstand}
          onChange={(e) => setTilstand(e.target.value as Tilstand)}
          className="rounded-md border border-slate-300 px-3 py-2"
        >
          {TILSTANDER.map((t) => (
            <option key={t.verdi} value={t.verdi}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={planleggerNybilkjop}
          onChange={(e) => setPlanleggerNybilkjop(e.target.checked)}
        />
        Jeg skal uansett kjøpe ny bil hos forhandler
      </label>

      <button
        type="submit"
        className="mt-2 rounded-md bg-slate-900 px-4 py-2 font-medium text-white"
      >
        Få anbefaling
      </button>
    </form>
  );
}
