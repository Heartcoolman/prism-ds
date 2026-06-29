# Foundations — Prism Design Language (Apple-inspired default theme)

## Principles

Three principles run through the whole system. When a design decision is contested, return here.

- **Clarity (清晰)** — Text is legible, icons are precise, whitespace is ample. Function emerges from form; it doesn't rely on decoration.
- **Deference (克制)** — The interface steps back so content leads. Restrained color, light effects — never competing with content for attention.
- **Depth (层次)** — Layering, transitions, and real motion build a sense of space that helps users understand structure and keep context.

## Design tokens

Tokens have three layers; interfaces reference only the semantic and component layers, so re-theming and dark mode change in one place.

1. **Primitive** — concrete values: `blue-600 = #0066CC`
2. **Semantic** — named by intent: `color.accent → blue-600`
3. **Component** — bound to a component: `button.bg → color.accent`

In code, tokens are CSS variables (`var(--color-accent)`, `var(--s-4)`, `var(--radius-card)`). Never hard-code raw values.

## Color

Neutral grays carry ~95% of the interface. Color is reserved for key actions, status, and brand moments — **no more than one accent color per screen**.

**Neutral scale**

| Token | Value | | Token | Value |
|---|---|---|---|---|
| Gray 0 | `#FFFFFF` | | Gray 400 | `#86868B` |
| Gray 50 | `#F5F5F7` | | Gray 500 | `#6E6E73` |
| Gray 100 | `#E8E8ED` | | Gray 600 | `#424245` |
| Gray 200 | `#D2D2D7` | | Gray 800 | `#1D1D1F` |
| Gray 300 | `#AEAEB2` | | Gray 900 | `#000000` |

**System colors (use sparingly)** — Blue `#0066CC` (primary), Green `#1D8A4E` (success), Orange `#C2410C` (warning), Red `#C5283D` (danger).

**Semantic tokens** — `--label-primary:#1d1d1f`, `--label-secondary:#6e6e73`, `--label-tertiary:#86868b`, `--color-accent:#0066cc`.

- ✓ **DO** — Build hierarchy with neutral grays; save the accent blue for the single most important action on a page. Status colors appear briefly, only when needed.
- ✕ **DON'T** — Don't stack multiple colored buttons on one screen, and don't flood large backgrounds with saturated color — color loses its signaling power.

## Typography

Use the system font (SF Pro / PingFang SC). Sizes step in a scale; large titles tighten tracking, body loosens line-height. Latin and CJK share one ladder.

| Style | Size / Weight / Tracking·Leading |
|---|---|
| Large Title | 34 / 700 / −0.02em |
| Title 1 | 28 / 640 / −0.015em |
| Title 2 | 22 / 600 / 0 |
| Headline | 17 / 600 |
| Body | 17 / 400 / line-height 1.5 |
| Subhead | 15 / 400 / 1.45 |
| Footnote / Caption | 13 / 400 / 1.4 |

Font stack: `-apple-system, "SF Pro Text", "PingFang SC", system-ui, sans-serif`.

- ✓ **DO** — At most three sizes per screen to build hierarchy; body line length 45–75 characters, line-height 1.5.
- ✕ **DON'T** — Don't set body text in pure black `#000`; don't center long paragraphs; don't go below 13px for body.

## Spacing & grid

All spacing is a multiple of 4, with 8 as the base rhythm. The more related two elements are, the smaller the gap; leave larger breathing room between groups.

| Token | px | Use |
|---|---|---|
| `--s-1` | 4 | tight — icon ↔ text |
| `--s-2` | 8 | base rhythm |
| `--s-3` | 12 | field padding |
| `--s-4` | 16 | card padding, list rows |
| `--s-5` | 24 | between components |
| `--s-6` | 32 | groups within a block |
| `--s-7` | 64 | between major blocks |

**Layout grid** — flexible 12-column, 24 gutter. Prefer `gap` over `margin`. Content main column caps at ~720px; beyond that, whitespace grows rather than stretching the line.

## Responsive breakpoints

| Breakpoint | Width | Columns | Margin |
|---|---|---|---|
| Compact | < 600 | 4 | 16 |
| Regular | 600–1024 | 8 | 24 |
| Large | ≥ 1024 | 12 | ≥ 40 |

Columns and margins grow with width; the readable content column stays bounded, and layouts always avoid safe areas and notches.

## Elevation

A single shadow ladder expresses height. Shadows are soft, low-opacity, slightly cool; higher levels sit closer to the user with larger, more diffuse shadows.

| Token | Value | Level |
|---|---|---|
| `--shadow-1` | `0 1px 2px rgba(0,0,0,.06)` | cards |
| `--shadow-2` | `0 4px 12px rgba(0,0,0,.08)` | dropdowns, raised cards |
| `--shadow-3` | `0 12px 32px rgba(0,0,0,.12)` | popovers, sheets |
| `--shadow-4` | `0 24px 60px rgba(0,0,0,.18)` | modals |

## Dark mode

Dark mode is not a simple inversion. Use near-black instead of pure black for backgrounds, express height with layered elevation, and brighten the accent slightly to hold contrast.

| | Background | Layer | Label | Accent |
|---|---|---|---|---|
| Light | `#FFFFFF` | `#F5F5F7` | `#1D1D1F` | `#0066CC` |
| Dark | `#000000` | `#1C1C1E` | `#F5F5F7` | `#3393FF` |

The same-named tokens flip with `[data-theme="dark"]` and `prefers-color-scheme`.
