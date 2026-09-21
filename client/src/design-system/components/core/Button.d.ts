/**
 * @startingPoint section="Core" subtitle="Buttons, badges, cards, callouts" viewport="700x300"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** primary = kobolt fill, accent = sitron (dark grounds only). */
  variant?: "primary" | "secondary" | "ghost" | "accent" | "danger";
  size?: "sm" | "md" | "lg";
  /** Lucide icon name rendered before the label. */
  icon?: string;
  /** Lucide icon name rendered after the label. */
  iconAfter?: string;
  /** Full-width (sticky mobile footers). */
  block?: boolean;
  disabled?: boolean;
}
export declare function Button(props: ButtonProps): JSX.Element;
