# Theming

Prism is driven entirely by CSS-variable tokens in three layers (primitive →
semantic → component). Components reference only semantic/component variables, so
re-theming changes one place and propagates everywhere.

There are three ways to theme, from simplest to most global.

## 1. The `theme` prop (per-subtree)

Pass a `Theme` object to `ThemeProvider`. Each field maps to a semantic CSS
variable and is written as an **inline custom property** on the provider element,
so it applies to that subtree. Unset fields fall back to the default preset.

```tsx
import { ThemeProvider, type Theme } from "@prism-ds/react";

const brand: Theme = {
  accent: "#7c3aed",
  accentHover: "#6d28d9",
  fontSans: "Inter, system-ui, sans-serif",
  radiusCard: "12px",
};

<ThemeProvider theme={brand}>{/* … */}</ThemeProvider>;
```

### `Theme` fields

| Field | CSS variable | Field | CSS variable |
|---|---|---|---|
| `accent` | `--color-accent` | `fontSans` | `--font-sans` |
| `accentHover` | `--color-accent-hover` | `fontMono` | `--font-mono` |
| `accentPressed` | `--color-accent-pressed` | `radiusPill` | `--radius-pill` |
| `success` | `--color-success` | `radiusCard` | `--radius-card` |
| `warning` | `--color-warning` | `radiusModal` | `--radius-modal` |
| `danger` | `--color-danger` | `radiusInput` | `--radius-input` |
| `focusRing` | `--focus-ring` | `radiusImage` | `--radius-image` |
| | | `radiusSm` | `--radius-sm` |

## 2. Presets

Two presets ship with the package:

- **`apple`** — the default, Apple-inspired language (mirrors `tokens.css`).
- **`neutral`** — brand-agnostic: indigo accent, system font, geometric radii.

```tsx
import { ThemeProvider, neutral } from "@prism-ds/react";

<ThemeProvider theme={neutral}>{/* … */}</ThemeProvider>;
```

`themeToVars(theme)` is exported if you want to apply the variables yourself:

```tsx
import { themeToVars, neutral } from "@prism-ds/react";

<div style={themeToVars(neutral)}>{/* … */}</div>;
```

## 3. Global CSS override

For an app-wide brand, redefine the semantic variables in your own stylesheet
(loaded after `@prism-ds/react/styles.css`). This is the most global approach and
needs no provider prop.

```css
:root {
  --color-accent: #7c3aed;
  --radius-card: 12px;
  --font-sans: "Inter", system-ui, sans-serif;
}
```

## Color scheme vs. theme

`colorScheme="light" | "dark"` flips light/dark via the `[data-theme]` attribute;
dark mode also follows `prefers-color-scheme`. This is independent of the brand
`theme`.

> **Specificity caveat.** A `theme` value is an inline style, which outranks the
> `[data-theme="dark"]` selector. So a brand `accent` (or any themed variable)
> applies to **both** light and dark — the dark-mode swap for that variable will
> not win. If you need a different accent per scheme, either render two
> `ThemeProvider`s (one per scheme) with scheme-specific `theme` objects, or set
> the override globally via CSS (approach 3) inside your own `[data-theme="dark"]`
> block instead of the `theme` prop.
