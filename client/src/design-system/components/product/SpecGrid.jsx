const MIN_TRACK = { 1: 320, 2: 220, 3: 170, 4: 150 };

/** Vehicle data from the register, as a definition grid. Tracks wrap rather than squeeze. */
export function SpecGrid({ items = [], columns = 2, className = "", style, ...rest }) {
  const min = MIN_TRACK[columns] || 150;
  return (
    <dl
      className={("bs-specs " + className).trim()}
      style={{ gridTemplateColumns: "repeat(auto-fit,minmax(" + min + "px,1fr))", ...style }}
      {...rest}
    >
      {items.map((it) => (
        <div key={it.label} className="bs-spec">
          <dt className="bs-spec__label">{it.label}</dt>
          <dd className="bs-spec__value" style={{ margin: 0 }}>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
