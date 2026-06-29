import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import "./ProgressBar.css";

export type ProgressBarTone = "accent" | "success" | "danger";

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Completion 0–100. Ignored when `indeterminate`. */
  value?: number;
  /** Show an animated sliding segment instead of a fixed fill. */
  indeterminate?: boolean;
  /** Semantic fill color. */
  tone?: ProgressBarTone;
}

/**
 * Linear progress indicator. Pill-shaped track with an accent fill that
 * animates to `value%`, or an indeterminate sliding segment.
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  function ProgressBar(
    { value = 0, indeterminate = false, tone = "accent", className, ...rest },
    ref
  ) {
    const clamped = Math.min(100, Math.max(0, value));
    return (
      <div
        ref={ref}
        data-tone={tone}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : 100}
        className={cx(
          "prism-progress",
          indeterminate && "prism-progress--indeterminate",
          className
        )}
        {...rest}
      >
        <div
          className="prism-progress__fill"
          style={indeterminate ? undefined : { width: `${clamped}%` }}
        />
      </div>
    );
  }
);
