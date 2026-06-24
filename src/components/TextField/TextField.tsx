import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./TextField.css";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label rendered above the input. */
  label?: string;
  /** Supporting text shown below the input when not in error. */
  helpText?: ReactNode;
  /** Truthy value switches the field to the error state and shows this message. */
  error?: string;
  /** Leading glyph rendered inside the input, left-aligned. */
  leadingIcon?: ReactNode;
  /** Stretch the field to fill the container width. */
  fullWidth?: boolean;
}

/**
 * Labeled text input. The label sits above the control; help or error text
 * sits below. Focus shows the accent border + ring; error swaps to danger.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      helpText,
      error,
      leadingIcon,
      fullWidth = false,
      className,
      id,
      disabled,
      ...rest
    },
    ref
  ) {
    const reactId = useId();
    const inputId = id ?? reactId;
    const hasError = Boolean(error);
    const messageId = `${inputId}-message`;
    const hasMessage = hasError || helpText != null;

    return (
      <div
        className={cx(
          "ads-field",
          fullWidth && "ads-field--full",
          disabled && "ads-field--disabled",
          hasError && "ads-field--error",
          className
        )}
      >
        {label != null && (
          <label className="ads-field__label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <div className="ads-field__control">
          {leadingIcon != null && (
            <span className="ads-field__icon" aria-hidden="true">
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className="ads-field__input"
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={hasMessage ? messageId : undefined}
            {...rest}
          />
        </div>
        {hasError ? (
          <p id={messageId} className="ads-field__message ads-field__message--error">
            {error}
          </p>
        ) : (
          helpText != null && (
            <p id={messageId} className="ads-field__message">
              {helpText}
            </p>
          )
        )}
      </div>
    );
  }
);
