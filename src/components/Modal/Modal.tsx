import { forwardRef, useEffect, useId } from "react";
import type { HTMLAttributes, MouseEvent, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Modal.css";

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Whether the modal is visible. Renders nothing when false. */
  open: boolean;
  /** Called on scrim click (unless disabled) or Escape key. */
  onClose?: () => void;
  /** Optional heading shown above the body. */
  title?: ReactNode;
  /** Dialog body content. */
  children?: ReactNode;
  /** Actions row, typically one or two buttons. */
  actions?: ReactNode;
  /** Dismiss when the scrim (outside the card) is clicked. Default true. */
  dismissOnScrim?: boolean;
}

/**
 * Centered modal dialog over a dimmed scrim. Closes on Escape and on scrim
 * click (when `dismissOnScrim` is not false). Renders inline — no portal.
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    open,
    onClose,
    title,
    children,
    actions,
    dismissOnScrim = true,
    className,
    ...rest
  },
  ref
) {
  useEffect(() => {
    if (!open || onClose == null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const titleId = useId();

  if (!open) return null;

  function onScrimClick(event: MouseEvent<HTMLDivElement>) {
    if (dismissOnScrim !== false && event.target === event.currentTarget) {
      onClose?.();
    }
  }

  return (
    <div className="ads-modal__scrim" onClick={onScrimClick}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title == null ? "对话框" : undefined}
        aria-labelledby={title == null ? undefined : titleId}
        className={cx("ads-modal", className)}
        {...rest}
      >
        {title != null && (
          <h2 id={titleId} className="ads-modal__title">
            {title}
          </h2>
        )}
        {children != null && <div className="ads-modal__body">{children}</div>}
        {actions != null && <div className="ads-modal__actions">{actions}</div>}
      </div>
    </div>
  );
});
