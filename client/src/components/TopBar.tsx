import { Button } from "../design-system/components/core/Button.jsx";

type Props = {
  onHome: () => void;
  onStart: () => void;
  compact?: boolean;
};

const NAV_ITEMS = [
  { id: "slik-virker-det", label: "Slik virker det" },
  { id: "salgskanaler", label: "Salgskanaler" },
  { id: "om-dataene", label: "Om dataene" },
] as const;

export function TopBar({ onHome, onStart, compact = false }: Props) {
  return (
    <header className="k-bar">
      <a
        href="#"
        className="k-wordmark"
        onClick={(e) => {
          e.preventDefault();
          onHome();
        }}
      >
        Bilsalg-anbefaler
      </a>
      {!compact && (
        <nav className="k-nav">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
      {compact ? (
        <Button variant="ghost" icon="rotate-ccw" onClick={onHome}>
          Start på nytt
        </Button>
      ) : (
        <Button variant="secondary" icon="search" onClick={onStart}>
          Slå opp skilt
        </Button>
      )}
    </header>
  );
}
