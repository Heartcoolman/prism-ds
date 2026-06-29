import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import "./LiquidGlass.css";

export interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  /** Pill shape for floating toolbars / capsule controls. */
  pill?: boolean;
  children?: ReactNode;
}

/**
 * Liquid Glass (2025) — a translucent dynamic material that refracts and
 * highlights the content behind it, floating above the UI. Use ONLY for
 * floating control layers (nav, toolbars, popovers); never glass-on-glass,
 * never full-screen, and keep text contrast high.
 */
export const LiquidGlass = forwardRef<HTMLDivElement, LiquidGlassProps>(
  function LiquidGlass({ pill = false, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cx("prism-liquid-glass", pill && "prism-liquid-glass--pill", className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
