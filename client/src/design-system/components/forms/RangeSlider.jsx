/** Slider for continuous vehicle data (mileage, year, days available). */
export function RangeSlider({ label, value, displayValue, min = 0, max = 100, step = 1, scale = [], id, className = "", ...rest }) {
  return (
    <div className={("bs-range " + className).trim()}>
      {label ? (
        <span className="bs-range__head">
          <label className="bs-field__label" htmlFor={id}>{label}</label>
          <span className="bs-range__value">{displayValue != null ? displayValue : value}</span>
        </span>
      ) : null}
      <input id={id} type="range" value={value} min={min} max={max} step={step} {...rest} />
      {scale.length ? (
        <span className="bs-range__scale">
          {scale.map((s) => <span key={s}>{s}</span>)}
        </span>
      ) : null}
    </div>
  );
}
