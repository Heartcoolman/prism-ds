# Prism — Component Demo

A single, self-contained showcase of **every** `@prism-ds/react` component, the design
foundations (color · type · spacing · radius · elevation · icons), and the signature
features (Material, Liquid Glass, live theming + dark mode).

## Open it

Just open `index.html` in a browser — it runs from `file://`, no server or network needed.

```bash
open index.html      # macOS
```

The bundle (`app.js`) inlines React, ReactDOM and the library from `../dist`, and
styles come from `prism.css` (a copy of `../dist/index.css`) + `demo.css`.

## What it covers

- **Foundations** — semantic color tokens (live, theme-aware swatches), the 7-step type
  scale, the 4-based spacing scale, concentric radii, the 5-step shadow scale, and the
  full 46-glyph icon set.
- **All 49 component exports** — buttons, every form control, pickers, tags/badges,
  avatars, cards, lists, table, charts, media, banners/alerts/toasts, progress, loading,
  state views, nav/tab bars, tabs, breadcrumb, page control, menu, disclosure, and the
  modal/sheet/popover overlays.
- **Theming** — the sticky control bar swaps the live `ThemeProvider` for the whole page:
  three presets (Apple / Neutral / Violet), a custom-accent color picker, and a light/dark
  toggle. The Theming section prints the resolved `themeToVars()` output.

## Rebuild after editing `main.jsx`

```bash
node build.mjs       # re-bundles demo/main.jsx -> demo/app.js via the local esbuild
```

> Note: `apple-ds/.gitignore` ignores `dist/`. This demo links the prebuilt `prism.css`
> (copied in) and imports `../dist/index.js`, so run `pnpm build` in the repo root first
> if `dist/` is missing.
