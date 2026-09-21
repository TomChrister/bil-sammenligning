/**
 * @startingPoint section="Product" subtitle="Ranked channel, providers, vehicle specs" viewport="700x420"
 */
export interface DisclosureNoteProps {
  /** Picks the locked Norwegian wording. `both` combines the two mandatory lines. */
  variant?: "official" | "noPrice" | "source" | "both";
  /** Overrides the locked text — only for a genuinely different disclosure. */
  children?: React.ReactNode;
  /** Sunken box treatment for footers and data panels. */
  boxed?: boolean;
  /** For asphalt-950 sections. */
  inverse?: boolean;
  className?: string;
}
export declare function DisclosureNote(props: DisclosureNoteProps): JSX.Element;
