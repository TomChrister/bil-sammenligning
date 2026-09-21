import { useState, type FormEvent } from "react";
import { PlateInput } from "../design-system/components/forms/PlateInput.jsx";
import { Button } from "../design-system/components/core/Button.jsx";

type Props = {
  onSubmit: (kjennemerke: string) => void;
  loading: boolean;
};

export function RegnrForm({ onSubmit, loading }: Props) {
  const [kjennemerke, setKjennemerke] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (kjennemerke.trim().length === 0) return;
    onSubmit(kjennemerke);
  }

  return (
    <form onSubmit={handleSubmit} className="k-lookup">
      <PlateInput size="lg" value={kjennemerke} onChange={setKjennemerke} />
      <Button type="submit" size="lg" icon="search" disabled={loading}>
        {loading ? "Henter..." : "Slå opp skilt"}
      </Button>
    </form>
  );
}
