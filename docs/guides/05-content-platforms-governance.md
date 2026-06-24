# Brand, Content, Platforms & Governance

## Brand & voice

Give the logo ample clear space; compose the app icon on a unified grid. The voice is restrained, confident, human — like a knowledgeable friend helping you.

- **Logo** — clear space ≥ ½ the logo height on all sides.
- **App icon** — continuous-corner squircle; subject centered, ~60% of the grid.
- **Voice** — Clear (say the point, don't meander) · Confident (affirmative, neither meek nor arrogant) · Friendly (a knowledgeable friend, not stiff).
- **Preferred** — "登录", "删除", "出错了,稍后再试". **Avoid** — "立即登陆", "销毁", "未知错误 0x5".

## Content

Copy is part of the interface. Buttons start with a verb; titles use sentence case; numbers, dates, and currency follow one format.

- **Capitalization** — "Save changes" (sentence case), not Title Case.
- **Date** — "2026年6月24日" (localized, unambiguous).
- **Number** — "¥ 1,280.00" (thousands separators, tabular figures aligned).
- Prefer "保存" over "点击此处以保存你的更改"; "无法连接,请稍后再试" over "发生未知错误".

## Localization & RTL

Leave room for text expansion (German can be ~1.5× longer); mirror the whole layout in Arabic and Hebrew. Never bake text into images.

- LTR ↔ RTL: layouts mirror (EN "Settings" / DE "Einstellungen" / JA "設定" / AR "الإعدادات").
- The same label varies widely in width across languages — use flexible widths for buttons and containers, never fixed.

## Platforms

One design language, adapted per context. Phone is single-column and vertical; tablet uses split views; desktop is windowed with pointer hover. Control sizes adjust to input method (touch vs pointer).

- **Phone** — single column · tab bar · touch 44pt.
- **Tablet** — sidebar · split view · multitasking.
- **Desktop** — windows · pointer hover · denser.
- Touch targets ≥ 44pt; pointer targets may shrink to ~28. Provide hover states for pointer; never depend on hover for touch.

## Implementation

Tokens are the single source of truth between design and code. One set of tokens generates CSS variables and native constants; component APIs are clearly named and safe by default.

```css
.btn {
  background: var(--color-accent);
  border-radius: var(--radius-pill);
  min-height: var(--size-touch);
}
```

- **Prop API** — `variant: filled|tinted|gray|plain`, `size: small|medium|large`, `disabled: bool` (default false).
- **Performance** — first paint < 1s, animations steady at 60fps, avoid large real-time blur areas.
- **Quality baseline** — every component passes contrast, keyboard, and screen-reader checks.
- **Naming** — semantic (`accent`) over literal (`blue`), so re-theming is one change.

## Governance

The system is a living product. Semantic versioning, a public changelog, and a clear contribution flow keep the team aligned.

- **Status** — Stable · Beta · Deprecated.
- **Versioning** — major = breaking, minor = additive, patch = fixes. Deprecated components live at least one minor cycle and document their replacement.
