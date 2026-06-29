import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import "./Textarea.css";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label rendered above the field (subhead, secondary). */
  label?: string;
  /** Assistive text shown below the field. */
  helpText?: string;
  /** Error message; styles the field red and replaces helpText. */
  error?: string;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
}

/**
 * Multiline text input. Label sits above; a vertically resizable
 * textarea with a crisp focus ring; error/help text below.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, helpText, error, fullWidth = false, className, id, ...rest },
    ref
  ) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const describedById = `${fieldId}-desc`;
    const hasError = error != null && error !== "";
    const description = hasError ? error : helpText;

    return (
      <div
        className={cx(
          "prism-textarea",
          fullWidth && "prism-textarea--full",
          hasError && "prism-textarea--error",
          className
        )}
      >
        {label != null && (
          <label className="prism-textarea__label" htmlFor={fieldId}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          className="prism-textarea__field"
          aria-invalid={hasError || undefined}
          aria-describedby={description != null ? describedById : undefined}
          {...rest}
        />
        {description != null && (
          <p className="prism-textarea__desc" id={describedById}>
            {description}
          </p>
        )}
      </div>
    );
  }
);
