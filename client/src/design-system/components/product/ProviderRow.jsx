import { Icon } from "../core/Icon.jsx";

/** A real provider under a channel. Name is plain type — no third-party logos. */
export function ProviderRow({ name, note, mark, href, className = "", ...rest }) {
  const Comp = href ? "a" : "button";
  return (
    <Comp
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      type={href ? undefined : "button"}
      className={("bs-provider " + className).trim()}
      style={{ textDecoration: "none", color: "inherit" }}
      {...rest}
    >
      <span className="bs-provider__mark" aria-hidden="true">{mark || name.slice(0, 2).toUpperCase()}</span>
      <span>
        <span className="bs-provider__name">{name}</span>
        {note ? <span className="bs-provider__note">{note}</span> : null}
      </span>
      <Icon name={href ? "external-link" : "chevron-right"} size={18} className="bs-provider__go" />
    </Comp>
  );
}
