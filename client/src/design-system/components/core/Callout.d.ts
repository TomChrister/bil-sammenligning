export interface CalloutProps {
  children: React.ReactNode;
  title?: string;
  tone?: "info" | "neutral" | "success" | "warning" | "danger";
  /** Override the tone's default Lucide icon. */
  icon?: string;
  className?: string;
}
export declare function Callout(props: CalloutProps): JSX.Element;
