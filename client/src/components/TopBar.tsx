import { Button } from "../design-system/components/core/Button.jsx";

type Props = {
  onHome: () => void;
  onStart: () => void;
  compact?: boolean;
};

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
      <nav className="k-nav">
        <a href="#">Slik virker det</a>
        <a href="#">Salgskanaler</a>
        <a href="#">Om dataene</a>
      </nav>
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
