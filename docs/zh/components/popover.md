# Popover

一个锚定在触发器某一侧（四个方向之一）的浮动卡片。锚点保持在正常布局流中；卡片浮动在一个可获得焦点的 `Popup` 中，因此点击外部或按 Escape 即可关闭。适用于附着在控件上的轻量上下文内容（详情、小型表单）。

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismPopover
import io.github.heartcoolman.prism.ui.PrismPopoverPlacement
```

## Basic usage

末尾的 lambda 是 `anchor`；当 `open` 为 true 时 `content` 浮动显示。

```kotlin
var open by remember { mutableStateOf(false) }

PrismPopover(
    open = open,
    onClose = { open = false },
    content = { Text("Popover body") },
) {
    PrismButton(onClick = { open = true }) { Text("Open") }
}
```

## Placement

选择卡片位于锚点的哪一侧。交叉轴方向居中对齐。

```kotlin
PrismPopover(
    open = open,
    onClose = { open = false },
    placement = PrismPopoverPlacement.Right,
    content = { Text("To the right") },
) {
    PrismButton(onClick = { open = true }) { Text("Anchor") }
}
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `open` | `Boolean` | — | 浮动卡片是否显示。 |
| `onClose` | `() -> Unit` | — | 点击外部或按 Escape 时调用。 |
| `content` | `@Composable () -> Unit` | — | 在浮动卡片内渲染的正文。 |
| `modifier` | `Modifier` | `Modifier` | 应用于锚点包装盒的 Modifier。 |
| `placement` | `PrismPopoverPlacement` | `PrismPopoverPlacement.Bottom` | 卡片所在的锚点侧。 |
| `anchor` | `@Composable () -> Unit` | — | 卡片所指向的触发元素（保持在布局流中）。 |

### PrismPopoverPlacement

```kotlin
enum class PrismPopoverPlacement { Top, Bottom, Left, Right }
```
