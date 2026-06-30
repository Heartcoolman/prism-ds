# Alert

用于单一决策的居中确认对话框，映射到 Material 3 `AlertDialog`：包含标题、可选的消息文本以及取消 + 确认操作。当 `destructive` 为 true 时，确认操作会变为 `danger` 配色；`stacked` 会将两个操作垂直排列而非并排。

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismAlert
```

## Basic usage

```kotlin
var open by remember { mutableStateOf(false) }

PrismButton(onClick = { open = true }) { Text("Delete") }

PrismAlert(
    open = open,
    onClose = { open = false },
    title = "Delete?",
    message = "This cannot be undone.",
    destructive = true,
    onConfirm = { open = false },
)
```

## Stacked actions

`stacked` 会将取消按钮置于确认按钮之上，垂直成列排列。

```kotlin
PrismAlert(
    open = open,
    onClose = { open = false },
    title = "Sign out?",
    confirmLabel = "Sign out",
    cancelLabel = "Stay",
    stacked = true,
    onConfirm = { open = false },
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `open` | `Boolean` | — | 提示框是否可见；为 `false` 时不渲染任何内容。 |
| `onClose` | `() -> Unit` | — | 在取消、遮罩关闭或 Escape 时触发。 |
| `title` | `String` | — | 决策的主标题。 |
| `modifier` | `Modifier` | `Modifier` | 应用于对话框的 Modifier。 |
| `message` | `String?` | `null` | 标题下方的可选辅助文本。 |
| `confirmLabel` | `String` | `"确认"` | 确认按钮的标签。 |
| `cancelLabel` | `String` | `"取消"` | 取消按钮的标签。 |
| `destructive` | `Boolean` | `false` | 将确认操作着色为破坏性（danger）。 |
| `stacked` | `Boolean` | `false` | 垂直堆叠按钮（取消按钮在确认按钮之上）。 |
| `onConfirm` | `() -> Unit` | `{}` | 按下确认按钮时触发。 |
