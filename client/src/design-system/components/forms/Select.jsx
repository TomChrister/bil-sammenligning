import { Icon } from "../core/Icon.jsx";

/** Native select in brand chrome. */
export function Select({ label, hint, error, id, options = [], placeholder, disabled = false, className = "", ...rest }) {
  return (
    <div className={("bs-field " + className).trim()}>
      {label ? <label className="bs-field__label" htmlFor={id}>{label}</label> : null}
      <span className="bs-selectwrap">
        <select id={id} className="bs-select" disabled={disabled} {...rest}>
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <Icon name="chevron-down" size={18} />
      </span>
      {error ? (
        <span className="bs-field__error"><Icon name="triangle-alert" size={14} />{error}</span>
      ) : hint ? <span className="bs-field__hint">{hint}</span> : null}
    </div>
  );
}
