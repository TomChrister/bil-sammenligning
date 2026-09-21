import { Icon } from "../core/Icon.jsx";

const TEXTS = {
  official: "Ikke en offentlig tjeneste. Vi er ikke tilknyttet Statens vegvesen.",
  noPrice: "Vi gir ingen prisvurdering — bare en rangering av salgskanaler.",
  source: "Tekniske data er hentet fra Statens vegvesen.",
  both: "Ikke en offentlig tjeneste, og ingen prisvurdering — bare en rangering av salgskanaler.",
};
const ICONS = { official: "info", noPrice: "info", source: "shield-check", both: "info" };

/** The standing legal/honesty disclosures. Wording is fixed — pass children only to override deliberately. */
export function DisclosureNote({ variant = "official", children, boxed = false, inverse = false, className = "", ...rest }) {
  const cls = ["bs-disclosure", boxed ? "bs-disclosure--boxed" : "", inverse ? "bs-disclosure--inverse" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <p className={cls} {...rest}>
      <Icon name={ICONS[variant] || "info"} size={14} className="bs-disclosure__icon" />
      <span>{children || TEXTS[variant]}</span>
    </p>
  );
}
