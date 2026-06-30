# Skeleton

内容加载时显示的脉动占位符。用它来预留布局空间并提示加载状态，而无需使用 spinner。它纯粹用于装饰，会被辅助技术跳过。

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismSkeleton
```

## 基本用法

```kotlin
PrismSkeleton(lines = 3)
```

## 变体

`Text` 渲染 `lines` 条横条（多行时最后一条收窄到 60%）。`Rect` 和 `Circle` 使用你提供的显式 `width`/`height`；对于 `Circle`，直径为 `width ?: height`。

```kotlin
// Multi-line text block
PrismSkeleton(variant = PrismSkeletonVariant.Text, lines = 3)

// Rectangle (e.g. an image placeholder)
PrismSkeleton(variant = PrismSkeletonVariant.Rect, width = 200.dp, height = 120.dp)

// Circle (e.g. an avatar placeholder)
PrismSkeleton(variant = PrismSkeletonVariant.Circle, width = 48.dp)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | 应用于占位符的布局 modifier。 |
| `variant` | `PrismSkeletonVariant` | `PrismSkeletonVariant.Text` | 占位符形状。 |
| `width` | `Dp?` | `null` | `Rect` 的显式宽度；`Circle` 的直径。`Text` 会填满可用宽度。 |
| `height` | `Dp` | `16.dp` | `Rect` 的高度；`Circle` 的回退直径。 |
| `lines` | `Int` | `1` | `Text` 变体堆叠横条的数量。 |

### PrismSkeletonVariant

```kotlin
enum class PrismSkeletonVariant { Text, Rect, Circle }
```
