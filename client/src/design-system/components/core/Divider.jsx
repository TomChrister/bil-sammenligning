/** 1px rule. */
export function Divider({ vertical = false, strong = false, className = "", ...rest }) {
  const cls = ["bs-divider", vertical ? "bs-divider--vertical" : "", strong ? "bs-divider--strong" : "", className]
    .filter(Boolean)
    .join(" ");
  return vertical ? <span role="separator" aria-orientation="vertical" className={cls} {...rest} /> : <hr className={cls} {...rest} />;
}
