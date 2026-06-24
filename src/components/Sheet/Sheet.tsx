import { forwardRef, useEffect } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Sheet.css";

export interface SheetProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Whether the sheet is visible. Renders nothing when false. */
  open: boolean;
  /** Called when the user requests dismissal (scrim click or Escape). */
  onClose?: () => void;
  /** Optional left-aligned headline shown above the content. */
  title?: ReactNode;
  /** Sheet body content. */
  children?: ReactNode;
  /** Allow closing by clicking the scrim. Defaults to true. */
  dismissOnScrim?: boolean;
}

/**
 * Bottom sheet. A scrim dims the page while a panel slides up from the bottom,
 * pinned to the lower edge with a grab handle, optional title, and content.
 * Closes on scrim click (unless disabled) and Escape. Renders null when closed.
 */
export const Sheet = forwardRef<HTMLDivElement, SheetProps>(function Sheet(
  { open, onClose, title, dismissOnScrim = true, className, children, ...rest },
  ref
) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="ads-sheet">
      <div
        className="ads-sheet__scrim"
        onClick={dismissOnScrim ? () => onClose?.() : undefined}
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={cx("ads-sheet__panel", className)}
        {...rest}
      >
        <div className="ads-sheet__handle" aria-hidden="true" />
        {title != null && <div className="ads-sheet__title">{title}</div>}
        <div className="ads-sheet__body">{children}</div>
      </div>
    </div>
  );
});
