# ThemeProvider

主题的根入口。`PrismTheme` 提供所有 Prism 设计令牌（颜色、排版、间距、圆角、阴影高度、动效、材质）以及一个 Material3 基础层，使所有 Prism 与 Material3 控件都能正确解析。请用它包裹你的应用（或任意渲染的子树）。令牌详情与品牌覆盖请参见 [Styling](/zh/styling)。

## 导入

```kotlin
import io.github.heartcoolman.prism.core.PrismTheme
```

## 基本用法

默认情况下，它跟随系统的深色/浅色设置，并使用 Apple 品牌。

```kotlin
PrismTheme {
    // Tokens are now available: PrismTheme.colors.accent, PrismTheme.spacing.s4, …
    App()
}
```

## 配色方案

使用 `colorScheme` 强制指定某种方案。

```kotlin
import io.github.heartcoolman.prism.core.tokens.PrismColorScheme

PrismTheme(colorScheme = PrismColorScheme.Dark) {
    App()
}
```

## 品牌覆盖

传入 `PrismBrand` 可覆盖强调色、状态颜色以及圆角几何。默认值为 `appleBrand`。

```kotlin
import io.github.heartcoolman.prism.core.tokens.appleBrand

PrismTheme(brand = appleBrand) {
    App()
}
```

## 读取令牌

在 `PrismTheme` 下的任意 composable 中，可从 `PrismTheme` 对象读取令牌：

```kotlin
Text("Title", style = PrismTheme.typography.largeTitle, color = PrismTheme.colors.accent)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `colorScheme` | `PrismColorScheme` | `if (isSystemInDarkTheme()) PrismColorScheme.Dark else PrismColorScheme.Light` | 子树使用的浅色或深色配色方案。 |
| `brand` | `PrismBrand` | `appleBrand` | 用于强调色/状态颜色与圆角几何的品牌覆盖。 |
| `content` | `@Composable () -> Unit` | — | 应用主题的子树。 |

### `PrismColorScheme`

| 值 | 说明 |
|---|---|
| `Light` | 浅色配色方案。 |
| `Dark` | 深色配色方案。 |

> `PrismTheme` 还暴露了令牌访问器对象 `PrismTheme.*`（`colors`、`typography`、`spacing`、`radius`、`elevation`、`motion`、`dimensions`、`materials`）。参见 [Styling](/zh/styling)。
