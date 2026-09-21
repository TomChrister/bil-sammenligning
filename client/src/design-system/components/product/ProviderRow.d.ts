export interface ProviderRowProps {
  /** Provider name as plain text, e.g. "Nettbil". */
  name: string;
  /** One short line: what they do, not what they pay. */
  note?: string;
  /** 2–3 character stand-in for a logo. Defaults to the first two letters. */
  mark?: string;
  /** External link — renders an anchor with an external-link glyph. */
  href?: string;
  className?: string;
}
export declare function ProviderRow(props: ProviderRowProps): JSX.Element;
