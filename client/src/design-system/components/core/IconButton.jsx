import { Icon } from "./Icon.jsx";

/** Square icon-only control. An aria-label is required. */
export function IconButton({ icon, label, variant = "quiet", size = "md", disabled = false, className = "", ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      className={("bs-iconbtn bs-iconbtn--" + variant + " bs-iconbtn--" + size + " " + className).trim()}
      {...rest}
    >
      <Icon name={icon} size={size === "sm" ? 16 : 20} />
    </button>
  );
}
