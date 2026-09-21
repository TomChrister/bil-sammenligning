export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon name. */
  icon: string;
  /** Required accessible name — icon-only controls never rely on the glyph alone. */
  label: string;
  variant?: "quiet" | "outline" | "solid";
  size?: "sm" | "md";
  disabled?: boolean;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
