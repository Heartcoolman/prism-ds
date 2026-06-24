import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import "./Spinner.css";

export type SpinnerSize = "small" | "medium" | "large";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** Diameter: small 16 / medium 24 / large 36. */
  size?: SpinnerSize;
  /** Accessible status text; also the visible caption when `showLabel`. */
  label?: string;
  /** Render the label beside the ring instead of visually hidden. */
  showLabel?: boolean;
}

/**
 * Activity spinner. A continuously rotating ring used to indicate
 * indeterminate progress. Exposes `role="status"` with an accessible
 * label so assistive tech announces the busy state.
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(function Spinner(
  { size = "medium", label = "加载中", showLabel = false, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="status"
      aria-label={label}
      className={cx("ads-spinner", `ads-spinner--${size}`, className)}
      {...rest}
    >
      <span className="ads-spinner__ring" aria-hidden="true" />
      <span className={showLabel ? "ads-spinner__label" : "visually-hidden"}>
        {label}
      </span>
    </div>
  );
});
