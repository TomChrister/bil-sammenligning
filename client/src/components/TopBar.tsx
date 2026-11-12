import { Button } from "../design-system/components/core/Button.jsx";
import { StepProgress } from "../design-system/components/navigation/StepProgress.jsx";

type Props = {
  onHome: () => void;
  onStart: () => void;
  /** Steget brukeren er på i flyten (0-basert). Utelates på forsiden. */
  flowStep?: number;
};

const NAV_ITEMS = [
  { id: "slik-virker-det", label: "Slik virker det" },
  { id: "salgskanaler", label: "Salgskanaler" },
  { id: "om-dataene", label: "Om dataene" },
  { id: "datakilde", label: "Datakilde" },
] as const;

const FLOW_STEPS = ["Skilt", "Bilen", "Spørsmål", "Resultat"];

export function TopBar({ onHome, onStart, flowStep }: Props) {
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
        Bilmatch
      </a>
      {flowStep === undefined ? (
        <>
          <nav className="k-nav">
            {NAV_ITEMS.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="k-bar__end">
            <Button variant="secondary" size="sm" onClick={onStart}>
              Slå opp skilt
            </Button>
          </div>
        </>
      ) : (
        <>
          <StepProgress steps={FLOW_STEPS} current={flowStep} />
          <span className="k-bar__stepcount">
            Steg {flowStep + 1} av {FLOW_STEPS.length}
          </span>
          <div className="k-bar__end">
            <Button variant="ghost" size="sm" icon="rotate-ccw" onClick={onHome}>
              Start på nytt
            </Button>
          </div>
        </>
      )}
    </header>
  );
}
