export interface SelectOption { value: string; label: string }
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  /** Empty-value first option. */
  placeholder?: string;
}
export declare function Select(props: SelectProps): JSX.Element;
