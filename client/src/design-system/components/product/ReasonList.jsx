import { Icon } from "../core/Icon.jsx";

/** Why a channel ranked where it did. Facts from the user's own answers. */
export function ReasonList({ items = [], className = "", ...rest }) {
  return (
    <ul className={("bs-reasons " + className).trim()} {...rest}>
      {items.map((it) => (
        <li key={it.text} className={"bs-reason bs-reason--" + (it.type || "pro")}>
          <Icon name={it.type === "con" ? "triangle-alert" : "check"} size={16} className="bs-reason__icon" />
          <span>{it.text}</span>
        </li>
      ))}
    </ul>
  );
}
