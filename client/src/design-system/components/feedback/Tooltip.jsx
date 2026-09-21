/** Hover/focus label for a single tight explanation. */
export function Tooltip({ label, children, className = "", ...rest }) {
  return (
    <span className={("bs-tooltip " + className).trim()} {...rest}>
      {children}
      <span role="tooltip" className="bs-tooltip__bubble">{label}</span>
    </span>
  );
}
