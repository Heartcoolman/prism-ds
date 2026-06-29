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
    <label className={cx("prism-switch", disabled && "prism-switch--disabled", className)}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className="prism-switch__input"
        disabled={disabled}
        {...rest}
      />
      <span className="prism-switch__track" aria-hidden="true">
        <span className="prism-switch__knob" />
      </span>
      {label != null && <span className="prism-switch__label">{label}</span>}
    </label>
  );
});
