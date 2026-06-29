import type { CSSProperties } from "react";
import type { Theme } from "./types";

const VAR_MAP: Record<keyof Theme, string> = {
  accent: "--color-accent",
  accentHover: "--color-accent-hover",
  accentPressed: "--color-accent-pressed",
  success: "--color-success",
  warning: "--color-warning",
  danger: "--color-danger",
  fontSans: "--font-sans",
  fontMono: "--font-mono",
  radiusPill: "--radius-pill",
  radiusCard: "--radius-card",
  radiusModal: "--radius-modal",
  radiusInput: "--radius-input",
  radiusImage: "--radius-image",
  radiusSm: "--radius-sm",
  focusRing: "--focus-ring",
};

/**
 * Convert a {@link Theme} into inline CSS custom properties for a `style` prop.
 * Unset fields are omitted so the default preset shows through.
 */
export function themeToVars(theme: Theme = {}): CSSProperties {
  const vars: Record<string, string> = {};
  (Object.keys(theme) as (keyof Theme)[]).forEach((key) => {
    const value = theme[key];
    if (value != null) vars[VAR_MAP[key]] = value;
  });
  return vars as CSSProperties;
}
