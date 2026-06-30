# 主题

Prism 的主题是一组 `@Immutable` 令牌表，通过 `CompositionLocal` 暴露，并经由 `PrismTheme` 对象访问。它遵循 Compose 推荐的[自定义设计系统](https://developer.android.com/develop/ui/compose/designsystems/custom)模式——而非对 Material 自身主题的分叉。

## PrismTheme

```kotlin
@Composable
fun PrismTheme(
    colorScheme: PrismColorScheme = if (isSystemInDarkTheme()) PrismColorScheme.Dark else PrismColorScheme.Light,
    brand: PrismBrand = appleBrand,
    content: @Composable () -> Unit,
)
```

它做两件事：

1. **提供 Prism 令牌** — `LocalPrismColors`、`LocalPrismTypography`、`LocalPrismSpacing`、`LocalPrismRadius`、`LocalPrismElevation`、`LocalPrismMotion`、`LocalPrismDimensions`、`LocalPrismMaterials`。
2. **映射到 Material 3** — 将 Prism 颜色转换为一个 `ColorScheme`，从而让 Material 3 控件（`Switch`、`OutlinedTextField`、`NavigationBar` 等）自动继承品牌。

## 读取令牌

```kotlin
@Composable
fun Price(text: String) {
    Text(
        text = text,
        style = PrismTheme.typography.headline,
        color = PrismTheme.colors.accent,
        modifier = Modifier.padding(PrismTheme.spacing.s3),
    )
}
```

| 访问器 | 包含内容 |
|---|---|
| `PrismTheme.colors` | 26 个语义颜色（`accent`、`bg`、`labelPrimary`、`separator`、`tint*Bg`、`materialBg`、`focusRing` 等） |
| `PrismTheme.typography` | `largeTitle` · `title1` · `title2` · `headline` · `body` · `subhead` · `footnote` |
| `PrismTheme.spacing` | `s1`…`s7`（基于 4，8pt 节奏） |
| `PrismTheme.radius` | `pill` · `card` · `modal` · `sheet` · `input` · `inner` · `image` · `sm` |
| `PrismTheme.elevation` | `level1`…`level4` · `card` |
| `PrismTheme.motion` | 缓动（`easeStandard` 等）+ 时长（`durStandard` 等） |
| `PrismTheme.dimensions` | 控件高度、触摸目标、聚焦环宽度 |
| `PrismTheme.materials` | 模糊半径（`blurThin` · `blurRegular` · `blurThick`） |

## 浅色与深色

`PrismTheme` 默认通过 `isSystemInDarkTheme()` 跟随系统设置。使用 `colorScheme` 参数可强制指定某种方案。两种方案之间仅颜色不同——间距、圆角、字体和动效是共享的。

## 品牌预设

```kotlin
PrismTheme(brand = appleBrand)    { … }   // the default Apple-inspired look
PrismTheme(brand = neutralBrand)  { … }   // calm indigo, tighter geometry
```

`PrismBrand` 在基础方案之上覆盖强调色 + 状态色以及圆角几何——相当于 Web 中 `ThemeProvider` 的 `theme` 属性的 Compose 对应物。通过构造一个 `PrismBrand` 来打造你自己的品牌。

## 单一令牌来源

令牌的**值**由单一真相来源——`tokens/prism-tokens.json`——经 `tokens/build-tokens.mjs` 生成，它**同时**输出：

- Web 的 CSS 自定义属性（`src/styles/tokens.css`），以及
- Kotlin 令牌数据类（`PrismGeneratedTokens.kt`）。

一致性检查会断言生成的 CSS 与生产环境的 Web CSS 值完全一致（107 个令牌），因此 Web 与 Compose 永远不会发生偏离。Web 侧请参阅 [CSS 主题（Web）](THEMING.md)。
