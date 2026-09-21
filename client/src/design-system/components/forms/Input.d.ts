export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Helper text under the field; hidden while `error` is set. */
  hint?: string;
  error?: string;
  /** Leading Lucide icon. */
  icon?: string;
  /** Trailing static text, e.g. "km". */
  suffix?: string;
  size?: "md" | "lg";
  /** Mono + tabular numerals for machine data. */
  data?: boolean;
  /** Appends the "valgfritt" marker to the label. */
  optional?: boolean;
}
export declare function Input(props: InputProps): JSX.Element;
