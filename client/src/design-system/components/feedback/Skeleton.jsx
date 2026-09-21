/** Shimmer-free loading placeholder. */
export function Skeleton({ width = "100%", height = 12, lines = 1, radius, pulse = true, className = "", ...rest }) {
  const style = { width, height, borderRadius: radius };
  if (lines > 1) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }} {...rest}>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className={["bs-skel", pulse ? "bs-skel--pulse" : "", className].filter(Boolean).join(" ")}
            style={{ ...style, width: i === lines - 1 ? "62%" : width }}
          />
        ))}
      </div>
    );
  }
  return <span className={["bs-skel", pulse ? "bs-skel--pulse" : "", className].filter(Boolean).join(" ")} style={style} {...rest} />;
}
