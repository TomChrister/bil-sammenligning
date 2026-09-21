/** 5-segment meter for a qualitative trade-off (effort, speed, reach). */
export function TradeoffMeter({ label, value = 0, max = 5, valueLabel, tone = "neutral", className = "", ...rest }) {
  return (
    <div className={["bs-meter", tone !== "neutral" ? "bs-meter--" + tone : "", className].filter(Boolean).join(" ")} {...rest}>
      <span className="bs-meter__head">
        <span>{label}</span>
        {valueLabel ? <span style={{ color: "var(--text-primary)", fontWeight: "var(--weight-medium)" }}>{valueLabel}</span> : null}
      </span>
      <span className="bs-meter__track" role="img" aria-label={label + ": " + (valueLabel || value + " av " + max)}>
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} className={"bs-meter__seg" + (i < value ? " bs-meter__seg--on" : "")} />
        ))}
      </span>
    </div>
  );
}
