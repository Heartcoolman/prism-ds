import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Tag.css";

export type TagTone = "gray" | "accent" | "success" | "warning" | "danger";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic color. `gray` is the neutral default. */
  tone?: TagTone;
  /** Selected state: accent tint, accent text, subtle ring. */
  selected?: boolean;
  /** When set, renders a trailing remove (×) button. */
  onRemove?: () => void;
  /** When set, the pill becomes a clickable button (cursor pointer). */
  onClick?: HTMLAttributes<HTMLSpanElement>["onClick"];
  children: ReactNode;
}

/**
 * Compact pill for labels, filters, and tokens. Color is set by `tone`;
 * `selected` raises an accent ring; `onClick` makes it interactive and
 * `onRemove` appends a trailing × control.
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    tone = "gray",
    selected = false,
    onRemove,
    onClick,
    className,
    children,
    ...rest
  },
  ref
) {
  const interactive = onClick != null;
  return (
    <span
      ref={ref}
      data-tone={tone}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-pressed={interactive ? selected : undefined}
      onClick={onClick}
      className={cx(
        "prism-tag",
        selected && "prism-tag--selected",
        interactive && "prism-tag--interactive",
        className
      )}
      {...rest}
    >
      <span className="prism-tag__label">{children}</span>
      {onRemove != null && (
        <button
          type="button"
          className="prism-tag__remove"
          aria-label="移除"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </span>
  );
});
