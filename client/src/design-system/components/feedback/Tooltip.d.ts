export interface TooltipProps {
  /** One short line — no paragraphs, no links. */
  label: string;
  children: React.ReactNode;
  className?: string;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
