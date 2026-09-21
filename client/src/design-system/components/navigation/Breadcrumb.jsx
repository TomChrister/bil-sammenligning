import { Icon } from "../core/Icon.jsx";

/** Shallow path for channel detail pages. */
export function Breadcrumb({ items = [], className = "", ...rest }) {
  return (
    <nav aria-label="Brødsmuler" className={("bs-crumbs " + className).trim()} {...rest}>
      {items.map((it, i) => (
        <span key={it.label} className="bs-crumbs" style={{ gap: "var(--space-2)" }}>
          {i > 0 ? <Icon name="chevron-right" size={14} className="bs-crumbs__sep" /> : null}
          {it.href ? <a href={it.href}>{it.label}</a> : <span className="bs-crumbs__current">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}
