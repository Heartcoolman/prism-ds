import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./SegmentedControl.css";

export type SegmentedControlSize = "small" | "medium";

export interface SegmentedOption {
  /** Visible content for the segment. */
  label: ReactNode;
  /** Unique value emitted on selection. */
  value: string;
}

export interface SegmentedControlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Segments to render, in order. */
  options: SegmentedOption[];
  /** Currently selected value (controlled). */
  value: string;
  /** Fired with the value of the tapped segment. */
  onChange: (value: string) => void;
  /** Control height: small 28 / medium 44. */
  size?: SegmentedControlSize;
  /** Stretch the control to fill its container width. */
  fullWidth?: boolean;
}

/**
 * iOS-style segmented control. A single-select group of equal-width segments
 * over a tertiary-fill track; the selected segment lifts onto a white pill.
 */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl(
    {
      options,
      value,
      onChange,
      size = "medium",
      fullWidth = false,
      className,
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        role="group"
        className={cx(
          "prism-segmented",
          `prism-segmented--${size}`,
          fullWidth && "prism-segmented--full",
          className
        )}
        {...rest}
      >
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              className={cx(
                "prism-segmented__segment",
                selected && "prism-segmented__segment--selected"
              )}
              onClick={() => onChange(option.value)}
            >
              <span className="prism-segmented__label">{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);
