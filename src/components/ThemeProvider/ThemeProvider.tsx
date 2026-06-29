import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import { themeToVars } from "../../theme/themeToVars";
import type { Theme } from "../../theme/types";

export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  /** Color scheme for this subtree. Defaults to `light`. */
  colorScheme?: "light" | "dark";
  /**
   * Brand theme overrides, injected as inline CSS variables on this element.
   * Unset fields fall back to the built-in default preset.
   */
  theme?: Theme;
  children?: ReactNode;
}

/**
 * Root wrapper that establishes typography, color scheme and brand theme.
 * Wrap your app (or any rendered design) so tokens, fonts and color scheme
 * resolve correctly. Applies the global `.prism-root` class; `theme` overrides
 * are written as inline CSS variables on this element.
 */
export const ThemeProvider = forwardRef<HTMLDivElement, ThemeProviderProps>(
  function ThemeProvider(
    { colorScheme = "light", theme, className, style, children, ...rest },
    ref
  ) {
    const themeStyle: CSSProperties | undefined = theme
      ? { ...themeToVars(theme), ...style }
      : style;
    return (
      <div
        ref={ref}
        data-theme={colorScheme}
        data-prism-root=""
        className={cx("prism-root", className)}
        style={themeStyle}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
