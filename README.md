# Prism

**简体中文** · [English](./README.en.md)

> 📖 文档:<https://heartcoolman.github.io/prism-ds/> —— 同时提供 **Compose Multiplatform** 版本(Android / iOS / 桌面),见 [`prism-compose/`](./prism-compose/)。

一个可主题化的 **React + TypeScript** 设计系统。46 个组件完全由 CSS 变量 token 驱动(primitive → semantic → component)。Prism 内置 **Apple 风格默认主题** 与 **中性预设**——也可以传入你自己的品牌,所有组件一次性换肤。

## 安装

```bash
npm install @prism-ds/react
# 或:pnpm add @prism-ds/react
```

```bash
# 本仓库本地开发
pnpm install
pnpm build            # tsup -> dist/index.{js,cjs,d.ts} + dist/index.css
pnpm storybook        # 本地预览 :6006
pnpm build-storybook  # 静态 storybook -> storybook-static/
```

## 用法

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

## 主题

每一个与品牌相关的取值(强调色、状态色、字体、圆角、焦点环)都是带合理默认值的 CSS 变量。可通过 `theme` 属性按子树覆盖,或在你自己的 CSS 中重定义变量做全局覆盖。

```tsx
import { ThemeProvider, neutral, type Theme } from "@prism-ds/react";

// 使用内置预设……
<ThemeProvider theme={neutral}>{/* … */}</ThemeProvider>

// ……或提供你自己的品牌(未设置的字段回退到默认预设)。
const brand: Theme = {
  accent: "#7c3aed",
  fontSans: "Inter, system-ui, sans-serif",
  radiusCard: "12px",
};
<ThemeProvider theme={brand} colorScheme="dark">{/* … */}</ThemeProvider>
```

- **预设** —— 包内导出 `apple`(默认,Apple 风格)与 `neutral`(品牌无关、几何圆角、系统字体)。
- **`themeToVars(theme)`** —— 把一个 `Theme` 转换为内联 CSS 自定义属性,便于你自行应用。
- **配色方案** —— `colorScheme="light" | "dark"` 切换明暗;暗色模式同时跟随 `prefers-color-scheme`。(注意:`theme` 取值对明暗两套都生效——内联变量优先级高于暗色选择器。详见 `docs/THEMING.md`。)

## 约定

- **token 是唯一真源** —— CSS 变量在 `src/styles/tokens.css`(primitive → semantic → component)。引用 `var(--color-accent)`、`var(--s-4)`、`var(--radius-card)`,绝不写死值。
- **样式** —— 每个组件附带带作用域的 `prism-*` CSS;布局拼接用 `src/styles/global.css` 里的全局工具类(`.stack`、`.row`、`.text-headline`……)。
- **Provider** —— 用 `<ThemeProvider colorScheme="light|dark" theme={...}>` 包裹,以确立排版、配色方案与品牌。

## 许可证

MIT
