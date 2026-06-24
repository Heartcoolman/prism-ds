# Apple-Style Design System

A faithful React + TypeScript implementation of the internal **Apple-Style Design Guidelines** (v1.0 · 2026). Tokens, components, and idioms are derived directly from the spec.

## Install & build

```bash
pnpm install
pnpm build            # tsup -> dist/index.{js,cjs,d.ts} + dist/index.css
pnpm storybook        # local preview at :6006
pnpm build-storybook  # static storybook -> storybook-static/
```

## Usage

```tsx
import { AppleProvider, Button } from "apple-style-ds";
import "apple-style-ds/styles.css";

export default function App() {
  return (
    <AppleProvider theme="light">
      <Button variant="filled" tone="accent">继续</Button>
    </AppleProvider>
  );
}
```

## Idiom

- **Tokens are the source of truth** — CSS variables in `src/styles/tokens.css` (primitive → semantic → component). Reference `var(--color-accent)`, `var(--s-4)`, `var(--radius-card)`, never hard-coded values.
- **Styling** — each component ships scoped CSS Modules; layout glue uses global utility classes (`.stack`, `.row`, `.text-headline`, …) from `src/styles/global.css`.
- **Theme** — wrap in `<AppleProvider theme="light|dark">`; dark mode also follows `prefers-color-scheme`.
