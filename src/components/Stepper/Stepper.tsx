import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import "./Stepper.css";

export interface StepperProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Current numeric value (controlled). */
  value: number;
  /** Fired with the next value when a button is pressed. */
  onChange: (value: number) => void;
  /** Lower bound; decrement disabled at this value. */
  min?: number;
  /** Upper bound; increment disabled at this value. */
  max?: number;
  /** Amount added/removed per press. */
  step?: number;
  /** Disable both controls. */
  disabled?: boolean;
}

const MinusIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

/**
 * Numeric stepper. Segmented control [−] [value] [+] for adjusting a number
 * by a fixed step within optional bounds. Buttons disable at their bound.
 */
export const Stepper = forwardRef<HTMLDivElement, StepperProps>(function Stepper(
  {
    value,
    onChange,
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    step = 1,
    disabled = false,
    className,
    ...rest
  },
  ref
) {
  const atMin = value <= min;
  const atMax = value >= max;

  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));

  return (
    <div
      ref={ref}
      role="group"
      className={cx("ads-stepper", disabled && "ads-stepper--disabled", className)}
      {...rest}
    >
      <button
        type="button"
        className="ads-stepper__btn"
        aria-label="减少"
        disabled={disabled || atMin}
        onClick={decrement}
      >
        <MinusIcon />
      </button>
      <span className="ads-stepper__value">{value}</span>
      <button
        type="button"
        className="ads-stepper__btn"
        aria-label="增加"
        disabled={disabled || atMax}
        onClick={increment}
      >
        <PlusIcon />
      </button>
    </div>
  );
});
