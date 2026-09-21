/** Single-select radio with optional description line. */
export function Radio({ label, description, checked, disabled = false, name, className = "", ...rest }) {
  return (
    <label className={["bs-control", disabled ? "bs-control--disabled" : "", className].filter(Boolean).join(" ")}>
      <input type="radio" name={name} checked={checked} disabled={disabled} {...rest} />
      <span className="bs-control__dot" />
      <span>
        {label}
        {description ? <span className="bs-control__desc">{description}</span> : null}
      </span>
    </label>
  );
}
