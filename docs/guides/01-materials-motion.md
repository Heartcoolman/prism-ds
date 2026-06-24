# Materials, Motion, Icons & Imagery

## Materials & radius

Translucent blur materials layer the interface without hiding content; continuous corner radii and concentric rules keep shapes soft and consistent.

**Blur materials** — the material thickens with elevation. Layer `saturate` on top to keep background color vibrant.

| Material | Blur | Use |
|---|---|---|
| Ultra Thin | 8 | subtle overlays |
| Thin | 16 | popovers |
| Regular | 24 | navigation bars |
| Thick | 40 | bottom sheets |

`backdrop-filter: saturate(180%) blur(<n>px)`. → component **`Material`** (`thickness="ultraThin|thin|regular|thick"`).

**Progressive blur** — blur strength ramps smoothly in one direction so content dissolves into the edge of a bar rather than ending on a hard line. Common on bottom tab bars and top nav. → `Material` with `progressive`.

**Radius** — `--radius-pill` 980 (buttons), `--radius-card` 18, `--radius-modal`/`--radius-sheet` 20, `--radius-input`/`--radius-inner` 10, `--radius-image` 14. Concentric rule: inner radius = outer radius − padding.

## Liquid Glass (2025)

A translucent dynamic material with real-time refraction and specular highlights; it picks up the color and light of content behind it, so floating controls read like a sheet of flowing glass above the UI. → component **`LiquidGlass`**.

**Anatomy**

- **Translucency** — white α `0.12 → 0.34` (gradient)
- **Blur + recolor** — `blur(8px) saturate(180%) brightness(1.06)`
- **Specular highlight** — `inset 0 1px 0 rgba(255,255,255,.9)`
- **Edge + shadow** — 1px bright inner edge · soft drop shadow `0 14px 44px`

- ✓ **DO** — Use only for floating control layers (nav, toolbars, popovers); ensure text contrast on the glass meets the bar; add a dimming underlay when needed.
- ✕ **DON'T** — No glass on glass; no full-screen glass (it loses hierarchy); no low-contrast text on glass.

## Motion

Motion has purpose: it explains where things come from and go, and keeps context. Curves favor ease-out; durations are short.

| Curve | cubic-bezier | Duration | Use |
|---|---|---|---|
| Standard | `.4, 0, .2, 1` | 300ms | in-page transitions |
| Enter | `0, 0, .2, 1` | 250ms | elements appearing (ease-out) |
| Exit | `.4, 0, 1, 1` | 200ms | elements leaving (ease-in) |
| Emphasized | `.2, 0, 0, 1` | 500ms | modals, large displacement |

Tokens: `--ease-standard`, `--ease-enter`, `--ease-exit`, `--ease-emphasized`; `--dur-*`.

- ✓ **DO** — Short, eased-out, directional; respect "reduce motion" and provide a degraded path.
- ✕ **DON'T** — No linear easing, no everyday transition over 500ms, no motion for motion's sake.

## Icons

Unified stroke width, visual weight, and corner radius. Icons are drawn on a 24×24 keyline grid with 2px strokes and rounded caps — consistent across platforms, no emoji.

- **Keyline grid** — all icons composed within 24×24, aligned to circle / square / horizontal & vertical rectangle keylines for consistent optical mass.
- **Optical sizes** — a size ladder; stroke width stays optically consistent across sizes.
- ✓ **DO** — Uniform stroke and radius, optically center to the grid, consistent visual weight.
- ✕ **DON'T** — Don't mix stroke and fill in one set; don't scale arbitrarily so stroke widths drift.

In components, icons are inline SVG: `viewBox="0 0 24 24"`, `stroke="currentColor"`, `stroke-width="2"`, round caps/joins.

## Imagery

Real, restrained, consistent light. Prefer photography over illustration. Fixed ratios and radii; ensure contrast when text overlays.

- **Ratios** — 16:9 (hero) / 4:3 / 1:1 / 3:4
- **Radius** — 12–16, in harmony with cards
- **Overlay** — add a ~40% gradient scrim under overlaid text
- ✓ **DO** — Uniform lighting and color temperature, subject centered with breathing room, visual consistency across pages.
- ✕ **DON'T** — Don't mix stylistically different assets, don't over-filter, don't press dark text onto a low-contrast image.
