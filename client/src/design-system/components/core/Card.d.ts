export interface CardProps {
  children: React.ReactNode;
  pad?: "none" | "sm" | "md" | "lg";
  /** sunken = asphalt-50, inverse = asphalt-950 for dark bands. */
  tone?: "default" | "sunken" | "inverse";
  /** Renders as a <button> with hover border + shadow. */
  interactive?: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}
export declare function Card(props: CardProps): JSX.Element;
