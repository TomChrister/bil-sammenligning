export interface IconProps {
  /** Lucide icon name, kebab-case, e.g. "car-front", "list-ordered". */
  name: string;
  /** Pixel size. 16 inline, 18 in controls, 20 standalone, 24 in headers. */
  size?: number;
  /** Override colour; defaults to currentColor. */
  strokeColor?: string;
  /** Accessible name. Omit for decorative icons (then it is aria-hidden). */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
