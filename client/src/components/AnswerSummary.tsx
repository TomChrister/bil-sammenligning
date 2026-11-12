import type { SalgsvurderingInput } from "../../../shared/recommendation/types";
import { Button } from "../design-system/components/core/Button.jsx";

type Props = {
  input: SalgsvurderingInput;
  onRediger: () => void;
};

const TILSTAND_LABEL: Record<SalgsvurderingInput["tilstand"], string> = {
  "meget-god": "Meget god",
  god: "Normal bruksslitasje",
  akseptabel: "Akseptabel",
  darlig: "Dårlig",
  "ikke-kjorbar": "Ikke kjørbar",
};

const HASTVERK_LABEL: Record<SalgsvurderingInput["hastverk"], string> = {
  haster: "Haster",
  normal: "Innen noen uker",
  fleksibel: "God tid",
};

const INNSATS_LABEL: Record<SalgsvurderingInput["onsketInnsats"], string> = {
  minimalt: "Minst mulig",
  noe: "Noe",
  mye: "Mye",
};

/** Svarene rangeringen bygger på, som én rad med chips rett over resultatet. */
export function AnswerSummary({ input, onRediger }: Props) {
  const svar = [
    { label: "Tilstand", value: TILSTAND_LABEL[input.tilstand] },
    { label: "Kilometerstand", value: `${input.kilometerstand.toLocaleString("nb-NO")} km` },
    { label: "Hastverk", value: HASTVERK_LABEL[input.hastverk] },
    { label: "Egeninnsats", value: INNSATS_LABEL[input.onsketInnsats] },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 [font:var(--type-label)]">Svarene dine</span>
      {svar.map((s) => (
        <span key={s.label} className="bs-tag">
          <span className="font-normal text-ink-secondary">{s.label}</span>
          {s.value}
        </span>
      ))}
      <Button variant="ghost" size="sm" icon="pencil" onClick={onRediger}>
        Endre
      </Button>
    </div>
  );
}
