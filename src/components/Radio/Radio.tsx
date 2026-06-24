import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Radio.css";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Text or node rendered to the right of the control. */
  label?: ReactNode;
}

/**
 * Single radio control: a hidden native `input[type=radio]` paired with a
 * 20x20 styled circle. Checked shows an accent ring + center dot. For grouped
 * single-choice fields prefer `RadioGroup`.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, className, disabled, ...rest },
  ref
) {
  return (
    <label className={cx("ads-radio", disabled && "ads-radio--disabled", className)}>
      <input
        ref={ref}
        type="radio"
        className="ads-radio__input"
        disabled={disabled}
        {...rest}
      />
      <span className="ads-radio__control" aria-hidden="true" />
      {label != null && <span className="ads-radio__label">{label}</span>}
    </label>
  );
});

export interface RadioGroupOption {
  /** Visible label. */
  label: ReactNode;
  /** Value submitted when selected. */
  value: string;
  /** Disable this single option. */
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Shared form name for all radios in the group. */
  name: string;
  /** Currently selected value (controlled). */
  value: string;
  /** Fires with the newly selected value. */
  onChange: (value: string) => void;
  /** Options to render, in order. */
  options: RadioGroupOption[];
  /** Stack vertically (default) or inline. */
  orientation?: "vertical" | "horizontal";
  /** Accessible label for the group. */
  "aria-label"?: string;
  /** Extra class on the group container. */
  className?: string;
}

/**
 * Single-choice group. Manages a shared `name`, the selected `value`, and
 * renders `options` as `Radio` controls. Reports selection via `onChange`.
 */
export function RadioGroup({
  name,
  value,
  onChange,
  options,
  orientation = "vertical",
  className,
  "aria-label": ariaLabel,
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cx("ads-radio-group", `ads-radio-group--${orientation}`, className)}
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          disabled={option.disabled}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
        />
      ))}
    </div>
  );
}
