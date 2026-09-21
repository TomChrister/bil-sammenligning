import { Icon } from "../core/Icon.jsx";

/** Underlined tab bar. Controlled. */
export function Tabs({ items = [], value, onChange, className = "", ...rest }) {
  return (
    <div role="tablist" className={("bs-tabs " + className).trim()} {...rest}>
      {items.map((it) => (
        <button
          key={it.value}
          role="tab"
          type="button"
          aria-selected={it.value === value}
          className={"bs-tab" + (it.value === value ? " bs-tab--active" : "")}
          onClick={onChange ? () => onChange(it.value) : undefined}
        >
          {it.icon ? <Icon name={it.icon} size={16} /> : null}
          {it.label}
          {it.count != null ? <span style={{ color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>{it.count}</span> : null}
        </button>
      ))}
    </div>
  );
}
