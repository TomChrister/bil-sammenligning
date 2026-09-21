import { Icon } from "../core/Icon.jsx";

const TONE_ICON = { neutral: "info", success: "check", danger: "triangle-alert" };

/** Transient dark confirmation. */
export function Toast({ title, children, tone = "neutral", onClose, className = "", ...rest }) {
  return (
    <div role="status" className={("bs-toast bs-toast--" + tone + " " + className).trim()} {...rest}>
      <Icon name={TONE_ICON[tone]} size={18} className="bs-toast__icon" />
      <div>
        {title ? <span className="bs-toast__title">{title}</span> : null}
        {children ? <div className="bs-toast__text">{children}</div> : null}
      </div>
      {onClose ? (
        <button type="button" className="bs-toast__close" aria-label="Lukk" onClick={onClose}>
          <Icon name="x" size={16} />
        </button>
      ) : null}
    </div>
  );
}
