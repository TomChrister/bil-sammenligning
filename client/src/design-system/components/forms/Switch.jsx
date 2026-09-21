/** Binary toggle for immediate, reversible preferences. */
export function Switch({ label, checked, disabled = false, className = "", ...rest }) {
  return (
    <label className={("bs-switch " + className).trim()}>
      <input type="checkbox" role="switch" checked={checked} disabled={disabled} {...rest} />
      <span className="bs-switch__track" />
      {label ? <span>{label}</span> : null}
    </label>
  );
}
