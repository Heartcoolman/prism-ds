import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Badge.css";

export type BadgeTone = "danger" | "accent" | "gray";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Numeric value to display; clamped to `${max}+` when exceeded. */
  count?: number;
  /** Render a text-less 8px dot instead of a count pill. */
  dot?: boolean;
  /** Largest count shown before overflowing to `${max}+`. */
  max?: number;
  /** Semantic color of the badge fill. */
  tone?: BadgeTone;
  /** Optional anchor; the badge floats at its top-right corner. */
  children?: ReactNode;
}

/**
 * Count / dot badge. Standalone, or wrapping `children` to float at the
 * top-right of a relative container (e.g. over an icon).
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { count, dot = false, max = 99, tone = "danger", className, children, ...rest },
  ref
) {
  const display =
    !dot && count != null ? (count > max ? `${max}+` : String(count)) : null;

  const label =
    !dot && count != null ? `${count} 条未读` : undefined;

  const badge = (
    <span
      ref={ref}
      data-tone={tone}
      role="status"
      aria-label={label}
      className={cx(
        "ads-badge",
        dot && "ads-badge--dot",
        children != null && "ads-badge--floating",
        className
      )}
      {...rest}
    >
      {display}
    </span>
  );

  if (children == null) return badge;

  return (
    <span className="ads-badge-wrap">
      {children}
      {badge}
    </span>
  );
});
