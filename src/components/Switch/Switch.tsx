import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Switch.css";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Optional text label rendered beside the track. */
  label?: ReactNode;
}

/**
 * Toggle switch. A 51x31 pill track with a 27px white knob that slides
 * on toggle. Off uses a neutral fill, on uses the accent color. Wraps a
 * hidden native checkbox (`role="switch"`) so checked state and a11y are
 * handled natively.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, className, disabled, ...rest },
  ref
) {
  return (
    <label className={cx("ads-switch", disabled && "ads-switch--disabled", className)}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className="ads-switch__input"
        disabled={disabled}
        {...rest}
      />
      <span className="ads-switch__track" aria-hidden="true">
        <span className="ads-switch__knob" />
      </span>
      {label != null && <span className="ads-switch__label">{label}</span>}
    </label>
  );
});
