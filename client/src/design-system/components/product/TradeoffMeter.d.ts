export interface TradeoffMeterProps {
  /** What is being measured, e.g. "Egeninnsats". */
  label: string;
  /** Filled segments. */
  value: number;
  max?: number;
  /** Word form of the value, e.g. "Lav" — always shown alongside the bar. */
  valueLabel?: string;
  /** good/warn/bad tint the filled segments; neutral = asphalt-700. */
  tone?: "neutral" | "good" | "warn" | "bad";
  className?: string;
}
export declare function TradeoffMeter(props: TradeoffMeterProps): JSX.Element;
