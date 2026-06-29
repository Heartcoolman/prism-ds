/**
 * Brand-level theme overrides. Each field maps to a semantic CSS variable;
 * unset fields fall back to the built-in default preset (see `apple`).
 */
export interface Theme {
  /** Primary action color. → --color-accent */
  accent?: string;
  /** Accent hover state. → --color-accent-hover */
  accentHover?: string;
  /** Accent pressed state. → --color-accent-pressed */
  accentPressed?: string;
  /** Success status color. → --color-success */
  success?: string;
  /** Warning status color. → --color-warning */
  warning?: string;
  /** Danger / destructive color. → --color-danger */
  danger?: string;
  /** Sans font stack. → --font-sans */
  fontSans?: string;
  /** Mono font stack. → --font-mono */
  fontMono?: string;
  /** Pill radius (buttons). → --radius-pill */
  radiusPill?: string;
  /** Card radius. → --radius-card */
  radiusCard?: string;
  /** Modal / sheet radius. → --radius-modal */
  radiusModal?: string;
  /** Input / control radius. → --radius-input */
  radiusInput?: string;
  /** Image radius. → --radius-image */
  radiusImage?: string;
  /** Small radius. → --radius-sm */
  radiusSm?: string;
  /** Keyboard focus ring shadow. → --focus-ring */
  focusRing?: string;
}
