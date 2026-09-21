import { Icon } from "./Icon.jsx";

/**
 * Primary interactive control. Variants: primary (kobolt), secondary (bordered),
 * ghost, accent (sitron, on dark), danger. Sizes sm/md/lg.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconAfter,
  block = false,
  disabled = false,
  type = "button",
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`bs-btn bs-btn--${variant} bs-btn--${size}${block ? " bs-btn--block" : ""} ${className}`.trim()}
      {...rest}
    >
      {icon ? <Icon name={icon} size={size === "sm" ? 16 : 18} /> : null}
      <span>{children}</span>
      {iconAfter ? <Icon name={iconAfter} size={size === "sm" ? 16 : 18} /> : null}
    </button>
  );
}
