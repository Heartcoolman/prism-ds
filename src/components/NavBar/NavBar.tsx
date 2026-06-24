import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./NavBar.css";

export interface NavBarProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Centered title in the bar row. */
  title?: ReactNode;
  /** Leading slot (overrides the default back button). */
  leading?: ReactNode;
  /** Trailing slot, right-aligned. */
  trailing?: ReactNode;
  /** When set (and no leading), renders a default back button. */
  onBack?: () => void;
  /** Label for the default back button. */
  backLabel?: string;
  /** Render the title as a left-aligned large title below the bar row. */
  large?: boolean;
}

/**
 * Sticky top navigation bar with a translucent material background.
 * Three-column layout: leading | centered title | trailing. A `large`
 * variant adds a left-aligned large title row beneath the bar.
 */
export const NavBar = forwardRef<HTMLElement, NavBarProps>(function NavBar(
  {
    title,
    leading,
    trailing,
    onBack,
    backLabel = "返回",
    large = false,
    className,
    ...rest
  },
  ref
) {
  const leadingContent =
    leading != null
      ? leading
      : onBack != null && (
          <button
            type="button"
            className="ads-navbar__back"
            onClick={onBack}
          >
            <svg
              className="ads-navbar__back-icon"
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
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="ads-navbar__back-label">{backLabel}</span>
          </button>
        );

  return (
    <header
      ref={ref}
      className={cx("ads-navbar", large && "ads-navbar--large", className)}
      {...rest}
    >
      <div className="ads-navbar__row">
        <div className="ads-navbar__leading">{leadingContent}</div>
        {!large && title != null && (
          <h1 className="ads-navbar__title">{title}</h1>
        )}
        <div className="ads-navbar__trailing">{trailing}</div>
      </div>
      {large && title != null && (
        <h1 className="ads-navbar__large-title">{title}</h1>
      )}
    </header>
  );
});
