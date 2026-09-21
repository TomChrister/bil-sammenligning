/**
 * @startingPoint section="Navigation" subtitle="Step progress, tabs, breadcrumb" viewport="700x220"
 */
export interface StepProgressProps {
  /** Short step labels, e.g. ["Skilt", "Bilen", "Spørsmål", "Resultat"]. */
  steps: string[];
  /** Zero-based index of the active step. */
  current?: number;
  /** dots = full ladder (desktop); bar = label + determinate bar (mobile). */
  variant?: "dots" | "bar";
  className?: string;
}
export declare function StepProgress(props: StepProgressProps): JSX.Element;
