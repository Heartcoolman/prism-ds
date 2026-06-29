# Prism

A themeable **React + TypeScript** design system. 46 components driven entirely by CSS-variable tokens (primitive → semantic → component). Prism ships with an **Apple-inspired default theme** and a **neutral preset** — or pass your own brand and every component re-skins at once.

## Install

```bash
npm install @prism-ds/react
# or: pnpm add @prism-ds/react
```

```bash
# local development of this repo
pnpm install
pnpm build            # tsup -> dist/index.{js,cjs,d.ts} + dist/index.css
pnpm storybook        # local preview at :6006
pnpm build-storybook  # static storybook -> storybook-static/
```

## Usage

```tsx
import { ThemeProvider, Button } from "@prism-ds/react";
import "@prism-ds/react/styles.css";

export default function App() {
  return (
    <ThemeProvider colorScheme="light">
      <Button variant="filled" tone="accent">继续</Button>
    </ThemeProvider>
  );
}
```

## Theming

Every brand-relevant value (accent, status colors, fonts, radii, focus ring) is a CSS variable with a sensible default. Override them per subtree via the `theme` prop, or globally by redefining the variables in your own CSS.

```tsx
import { ThemeProvider, neutral, type Theme } from "@prism-ds/react";

// Use a built-in preset…
<ThemeProvider theme={neutral}>{/* … */}</ThemeProvider>

// …or supply your own brand (unset fields fall back to the default preset).
const brand: Theme = {
  accent: "#7c3aed",
  fontSans: "Inter, system-ui, sans-serif",
  radiusCard: "12px",
};
<ThemeProvider theme={brand} colorScheme="dark">{/* … */}</ThemeProvider>
```

- **Presets** — `apple` (default, Apple-inspired) and `neutral` (brand-agnostic, geometric radii, system font) are exported from the package.
- **`themeToVars(theme)`** — converts a `Theme` into inline CSS custom properties if you want to apply them yourself.
- **Color scheme** — `colorScheme="light" | "dark"` flips light/dark; dark mode also follows `prefers-color-scheme`. (Note: a `theme` value applies to both schemes — inline variables outrank the dark-mode selector. See `docs/THEMING.md`.)

## Idiom

- **Tokens are the source of truth** — CSS variables in `src/styles/tokens.css` (primitive → semantic → component). Reference `var(--color-accent)`, `var(--s-4)`, `var(--radius-card)`, never hard-coded values.
- **Styling** — each component ships scoped `prism-*` CSS; layout glue uses global utility classes (`.stack`, `.row`, `.text-headline`, …) from `src/styles/global.css`.
- **Provider** — wrap in `<ThemeProvider colorScheme="light|dark" theme={...}>` to establish typography, color scheme and brand.

## License

MIT
