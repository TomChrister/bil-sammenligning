/** Flat bordered surface. No shadow at rest; interactive cards lift on hover. */
export function Card({ children, pad = "md", tone = "default", interactive = false, as, className = "", ...rest }) {
  const Comp = as || (interactive ? "button" : "div");
  const cls = [
    "bs-card",
    "bs-card--pad-" + pad,
    tone !== "default" ? "bs-card--" + tone : "",
    interactive ? "bs-card--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Comp className={cls} {...(Comp === "button" ? { type: "button" } : null)} {...rest}>
      {children}
    </Comp>
  );
}
