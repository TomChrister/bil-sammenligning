import { useState, type FormEvent } from "react";
import type {
  Hastverk,
  Innsats,
  SalgsvurderingInput,
  Tilstand,
} from "../../../shared/recommendation/types";

type Props = {
  onSubmit: (input: SalgsvurderingInput) => void;
};

const TILSTANDER: { verdi: Tilstand; label: string }[] = [
  { verdi: "meget-god", label: "Meget god" },
  { verdi: "god", label: "God" },
  { verdi: "akseptabel", label: "Akseptabel" },
  { verdi: "darlig", label: "Dårlig" },
  { verdi: "ikke-kjorbar", label: "Ikke kjørbar" },
];

const HASTVERK: { verdi: Hastverk; label: string }[] = [
  { verdi: "haster", label: "Haster — vil selge raskest mulig" },
  { verdi: "normal", label: "Normal — grei tid, ikke i noen hast" },
  { verdi: "fleksibel", label: "Fleksibel — kan vente på riktig pris" },
];

const INNSATS: { verdi: Innsats; label: string }[] = [
  { verdi: "minimalt", label: "Minimalt — vil ha minst mulig jobb" },
  { verdi: "noe", label: "Noe — greier annonse og visning" },
  { verdi: "mye", label: "Mye — vil legge ned jobben for best pris" },
];

type HeftelserVerdi = "nei" | "ja" | "vet-ikke";

export function ConditionForm({ onSubmit }: Props) {
  const [kilometerstand, setKilometerstand] = useState("");
  const [tilstand, setTilstand] = useState<Tilstand>("god");
  const [hastverk, setHastverk] = useState<Hastverk>("normal");
  const [onsketInnsats, setOnsketInnsats] = useState<Innsats>("noe");
  const [planleggerNybilkjop, setPlanleggerNybilkjop] = useState(false);
  const [heftelser, setHeftelser] = useState<HeftelserVerdi>("vet-ikke");
  const [antattVerdi, setAntattVerdi] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const km = Number(kilometerstand);
    if (!Number.isFinite(km) || km < 0) return;

    const verdi = antattVerdi.trim() === "" ? null : Number(antattVerdi);
    if (verdi !== null && (!Number.isFinite(verdi) || verdi < 0)) return;

    onSubmit({
      kilometerstand: km,
      tilstand,
      hastverk,
      onsketInnsats,
      planleggerNybilkjop,
      heftelser: heftelser === "vet-ikke" ? null : heftelser === "ja",
      antattVerdi: verdi,
    });
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

      <label className="flex flex-col gap-1 text-sm">
        Hvor mye haster salget?
        <select
          value={hastverk}
          onChange={(e) => setHastverk(e.target.value as Hastverk)}
          className="rounded-md border border-slate-300 px-3 py-2"
        >
          {HASTVERK.map((h) => (
            <option key={h.verdi} value={h.verdi}>
              {h.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Hvor mye jobb vil du legge inn selv?
        <select
          value={onsketInnsats}
          onChange={(e) => setOnsketInnsats(e.target.value as Innsats)}
          className="rounded-md border border-slate-300 px-3 py-2"
        >
          {INNSATS.map((i) => (
            <option key={i.verdi} value={i.verdi}>
              {i.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Er det pant eller gjeld registrert på bilen?
        <select
          value={heftelser}
          onChange={(e) => setHeftelser(e.target.value as HeftelserVerdi)}
          className="rounded-md border border-slate-300 px-3 py-2"
        >
          <option value="vet-ikke">Vet ikke</option>
          <option value="nei">Nei</option>
          <option value="ja">Ja</option>
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Ditt eget verdianslag i kroner (valgfritt)
        <input
          type="number"
          min={0}
          value={antattVerdi}
          onChange={(e) => setAntattVerdi(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2"
          placeholder="F.eks. 150000"
        />
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
