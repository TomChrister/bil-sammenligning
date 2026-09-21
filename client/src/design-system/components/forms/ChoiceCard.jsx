import { Icon } from "../core/Icon.jsx";

/** Large single-select answer card — the questionnaire's main control. */
export function ChoiceCard({ label, description, icon, selected = false, disabled = false, className = "", ...rest }) {
  const cls = ["bs-choice", selected ? "bs-choice--selected" : "", className].filter(Boolean).join(" ");
  return (
    <button type="button" role="radio" aria-checked={selected} disabled={disabled} className={cls} {...rest}>
      {icon ? <Icon name={icon} size={20} className="bs-choice__icon" /> : null}
      <span>
        <span className="bs-choice__label">{label}</span>
        {description ? <span className="bs-choice__desc">{description}</span> : null}
      </span>
      {selected ? <Icon name="check" size={20} className="bs-choice__check" /> : null}
    </button>
  );
}
