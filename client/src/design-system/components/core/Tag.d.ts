export interface TagProps {
  children: React.ReactNode;
  /** Lucide icon name at 14px. */
  icon?: string;
  /** Set for register-supplied values — switches to IBM Plex Mono with tabular numerals. */
  data?: boolean;
  selected?: boolean;
  /** Renders a remove affordance. */
  onRemove?: () => void;
  className?: string;
}
export declare function Tag(props: TagProps): JSX.Element;
