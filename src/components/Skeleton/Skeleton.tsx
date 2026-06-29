import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import "./Skeleton.css";

export type SkeletonVariant = "text" | "rect" | "circle";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Placeholder shape. `text` renders one or more text lines. */
  variant?: SkeletonVariant;
  /** Explicit width (rect/circle). Number is treated as px. */
  width?: number | string;
  /** Explicit height (rect/circle). Number is treated as px. */
  height?: number | string;
  /** Number of stacked lines for `text` variant only. */
  lines?: number;
}

function toCss(value: number | string | undefined): string | undefined {
  if (value == null) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

/**
 * Pulsing placeholder shown while content loads. Purely decorative:
 * marked aria-hidden with role="presentation" so it is skipped by AT.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { variant = "text", width, height, lines = 1, className, style, ...rest },
  ref
) {
  if (variant === "text") {
    const count = Math.max(1, lines);
    return (
      <div
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cx("prism-skeleton", "prism-skeleton--text-group", className)}
        style={style}
        {...rest}
      >
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            className="prism-skeleton__line"
            style={
              i === count - 1 && count > 1
                ? ({ width: "60%" } as CSSProperties)
                : undefined
            }
          />
        ))}
      </div>
    );
  }

  const sizeStyle: CSSProperties = {
    width: toCss(width),
    height: variant === "circle" ? toCss(width ?? height) : toCss(height),
    ...style,
  };

  return (
    <div
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cx("prism-skeleton", `prism-skeleton--${variant}`, className)}
      style={sizeStyle}
      {...rest}
    />
  );
});
