import { forwardRef, useEffect } from "react";
import type { HTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Alert.css";

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Whether the alert dialog is visible. Renders null when false. */
  open: boolean;
  /** Fires on cancel, scrim click, or Escape. */
  onClose?: () => void;
  /** Headline of the decision. */
  title: ReactNode;
  /** Optional supporting text under the title. */
  message?: ReactNode;
  /** Confirm button label. */
  confirmLabel?: string;
  /** Cancel button label. */
  cancelLabel?: string;
  /** Color the confirm action as destructive (danger). */
  destructive?: boolean;
  /** Stack the buttons vertically instead of side by side. */
  stacked?: boolean;
  /** Fires when the confirm button is pressed. */
  onConfirm?: () => void;
}

/**
 * Centered confirmation dialog for a single decision. Scrim + small card with
 * a title, optional message, and two actions (cancel + confirm). The confirm
 * action turns danger-colored when `destructive`. role="alertdialog".
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    open,
    onClose,
    title,
    message,
    confirmLabel = "确认",
    cancelLabel = "取消",
    destructive = false,
    stacked = false,
    onConfirm,
    className,
    ...rest
  },
  ref
) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleScrimKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") onClose?.();
  };

  return (
    <div
      className="ads-alert__scrim"
      onClick={() => onClose?.()}
      onKeyDown={handleScrimKeyDown}
    >
      <div
        ref={ref}
        role="alertdialog"
        aria-modal="true"
        className={cx("ads-alert", className)}
        onClick={(event) => event.stopPropagation()}
        {...rest}
      >
        <div className="ads-alert__content">
          <div className="ads-alert__title">{title}</div>
          {message != null && (
            <div className="ads-alert__message">{message}</div>
          )}
        </div>
        <div
          className={cx(
            "ads-alert__actions",
            stacked && "ads-alert__actions--stacked"
          )}
        >
          <button
            type="button"
            className="ads-alert__action ads-alert__action--cancel"
            onClick={() => onClose?.()}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="ads-alert__action ads-alert__action--confirm"
            data-destructive={destructive ? "true" : undefined}
            onClick={() => onConfirm?.()}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
});
