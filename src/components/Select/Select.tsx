import { forwardRef, useId } from "react";
import type { ReactNode, SelectHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import "./Select.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Field label rendered above the control. */
  label?: ReactNode;
  /** Supporting text shown below the control. */
  helpText?: ReactNode;
  /** Error message; switches the field to its error state. */
  error?: ReactNode;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  /** `<option>` elements. */
  children?: ReactNode;
}

/**
 * Styled native select with a label, optional help/error text, and a
 * trailing chevron. Wraps a real `<select>` so keyboard and platform
 * behavior stay intact. Minimum hit area 44px.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    helpText,
    error,
    fullWidth = false,
    className,
    id,
    children,
    "aria-describedby": ariaDescribedBy,
    ...rest
  },
  ref
) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const helpId = `${selectId}-help`;
  const hasError = error != null && error !== false;
  const describedBy =
    cx(helpText != null || hasError ? helpId : undefined, ariaDescribedBy) ||
    undefined;

  return (
    <div
      className={cx(
        "prism-select",
        fullWidth && "prism-select--full",
        hasError && "prism-select--error",
        className
      )}
    >
      {label != null && (
        <label className="prism-select__label" htmlFor={selectId}>
          {label}
        </label>
      )}
      <div className="prism-select__field">
        <select
          ref={ref}
          id={selectId}
          className="prism-select__control"
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          {...rest}
        >
          {children}
        </select>
        <span className="prism-select__chevron" aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>
      {(helpText != null || hasError) && (
        <span className="prism-select__help" id={helpId}>
          {hasError ? error : helpText}
        </span>
      )}
    </div>
  );
});
