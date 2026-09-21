import { Icon } from "../core/Icon.jsx";

/** Labelled text input with hint, error and optional icon/suffix. */
export function Input({
  label, hint, error, icon, suffix, id, size = "md", data = false, optional = false,
  disabled = false, className = "", ...rest
}) {
  const wrapCls = [
    "bs-inputwrap", size === "lg" ? "bs-inputwrap--lg" : "",
    error ? "bs-inputwrap--invalid" : "", disabled ? "bs-inputwrap--disabled" : "",
  ].filter(Boolean).join(" ");
  return (
    <div className={("bs-field " + className).trim()}>
      {label ? (
        <label className="bs-field__label" htmlFor={id}>
          {label}
          {optional ? <span className="bs-field__optional">valgfritt</span> : null}
        </label>
      ) : null}
      <span className={wrapCls}>
        {icon ? <Icon name={icon} size={18} /> : null}
        <input id={id} disabled={disabled} className={"bs-input" + (data ? " bs-input--data" : "")} {...rest} />
        {suffix ? <span className="bs-field__hint">{suffix}</span> : null}
      </span>
      {error ? (
        <span className="bs-field__error"><Icon name="triangle-alert" size={14} />{error}</span>
      ) : hint ? (
        <span className="bs-field__hint">{hint}</span>
      ) : null}
    </div>
  );
}
