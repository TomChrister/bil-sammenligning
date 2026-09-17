import { useState, type FormEvent } from "react";

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
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={kjennemerke}
        onChange={(e) => setKjennemerke(e.target.value)}
        placeholder="Kjennemerke, f.eks. EB 11111"
        className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-lg uppercase tracking-wide focus:border-slate-500 focus:outline-none"
        maxLength={8}
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white disabled:opacity-50"
      >
        {loading ? "Henter..." : "Slå opp"}
      </button>
    </form>
  );
}
