import { useEffect } from "react";
import { Icon } from "../core/Icon.jsx";
import { IconButton } from "../core/IconButton.jsx";

/** Modal over a scrim. Rendered only when \`open\`. */
export function Dialog({ open = false, title, icon, children, footer, onClose, className = "", ...rest }) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="bs-scrim" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={("bs-dialog " + className).trim()}
        onClick={(e) => e.stopPropagation()}
        {...rest}
      >
        <div className="bs-dialog__head">
          {icon ? <Icon name={icon} size={24} strokeColor="var(--kobolt-600)" /> : null}
          <span className="bs-dialog__title">{title}</span>
          {onClose ? <IconButton icon="x" label="Lukk" onClick={onClose} style={{ marginLeft: "auto" }} /> : null}
        </div>
        <div className="bs-dialog__body">{children}</div>
        {footer ? <div className="bs-dialog__foot">{footer}</div> : null}
      </div>
    </div>
  );
}
