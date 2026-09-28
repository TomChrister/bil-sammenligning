import { useState, type FormEvent } from "react";
import type {
  Hastverk,
  Innsats,
  SalgsvurderingInput,
  Tilstand,
} from "../../../shared/recommendation/types";
import { ChoiceCard } from "../design-system/components/forms/ChoiceCard.jsx";
import { RangeSlider } from "../design-system/components/forms/RangeSlider.jsx";
import { Input } from "../design-system/components/forms/Input.jsx";
import { Checkbox } from "../design-system/components/forms/Checkbox.jsx";
import { Button } from "../design-system/components/core/Button.jsx";

type Props = {
  onSubmit: (input: SalgsvurderingInput) => void;
};

const TILSTANDER: { verdi: Tilstand; label: string; description: string }[] = [
  { verdi: "meget-god", label: "Meget god", description: "Ingen kjente feil eller skader." },
  { verdi: "god", label: "God", description: "Normal bruksslitasje, ingen kjente mangler." },
  { verdi: "akseptabel", label: "Akseptabel", description: "Noe slitasje eller mindre feil." },
  { verdi: "darlig", label: "Dårlig", description: "Kjente feil som krever reparasjon." },
  { verdi: "ikke-kjorbar", label: "Ikke kjørbar", description: "Bilen kan ikke kjøres som den er." },
];

const HASTVERK: { verdi: Hastverk; label: string; description: string }[] = [
  { verdi: "haster", label: "Haster", description: "Vil selge raskest mulig." },
  { verdi: "normal", label: "Normal", description: "Grei tid, ikke i noen hast." },
  { verdi: "fleksibel", label: "Fleksibel", description: "Kan vente på riktig pris." },
];

const INNSATS: { verdi: Innsats; label: string; description: string }[] = [
  { verdi: "minimalt", label: "Minimalt", description: "Vil ha minst mulig jobb." },
  { verdi: "noe", label: "Noe", description: "Greier annonse og visning." },
  { verdi: "mye", label: "Mye", description: "Vil legge ned jobben for best pris." },
];

type HeftelserVerdi = "nei" | "ja" | "vet-ikke";

const HEFTELSER: { verdi: HeftelserVerdi; label: string }[] = [
  { verdi: "nei", label: "Nei" },
  { verdi: "ja", label: "Ja" },
  { verdi: "vet-ikke", label: "Vet ikke" },
];

function formatVerdi(raw: string) {
  const siffer = raw.replace(/\D/g, "");
  return siffer.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function ChoiceGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: { verdi: T; label: string; description?: string }[];
  value: T;
  onChange: (verdi: T) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-body-sm font-medium text-ink">{legend}</legend>
      <div role="radiogroup" aria-label={legend} className="flex flex-col gap-3">
        {options.map((o) => (
          <ChoiceCard
            key={o.verdi}
            label={o.label}
            description={o.description}
            selected={value === o.verdi}
            onClick={() => onChange(o.verdi)}
          />
        ))}
      </div>
    </fieldset>
  );
}

export function ConditionForm({ onSubmit }: Props) {
  const [kilometerstand, setKilometerstand] = useState(80000);
  const [tilstand, setTilstand] = useState<Tilstand>("god");
  const [hastverk, setHastverk] = useState<Hastverk>("normal");
  const [onsketInnsats, setOnsketInnsats] = useState<Innsats>("noe");
  const [planleggerNybilkjop, setPlanleggerNybilkjop] = useState(false);
  const [heftelser, setHeftelser] = useState<HeftelserVerdi>("vet-ikke");
  const [antattVerdi, setAntattVerdi] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const sifferVerdi = antattVerdi.replace(/\s/g, "");
    const verdi = sifferVerdi === "" ? null : Number(sifferVerdi);
    if (verdi !== null && (!Number.isFinite(verdi) || verdi < 0)) return;

    onSubmit({
      kilometerstand,
      tilstand,
      hastverk,
      onsketInnsats,
      planleggerNybilkjop,
      heftelser: heftelser === "vet-ikke" ? null : heftelser === "ja",
      antattVerdi: verdi,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <RangeSlider
        id="kilometerstand"
        label="Kilometerstand"
        value={kilometerstand}
        displayValue={`${kilometerstand.toLocaleString("nb-NO")} km`}
        min={0}
        max={400000}
        step={500}
        scale={["0", "400 000"]}
        onChange={(e) => setKilometerstand(Number(e.target.value))}
      />

      <ChoiceGroup legend="Tilstand" options={TILSTANDER} value={tilstand} onChange={setTilstand} />
      <ChoiceGroup
        legend="Hvor fort må bilen vekk?"
        options={HASTVERK}
        value={hastverk}
        onChange={setHastverk}
      />
      <ChoiceGroup
        legend="Hvor mye jobb vil du legge i salget?"
        options={INNSATS}
        value={onsketInnsats}
        onChange={setOnsketInnsats}
      />
      <ChoiceGroup
        legend="Pant eller gjeld registrert på bilen?"
        options={HEFTELSER}
        value={heftelser}
        onChange={setHeftelser}
      />

      <Input
        id="antatt-verdi"
        label="Ditt eget verdianslag"
        data
        optional
        suffix="kr"
        placeholder="150 000"
        inputMode="numeric"
        value={antattVerdi}
        onChange={(e) => setAntattVerdi(formatVerdi(e.target.value))}
        hint="Brukes kun som et signal, ikke som fasit."
      />

      <Checkbox
        label="Jeg skal uansett kjøpe ny bil hos forhandler"
        checked={planleggerNybilkjop}
        onChange={(e) => setPlanleggerNybilkjop(e.target.checked)}
      />

      <Button type="submit" size="lg">
        Få anbefaling
      </Button>
    </form>
  );
}
