import { Icon } from "../core/Icon.jsx";

/** Numbered step indicator for the recommender flow, with a bar fallback for narrow widths. */
export function StepProgress({ steps = [], current = 0, variant = "dots", className = "", ...rest }) {
  if (variant === "bar") {
    const pct = steps.length ? Math.round(((current + 1) / steps.length) * 100) : 0;
    return (
      <div className={className} {...rest}>
        <div className="bs-step" style={{ justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
          <span className="bs-step--current">{steps[current]}</span>
          <span>Steg {current + 1} av {steps.length}</span>
        </div>
        <div className="bs-progress"><div className="bs-progress__fill" style={{ width: pct + "%" }} /></div>
      </div>
    );
  }
  return (
    <ol className={("bs-steps " + className).trim()} {...rest}>
      {steps.map((label, i) => {
        const state = i < current ? "done" : i === current ? "current" : "todo";
        return [
          <li key={label} className={"bs-step bs-step--" + state} aria-current={state === "current" ? "step" : undefined}>
            <span className="bs-step__dot">{state === "done" ? <Icon name="check" size={13} /> : i + 1}</span>
            <span>{label}</span>
          </li>,
          i < steps.length - 1 ? <span key={label + "-line"} className="bs-step__line" style={i < current ? { background: "var(--surface-primary)" } : null} /> : null,
        ];
      })}
    </ol>
  );
}
