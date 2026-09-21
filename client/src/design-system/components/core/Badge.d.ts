export interface BadgeProps {
  children: React.ReactNode;
  /** accent = sitron, reserved for the single most important flag in a view. */
  tone?: "neutral" | "primary" | "accent" | "success" | "warning" | "danger" | "inverse";
  /** Lucide icon name rendered before the label at 12px. */
  icon?: string;
  className?: string;
}
export declare function Badge(props: BadgeProps): JSX.Element;
