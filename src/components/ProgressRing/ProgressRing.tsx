import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./ProgressRing.css";

export type ProgressRingTone = "accent" | "success" | "danger";

export interface ProgressRingProps extends HTMLAttributes<HTMLDivElement> {
  /** Completion as a percentage (0–100). */
  value: number;
  /** Outer diameter in px. */
  size?: number;
  /** Ring thickness (inset of the inner mask) in px. */
  thickness?: number;
  /** Center content. Defaults to `${value}%`. */
  label?: ReactNode;
  /** Semantic color of the filled arc. */
  tone?: ProgressRingTone;
}

/** Clamp a number into the [min, max] range. */
function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/**
 * Circular progress ring built from a conic-gradient with an inner mask.
 * Reports progress via `role="progressbar"` + `aria-valuenow`.
 */
export const ProgressRing = forwardRef<HTMLDivElement, ProgressRingProps>(
  function ProgressRing(
    {
      value,
      size = 96,
      thickness = 12,
      label,
      tone = "accent",
      className,
      style,
      ...rest
    },
    ref
  ) {
    const pct = clamp(value, 0, 100);
    const vars = {
      "--_size": `${size}px`,
      "--_thickness": `${thickness}px`,
      "--_pct": `${pct}%`,
    } as CSSProperties;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        data-tone={tone}
        className={cx("prism-ring", className)}
        style={{ ...vars, ...style }}
        {...rest}
      >
        <span className="prism-ring__label">{label ?? `${pct}%`}</span>
      </div>
    );
  }
);
