import { Icon } from "./Icon.jsx";

const TONE_ICON = { info: "info", neutral: "info", success: "check", warning: "triangle-alert", danger: "triangle-alert" };

/** Tinted inline message block. */
export function Callout({ children, title, tone = "info", icon, className = "", ...rest }) {
  return (
    <div className={("bs-callout bs-callout--" + tone + " " + className).trim()} {...rest}>
      <Icon name={icon || TONE_ICON[tone]} size={18} />
      <div className="bs-callout__body">
        {title ? <span className="bs-callout__title">{title}</span> : null}
        <span>{children}</span>
      </div>
    </div>
  );
}
