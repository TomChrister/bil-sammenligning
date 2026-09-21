export interface ChannelMeta {
  /** Lucide icon name. */
  icon: string;
  /** Fact, e.g. "Oppgjør: 1–3 dager". */
  label: string;
}
export interface ChannelRankCardProps {
  rank: number;
  /** Norwegian channel name, e.g. "Forhandlerauksjon". */
  name: string;
  /** One sentence on how the channel works. */
  lede?: string;
  /** Lucide icon before the name. */
  icon?: string;
  /** Flag text, e.g. "Anbefalt". */
  badge?: string;
  badgeTone?: "accent" | "primary" | "neutral" | "success" | "warning";
  meta?: ChannelMeta[];
  /** Slot for ReasonList, TradeoffMeter and ProviderRow children. */
  children?: React.ReactNode;
  /** Bottom row, divided by a hairline — provider count + action. */
  footer?: React.ReactNode;
  interactive?: boolean;
  className?: string;
}
export declare function ChannelRankCard(props: ChannelRankCardProps): JSX.Element;
