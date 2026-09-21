export interface Spec {
  /** Uppercase micro label, e.g. "Første gang registrert". */
  label: string;
  /** Register value — rendered in IBM Plex Mono with tabular numerals. */
  value: React.ReactNode;
}
export interface SpecGridProps {
  items: Spec[];
  /** Preferred column count; tracks wrap when the container is narrower (2 → 220px min, 3 → 170px, 4 → 150px). */
  columns?: number;
  className?: string;
}
export declare function SpecGrid(props: SpecGridProps): JSX.Element;
