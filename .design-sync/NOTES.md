# design-sync notes — apple-style-ds

## Repo facts
- Source shape: **storybook** (`.storybook/` at package root, `@storybook/react-vite` 8.6).
- Build: `pnpm build` (tsup) → `dist/index.{js,cjs,css,d.ts}`. The DS is its own source repo, so `node_modules/apple-style-ds` does not exist → converter runs with `--entry ./dist/index.js` and `--node-modules ./node_modules`.
- Styling idiom: **global `ads-*` BEM classes** (NOT CSS modules — esbuild/tsup compiled `.module.css` to an empty default export, breaking class maps; global plain CSS is the deliberate choice). Tokens are CSS variables in `src/styles/tokens.css`; global utility classes in `src/styles/global.css`. Both are imported by `src/index.ts` so they land in `dist/index.css`.
- `globalName`: `AppleDS`. `AppleProvider` is a bundle export with no story/component folder (provider only) — expected.

## Config decisions
- `runtimeFontPrefixes: ["SF Pro", "PingFang"]` — SF Pro / PingFang are Apple **system** fonts delivered via `-apple-system` at runtime; we deliberately do NOT ship woff2 (proprietary). This suppresses `[FONT_MISSING]`; the DS pane renders with the host system font (San Francisco on Apple devices), which is the intended design.
- `overrides`: overlays use `cardMode: "single"` (Alert, Modal, Sheet) because their `position:fixed` scrim/panel paints outside grid cells; wide multi-item stories use `cardMode: "column"` (Button, Banner, Tabs, List, Disclosure, Popover).
- Owned preview `.design-sync/previews/Sheet.tsx`: the Sheet panel is `position:fixed` so it contributed 0 in-flow height → `[RENDER_THIN]`. The owned preview wraps it in a 390×560 in-flow stage so the single-mode card has height. **Tied to the Sheet API** (`open`, `title`, `onClose`) — update it if Sheet's props change.

## Materials (added after first sync)
- `Material` (毛玻璃) + `LiquidGlass` (液态玻璃) live under group `Materials`. They are translucent — stories render them over a vivid gradient `Stage` so the blur/glass reads; without a backdrop they look near-invisible (by design). Both use `cardMode: column` (their stages are wider than a grid cell). The nav/tab bars already consume the `--blur-*`/`--material-bg` tokens internally.

## Gap components (added after guidelines)
- Icon (built-in ~46-glyph set, `src/components/Icon/icons.ts`), WheelPicker, BarChart, LineChart, StateView (empty/loading/error/success), Image, Grid. Groups: Foundations (Icon), Data (charts), Feedback (StateView), Containers (Image/Grid), Pickers (WheelPicker).
- Icon/BarChart/Image use `cardMode: column` (wide stories).
- **LineChart always emits `[RENDER_THIN]`** — it's a text-free 96px SVG chart; validate's "no text / paints nothing" heuristic can't see the stroke. Graded `match` on both panels (line + area render). Accept this warning on every sync; do NOT chase it.
- StateView imports Icon/Spinner internally (relative); its stories import Button. Tied to those APIs.

## Sync target history
- **2026-06-25**: the original project `bd2c8a0a-2fd6-4817-9414-4408d2d74af9` became unreachable (get_project 404, list_projects empty — deleted upstream or different login). Re-synced into a **new** project `0550900d-6198-4245-89cd-57122b0c4a30` ("Apple-Style Design System"); `config.json` projectId updated to match. Source was unchanged from commit `1d7a2ee`, so all 45 components carried forward (45/45 match, 117 story verdicts, 0 re-graded) and the full build re-uploaded into the empty project. If the old project URL is bookmarked, it's dead — use the new projectId.
- **2026-06-26**: `0550900d-…` ALSO went 404 (get_project not_found, list_projects empty under the current login). Per user choice, re-synced into a **new** project `2835812c-99de-486b-b0b0-89c4af723755` ("Apple-Style Design System"); `config.json` projectId updated. Source unchanged from commit `e459789` → all 45 storied components carried forward (45/45, **0 grade cleared**), full build (242 files) re-uploaded into the empty project; validate clean (bad 0, thin 1 = LineChart only). **Pattern alert:** two consecutive targets have now gone 404 *with an empty `list_projects`*. An empty list from a call that itself succeeds points at a **login/account mismatch**, not upstream deletion. If this recurs, run `/design-login` and confirm the account FIRST — do not create a 4th orphan before ruling that out.

## Re-sync risks (watch-list)
- **`tokens/` ships empty** (guidelines now ships — see below). `tokensGlob` (`src/styles/tokens.css`) did not populate `tokens/` on the storybook shape; tokens are delivered as CSS vars inside `_ds_bundle.css` (reached via `styles.css`). If a future run wants a separate tokens artifact, investigate the storybook-shape tokens handling.
- **`guidelines/` ships 7 files** (verified in the 2026-06-26 upload): `docs/guides/00-foundations.md` … `05-content-platforms-governance.md` + `index.md`, sourced via `guidelinesGlob: docs/guides/**/*.md` from the distilled Apple spec (original HTML one dir up: `../Apple风格设计规范.dc.html`). This corrects the earlier note that claimed no guidelines exist.
- **Overlay grades depend on storybook under-rendering the fixed reference** (Modal/Sheet/Alert/Popover/Tooltip): the preview renders the real overlay while the storybook `?story=` capture of a fixed element is cropped — graded on the preview render per the §4 "reference is the artifact" rule. A storybook upgrade that changes how it frames fixed elements could shift these sheets.
- **`@storybook/react` pinned to 8.6.18** (exact) to satisfy pnpm strict resolution for the CSF `Meta`/`StoryObj` types.
- Story type-safety: controlled components carry no-op `onChange`/required props in `meta.args` so `StoryObj<typeof meta>` type-checks; root `tsconfig.declaration:false` (dts comes from tsup) avoids TS2742 portability errors.
