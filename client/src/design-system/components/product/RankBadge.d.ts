export interface RankBadgeProps {
  /** 1-based position in the ranking (1–6). */
  rank: number;
  size?: "sm" | "md";
  className?: string;
}
export declare function RankBadge(props: RankBadgeProps): JSX.Element;
