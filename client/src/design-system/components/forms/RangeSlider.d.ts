export interface RangeSliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: number;
  /** Formatted read-out, e.g. "148 500 km". Falls back to the raw value. */
  displayValue?: string;
  min?: number;
  max?: number;
  step?: number;
  /** End (and optional middle) labels under the track. */
  scale?: string[];
}
export declare function RangeSlider(props: RangeSliderProps): JSX.Element;
