import { Icon } from "./Icon.jsx";

/** Rectangular chip for facts, filters and machine data. */
export function Tag({ children, icon, data = false, selected = false, onRemove, className = "", ...rest }) {
  const cls = ["bs-tag", data ? "bs-tag--data" : "", selected ? "bs-tag--selected" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} {...rest}>
      {icon ? <Icon name={icon} size={14} /> : null}
      {children}
      {onRemove ? (
        <button type="button" className="bs-tag__x" aria-label="Fjern" onClick={onRemove}>
          <Icon name="x" size={12} />
        </button>
      ) : null}
    </span>
  );
}
