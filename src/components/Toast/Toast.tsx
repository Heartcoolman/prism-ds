import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Toast.css";

export type ToastVariant = "neutral" | "success" | "error";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /** Message content. */
  message: ReactNode;
  /** Leading glyph (18px box). Overrides the default variant icon. */
  icon?: ReactNode;
  /** Semantic color of the leading icon. */
  variant?: ToastVariant;
  /** Visibility. Renders nothing when false. */
  open?: boolean;
  children?: ReactNode;
}

const SuccessIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m5 13 4 4L19 7" />
  </svg>
);

const ErrorIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 8v5m0 3h.01M12 3l9 16H3z" />
  </svg>
);

const DEFAULT_ICON: Record<ToastVariant, ReactNode> = {
  neutral: null,
  success: SuccessIcon,
  error: ErrorIcon,
};

/**
 * Floating feedback card. Presentational only — no auto-dismiss timer.
 * Surfaces a brief message with an optional variant-colored leading icon.
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { message, icon, variant = "neutral", open = true, className, ...rest },
  ref
) {
  if (!open) return null;

  const resolvedIcon = icon ?? DEFAULT_ICON[variant];

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      data-variant={variant}
      className={cx("ads-toast", className)}
      {...rest}
    >
      {resolvedIcon != null && (
        <span className="ads-toast__icon" aria-hidden="true">
          {resolvedIcon}
        </span>
      )}
      <span className="ads-toast__message">{message}</span>
    </div>
  );
});
