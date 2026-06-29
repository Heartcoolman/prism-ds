import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Banner.css";

export type BannerTone = "info" | "success" | "warning" | "danger";

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Semantic tone driving tint + icon color. */
  tone?: BannerTone;
  /** Bold leading line (subhead, 600). */
  title?: ReactNode;
  /** Secondary descriptive text (footnote). */
  children?: ReactNode;
  /** Leading glyph; falls back to a tone-default icon. */
  icon?: ReactNode;
  /** Trailing action slot (e.g. a button). */
  action?: ReactNode;
  /** When provided, renders a trailing close (×) button. */
  onClose?: () => void;
}

const defaultIcons: Record<BannerTone, ReactNode> = {
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.3 3.9 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  ),
};

/**
 * Inline status banner. Tinted background and icon color carry the tone;
 * pairs a bold title with a quieter message, plus optional action and close.
 */
export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { tone = "info", title, icon, action, onClose, className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      data-tone={tone}
      role={tone === "danger" ? "alert" : "status"}
      className={cx("prism-banner", className)}
      {...rest}
    >
      <span className="prism-banner__icon" aria-hidden="true">
        {icon != null ? icon : defaultIcons[tone]}
      </span>
      <div className="prism-banner__main">
        {title != null && <div className="prism-banner__title">{title}</div>}
        {children != null && <div className="prism-banner__message">{children}</div>}
      </div>
      {action != null && <div className="prism-banner__action">{action}</div>}
      {onClose != null && (
        <button
          type="button"
          className="prism-banner__close"
          aria-label="关闭"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 6 18 18" />
            <path d="M18 6 6 18" />
          </svg>
        </button>
      )}
    </div>
  );
});
