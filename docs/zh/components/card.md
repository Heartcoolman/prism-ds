# Card

一个中性的内容表面，包含顶部媒体槽位（省略时显示占位符）、eyebrow/title/description 文本块、自由形式的主体内容以及可选的页脚。设置 `interactive` 或传入 `onClick` 可得到一个可点击、带抬升效果的卡片。用它把相关内容组合成一个可点按的单元。

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismCard
```

## Basic usage

使用文本块参数即可实现常见的 eyebrow / title / description 布局。

```kotlin
PrismCard(
    eyebrow = "DESIGN SYSTEM",
    title = "Prism Card",
    description = "Eyebrow + title + description slots.",
)
```

## Clickable card

传入 `onClick`（或设置 `interactive = true`）可得到一个带抬升效果、可点按的卡片。你也可以在 `content` 内部组合这些文本块辅助函数。

```kotlin
PrismCard(onClick = {}) {
    PrismCardEyebrow("DESIGN SYSTEM")
    PrismCardTitle("Prism Card")
    PrismCardDescription("Eyebrow + title + description slots.")
}
```

## Media and footer

提供一个 `media` 槽位（以 16:9 渲染）和一个用于放置操作的 `footer`。

```kotlin
PrismCard(
    media = { PrismImage() },
    title = "With media",
    description = "Top media slot plus a footer row.",
    footer = { PrismButton(onClick = {}) { Text("Open") } },
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | 应用于卡片表面的 Modifier。 |
| `media` | `(@Composable () -> Unit)?` | `null` | 顶部媒体槽位（16:9）。省略时显示带色调的占位符。 |
| `eyebrow` | `String?` | `null` | 标题上方的小号 overline 文本。 |
| `title` | `String?` | `null` | 醒目的卡片标题。 |
| `description` | `String?` | `null` | 一到两行的辅助描述。 |
| `footer` | `(@Composable () -> Unit)?` | `null` | 用于放置操作或链接的页脚槽位。 |
| `interactive` | `Boolean` | `false` | 为可点击卡片添加悬停抬升（elevation）效果。 |
| `onClick` | `(() -> Unit)?` | `null` | 使整张卡片可点击并带抬升效果。 |
| `content` | `@Composable ColumnScope.() -> Unit` | `{}` | 渲染在文本块与页脚之间的自由形式主体内容。 |

### Text-block helpers

用于在 `content` 内手动构建卡片主体的独立 composable。

```kotlin
@Composable fun PrismCardEyebrow(text: String)
@Composable fun PrismCardTitle(text: String)
@Composable fun PrismCardDescription(text: String)
```
