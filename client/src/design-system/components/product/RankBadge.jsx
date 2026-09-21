/** Rank numeral. Colour reinforces order; the numeral carries it. */
export function RankBadge({ rank, size = "md", className = "", ...rest }) {
  const tone = rank <= 3 ? String(rank) : "rest";
  const cls = ["bs-rank", "bs-rank--" + tone, size === "sm" ? "bs-rank--sm" : "", className].filter(Boolean).join(" ");
  return <span className={cls} aria-label={"Rangering " + rank} {...rest}>{rank}</span>;
}
