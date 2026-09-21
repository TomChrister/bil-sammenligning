import { Icon } from "./Icon.jsx";

/** Small uppercase status pill. */
export function Badge({ children, tone = "neutral", icon, className = "", ...rest }) {
  return (
    <span className={("bs-badge bs-badge--" + tone + " " + className).trim()} {...rest}>
      {icon ? <Icon name={icon} size={12} /> : null}
      {children}
    </span>
  );
}
