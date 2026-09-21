import { RankBadge } from "./RankBadge.jsx";
import { Badge } from "../core/Badge.jsx";
import { Icon } from "../core/Icon.jsx";

/** One ranked sales channel: rank, name, lede, key facts, and room for reasons + providers. */
export function ChannelRankCard({
  rank, name, lede, icon, badge, badgeTone = "accent", meta = [], children, footer,
  interactive = false, className = "", ...rest
}) {
  const cls = [
    "bs-channel", rank === 1 ? "bs-channel--top" : "", interactive ? "bs-channel--interactive" : "", className,
  ].filter(Boolean).join(" ");
  return (
    <article className={cls} {...rest}>
      <header className="bs-channel__head">
        <RankBadge rank={rank} />
        <div className="bs-channel__titles">
          <h3 className="bs-channel__name">
            {icon ? <Icon name={icon} size={20} style={{ marginRight: "var(--space-2)", verticalAlign: "-3px", color: "var(--text-muted)" }} /> : null}
            {name}
          </h3>
          {lede ? <p className="bs-channel__lede">{lede}</p> : null}
        </div>
        {badge ? <Badge tone={badgeTone}>{badge}</Badge> : null}
      </header>
      {meta.length ? (
        <div className="bs-channel__meta">
          {meta.map((m) => (
            <span key={m.label} className="bs-channel__metaitem">
              <Icon name={m.icon} size={16} strokeColor="var(--text-faint)" />
              <span>{m.label}</span>
            </span>
          ))}
        </div>
      ) : null}
      {children}
      {footer ? <div className="bs-channel__foot">{footer}</div> : null}
    </article>
  );
}
