import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Slider.css";

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Optional leading label rendered above the track. */
  label?: ReactNode;
  /** Show the current value readout (tabular numerals) beside the label. */
  showValue?: boolean;
}

/**
 * Range slider built on a native `<input type="range">`.
 * 4px pill track, 28px white thumb with a soft shadow, accent fill.
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { label, showValue = false, className, value, defaultValue, ...rest },
  ref
) {
  const current = value != null ? value : defaultValue;
  const hasHeader = label != null || showValue;

  return (
    <div className={cx("prism-slider", className)}>
      {hasHeader && (
        <div className="prism-slider__header">
          {label != null && <span className="prism-slider__label">{label}</span>}
          {showValue && (
            <span className="prism-slider__value">{current ?? ""}</span>
          )}
        </div>
      )}
      <input
        ref={ref}
        type="range"
        className="prism-slider__input"
        value={value}
        defaultValue={defaultValue}
        {...rest}
      />
    </div>
  );
});
