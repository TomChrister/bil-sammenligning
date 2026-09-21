/**
 * @startingPoint section="Forms" subtitle="Plate lookup, inputs, choice cards" viewport="700x320"
 */
export interface PlateInputProps {
  /** Formatted plate, e.g. "AB 12345". */
  value?: string;
  /** Receives the re-formatted, uppercased value. */
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  /** Static read-out (vehicle confirmation, result header). */
  readOnly?: boolean;
  placeholder?: string;
  id?: string;
  className?: string;
}
export declare function PlateInput(props: PlateInputProps): JSX.Element;
