import { Icon } from "../core/Icon.jsx";

/** Checkbox with optional description line. */
export function Checkbox({ label, description, checked, disabled = false, className = "", ...rest }) {
  return (
    <label className={["bs-control", disabled ? "bs-control--disabled" : "", className].filter(Boolean).join(" ")}>
      <input type="checkbox" checked={checked} disabled={disabled} {...rest} />
      <span className="bs-control__box"><Icon name="check" size={14} /></span>
      <span>
        {label}
        {description ? <span className="bs-control__desc">{description}</span> : null}
      </span>
    </label>
  );
}
