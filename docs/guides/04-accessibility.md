# Accessibility

Accessibility is a baseline, not an add-on. Meet contrast, hit area, dynamic type, and clear focus indication.

## Contrast

- Body text minimum **4.5:1**; large text **3:1**.
- ✓ Pass — readable text at ~7:1. ✕ Fail — light gray on gray at ~1.6:1.

## Hit area

- Minimum touch target **44×44 pt**. Pointer targets may shrink to ~28; touch environments never depend on hover.

## Dynamic Type

Layout reflows as the font size grows (buttons wrap, icon and text stack vertically) — text is never truncated or clipped. Use relative units and avoid fixed-height containers.

| Body size | px |
|---|---|
| Small | 14 |
| Default | 17 |
| Large | 23 |
| Accessibility XL | 31+ |

## Focus & motion

- **Focus ring** — keyboard focus must be clearly visible: offset 2px, contrast ≥ 3:1. In code: `:focus-visible { outline: 3px solid rgba(0,102,204,.4); outline-offset: 2px; }` (token `--focus-ring`).
- **Reduced motion** — honor the user's preference:

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

Every component passes three checks: **contrast, keyboard, screen reader.**
