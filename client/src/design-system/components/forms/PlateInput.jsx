/** Norwegian registration plate, as an input or a static read-out. */
export function PlateInput({ value = "", onChange, size = "md", readOnly = false, placeholder = "AB 12345", id, className = "", ...rest }) {
  const cls = ["bs-plate", "bs-plate--" + size, readOnly ? "bs-plate--static" : "", className].filter(Boolean).join(" ");
  function handle(e) {
    const raw = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
    const next = raw.length > 2 ? raw.slice(0, 2) + " " + raw.slice(2) : raw;
    if (onChange) onChange(next);
  }
  return (
    <span className={cls}>
      <span className="bs-plate__band" aria-hidden="true">
        <svg className="bs-plate__flag" viewBox="0 0 22 16" role="img" aria-label="Norsk flagg">
          <rect width="22" height="16" fill="#EF2B2D" />
          <rect x="6" width="4" height="16" fill="#fff" />
          <rect y="6" width="22" height="4" fill="#fff" />
          <rect x="7" width="2" height="16" fill="#002868" />
          <rect y="7" width="22" height="2" fill="#002868" />
        </svg>
        <span>N</span>
      </span>
      <input
        id={id}
        className="bs-plate__input"
        inputMode="text"
        autoComplete="off"
        spellCheck="false"
        aria-label="Skiltnummer"
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={handle}
        {...rest}
      />
    </span>
  );
}
