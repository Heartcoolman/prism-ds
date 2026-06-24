# Apple-Style Design System — how to build with it

Build every screen from this library's React components, styled with its tokens. Keep the Apple idiom: restrained neutrals, **one accent per view**, pill / continuous radii, soft low shadows, 44px minimum touch targets, generous whitespace on an 8pt rhythm.

## Wrap the app

Wrap the tree (or any rendered design) in `AppleProvider` so typography, color and theme resolve. It applies the `.ads-root` base (system font, label color, background) and sets `data-theme`; dark mode also follows `prefers-color-scheme`.

```tsx
import { AppleProvider, Card, Button } from "apple-style-ds";

<AppleProvider theme="light">{/* theme="dark" for dark mode */}
  <Card eyebrow="类别" title="卡片标题" description="一到两行的说明文字。" />
  <Button variant="filled" tone="accent">继续</Button>
</AppleProvider>
```

Tokens are defined on `:root`, so `var(--*)` resolves anywhere; `AppleProvider` is what supplies the base typography context and dark-mode flip.

## Style with tokens — never hard-coded values

Every design value is a CSS variable (primitive → semantic → component). Reference these; do not write raw hex/px.

- **Color** — `var(--color-accent)`, `var(--color-danger)`, `var(--color-success)`, `var(--color-warning)`; text `var(--label-primary | --label-secondary | --label-tertiary | --label-quaternary)`; surfaces `var(--bg)`, `var(--bg-elevated)`, `var(--fill-secondary | --fill-tertiary)`; hairlines `var(--separator)`; tints `var(--tint-accent-bg | --tint-success-bg | --tint-warning-bg | --tint-danger-bg)`.
- **Type** — `font: var(--text-large-title | --text-title-1 | --text-title-2 | --text-headline | --text-body | --text-subhead | --text-footnote)`; family `var(--font-sans)`.
- **Space (4-based)** — `var(--s-1)`=4 · `--s-2`=8 · `--s-3`=12 · `--s-4`=16 · `--s-5`=24 · `--s-6`=32 · `--s-7`=64.
- **Radius** — `var(--radius-pill | --radius-card | --radius-modal | --radius-sheet | --radius-input | --radius-sm)`.
- **Elevation / motion / focus** — `var(--shadow-1 … --shadow-4)`, `var(--shadow-card)`; `var(--ease-standard | --ease-enter | --ease-exit | --ease-emphasized)` + `var(--dur-*)`; focus ring `var(--focus-ring)`.

## Layout / type utility classes (global — use for your own glue)

These are the ONLY global classes; component internals use scoped `ads-*` classes you never author yourself.

`.stack` (column, gap 16) · `.stack-sm` (gap 8) · `.stack-lg` (gap 24) · `.row` (center, gap 8) · `.text-large-title` · `.text-title-1` · `.text-title-2` · `.text-headline` · `.text-body` · `.text-subhead` · `.text-footnote` · `.text-secondary` · `.text-tertiary` · `.text-accent` · `.tabular-nums`

## Components — compose these, don't reinvent

- **Inputs** — Button, TextField, Textarea, SearchField, Checkbox, Radio / RadioGroup, Switch, Select, Slider, Stepper, SegmentedControl
- **Navigation** — NavBar, TabBar, Breadcrumb, Tabs, Menu, PageControl
- **Containers** — Card, List / ListRow, Disclosure
- **Overlays** — Modal, Sheet, Popover, Tooltip (controlled: `open` + `onClose`)
- **Feedback** — Toast, Banner, Alert, Badge, ProgressBar, Spinner, Skeleton
- **Data** — Table, Tag, Avatar / AvatarGroup, ProgressRing
- **Pickers** — DatePicker

Use `variant` for button/visual weight (`filled` is the single primary action per area), `tone="danger"` for destructive actions.

## Where the truth lives

Read `styles.css` (it `@import`s `_ds_bundle.css` — all tokens, utilities and component CSS) before styling. Each component's `*.prompt.md` and `*.d.ts` carry its exact API.
