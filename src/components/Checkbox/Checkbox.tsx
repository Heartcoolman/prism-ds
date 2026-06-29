import { forwardRef, useEffect, useRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Checkbox.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Text shown to the right of the box; clickable, wraps the input. */
  label?: ReactNode;
  /** Mixed state — renders a dash and sets the native `indeterminate` flag. */
  indeterminate?: boolean;
}

/**
 * Custom checkbox built on a visually-hidden native `<input type="checkbox">`
 * plus a 20x20 styled box. Supports checked, indeterminate, and disabled
 * states with a crisp focus ring. Minimum hit area is preserved by the label row.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { label, indeterminate = false, className, disabled, ...rest },
    ref
  ) {
    const innerRef = useRef<HTMLInputElement | null>(null);

    const setRef = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <label className={cx("prism-check", disabled && "prism-check--disabled", className)}>
        <input
          ref={setRef}
          type="checkbox"
          className="prism-check__input"
          disabled={disabled}
          aria-checked={indeterminate ? "mixed" : undefined}
          {...rest}
        />
        <span className="prism-check__box" aria-hidden="true">
          <svg
            className="prism-check__mark"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          <svg
            className="prism-check__dash"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 12h12" />
          </svg>
        </span>
        {label != null && <span className="prism-check__label">{label}</span>}
      </label>
    );
  }
);
