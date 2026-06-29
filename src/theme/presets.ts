import type { Theme } from "./types";

/**
 * Default preset — the Apple-inspired design language the tokens ship with.
 * Equivalent to applying no theme; provided for explicitness and as a base to
 * extend. Values mirror `src/styles/tokens.css`.
 */
export const apple: Theme = {
  accent: "#0066cc",
  accentHover: "#0058b3",
  accentPressed: "#004a99",
  success: "#1d8a4e",
  warning: "#c2410c",
  danger: "#c5283d",
  fontSans:
    '-apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", "PingFang SC", system-ui, sans-serif',
  fontMono: '"SF Mono", ui-monospace, Menlo, monospace',
  radiusPill: "980px",
  radiusCard: "18px",
  radiusModal: "20px",
  radiusInput: "10px",
  radiusImage: "14px",
  radiusSm: "6px",
  focusRing: "0 0 0 3px rgba(0, 102, 204, 0.4)",
};

/**
 * Neutral preset — brand-agnostic defaults: a calm indigo accent, the platform
 * system font, and tighter geometric radii. A starting point for non-Apple looks.
 */
export const neutral: Theme = {
  accent: "#4f46e5",
  accentHover: "#4338ca",
  accentPressed: "#3730a3",
  success: "#15803d",
  warning: "#b45309",
  danger: "#b91c1c",
  fontSans:
    'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontMono: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
  radiusPill: "8px",
  radiusCard: "12px",
  radiusModal: "14px",
  radiusInput: "8px",
  radiusImage: "10px",
  radiusSm: "4px",
  focusRing: "0 0 0 3px rgba(79, 70, 229, 0.4)",
};
