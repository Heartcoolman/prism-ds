import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";

export interface AppleProviderProps extends HTMLAttributes<HTMLDivElement> {
  /** Color scheme for this subtree. Defaults to `light`. */
  theme?: "light" | "dark";
  children?: ReactNode;
}

/**
 * Root wrapper that establishes the Apple-Style typography, color and theme
 * context. Wrap your app (or any rendered design) in this so tokens, fonts and
 * dark-mode resolve correctly. Applies the global `.ads-root` class.
 */
export const AppleProvider = forwardRef<HTMLDivElement, AppleProviderProps>(
  function AppleProvider({ theme = "light", className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-theme={theme}
        data-ads-root=""
        className={cx("ads-root", className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
