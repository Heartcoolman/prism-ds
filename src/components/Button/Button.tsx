import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./Button.css";

export type ButtonVariant = "filled" | "tinted" | "gray" | "bordered" | "plain";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonTone = "accent" | "danger" | "success";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. `filled` is the single primary action per view. */
  variant?: ButtonVariant;
  /** Control height: small 28 / medium 44 / large 50. */
  size?: ButtonSize;
  /** Semantic color. `danger` for destructive actions. */
  tone?: ButtonTone;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  /** Leading glyph (18px box). */
  leadingIcon?: ReactNode;
  /** Trailing glyph (18px box). */
  trailingIcon?: ReactNode;
  children?: ReactNode;
}

/**
 * Pill-shaped button. Hierarchy is expressed by fill strength
 * (filled > tinted > gray > bordered > plain). One filled button per area.
 * Minimum hit area 44x44.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "filled",
    size = "medium",
    tone = "accent",
    fullWidth = false,
    leadingIcon,
    trailingIcon,
    className,
    children,
    type = "button",
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      data-tone={tone}
      className={cx(
        "prism-btn",
        `prism-btn--${variant}`,
        `prism-btn--${size}`,
        fullWidth && "prism-btn--full",
        className
      )}
      {...rest}
    >
      {leadingIcon != null && (
        <span className="prism-btn__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {children != null && <span className="prism-btn__label">{children}</span>}
      {trailingIcon != null && (
        <span className="prism-btn__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
});
