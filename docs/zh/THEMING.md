# 主题

Prism 完全由三层 CSS 变量令牌驱动（原始值 → 语义 → 组件）。组件只引用语义/组件变量，因此重新设置主题时改动一处即可处处生效。

有三种设置主题的方式，从最简单到最全局。

## 1. `theme` 属性（针对子树）

向 `ThemeProvider` 传入一个 `Theme` 对象。每个字段映射到一个语义 CSS 变量，并作为**内联自定义属性**写在 provider 元素上，因此它作用于该子树。未设置的字段回退到默认预设。

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

### `Theme` 字段

| 字段 | CSS 变量 | 字段 | CSS 变量 |
|---|---|---|---|
| `accent` | `--color-accent` | `fontSans` | `--font-sans` |
| `accentHover` | `--color-accent-hover` | `fontMono` | `--font-mono` |
| `accentPressed` | `--color-accent-pressed` | `radiusPill` | `--radius-pill` |
| `success` | `--color-success` | `radiusCard` | `--radius-card` |
| `warning` | `--color-warning` | `radiusModal` | `--radius-modal` |
| `danger` | `--color-danger` | `radiusInput` | `--radius-input` |
| `focusRing` | `--focus-ring` | `radiusImage` | `--radius-image` |
| | | `radiusSm` | `--radius-sm` |

## 2. 预设

包内附带两个预设：

- **`apple`** — 默认的、Apple 风格的语言（与 `tokens.css` 一致）。
- **`neutral`** — 与品牌无关：靛蓝强调色、系统字体、几何化圆角。

```tsx
import { ThemeProvider, neutral } from "@prism-ds/react";

<ThemeProvider theme={neutral}>{/* … */}</ThemeProvider>;
```

如果你想自行应用这些变量，可使用导出的 `themeToVars(theme)`：

```tsx
import { themeToVars, neutral } from "@prism-ds/react";

<div style={themeToVars(neutral)}>{/* … */}</div>;
```

## 3. 全局 CSS 覆盖

要实现应用级别的品牌，请在你自己的样式表中（在 `@prism-ds/react/styles.css` 之后加载）重新定义语义变量。这是最全局的方式，且无需 provider 属性。

```css
:root {
  --color-accent: #7c3aed;
  --radius-card: 12px;
  --font-sans: "Inter", system-ui, sans-serif;
}
```

## 配色方案 vs. 主题

`colorScheme="light" | "dark"` 通过 `[data-theme]` 属性切换浅色/深色；深色模式也会跟随 `prefers-color-scheme`。这与品牌 `theme` 相互独立。

> **特异性注意事项。** `theme` 值是内联样式，其优先级高于 `[data-theme="dark"]` 选择器。因此品牌 `accent`（或任何被设主题的变量）会同时应用于**浅色和深色**——该变量的深色模式切换不会生效。如果你需要每种方案使用不同的强调色，可以渲染两个 `ThemeProvider`（每种方案一个）并配以特定于方案的 `theme` 对象，或者在你自己的 `[data-theme="dark"]` 块内通过 CSS（方式 3）全局设置覆盖，而非使用 `theme` 属性。
