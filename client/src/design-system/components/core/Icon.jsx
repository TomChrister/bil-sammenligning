const LUCIDE = "https://unpkg.com/lucide-static@0.544.0/icons";

/** Masked Lucide glyph — inherits currentColor. See readme.md §5 Iconography. */
export function Icon({ name, size = 18, strokeColor, style, className = "", label, ...rest }) {
  const url = `${LUCIDE}/${name}.svg`;
  return (
    <span
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`bs-icon ${className}`.trim()}
      style={{
        width: size,
        height: size,
        color: strokeColor,
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        ...style,
      }}
      {...rest}
    />
  );
}
