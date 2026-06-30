# Modal

居中的对话框卡片，覆盖在变暗的遮罩层之上，映射到底层的 `Dialog`。在返回/Escape 以及点击遮罩层时关闭（当 `dismissOnScrim` 为 true 时）。适用于需要标题、正文以及一到两个操作的聚焦型任务。`actions` 插槽是一个 `RowScope`，因此调用方可以使用 `Modifier.weight(1f)` 来填满整行。

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismModal
```

## Basic usage

```kotlin
var open by remember { mutableStateOf(false) }

PrismButton(onClick = { open = true }) { Text("Open") }

PrismModal(
    open = open,
    onClose = { open = false },
    title = "Modal",
    actions = {
        PrismButton(onClick = { open = false }) { Text("OK") }
    },
    content = { Text("Modal body") },
)
```

## Two actions

`actions` lambda 运行在 `RowScope` 中；为每个按钮设置 weight 以平分整行。

```kotlin
PrismModal(
    open = open,
    onClose = { open = false },
    title = "Save changes?",
    content = { Text("Your edits will be kept.") },
    actions = {
        PrismButton(
            variant = PrismButtonVariant.Gray,
            onClick = { open = false },
            modifier = Modifier.weight(1f),
        ) { Text("Cancel") }
        PrismButton(
            onClick = { open = false },
            modifier = Modifier.weight(1f),
        ) { Text("Save") }
    },
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `open` | `Boolean` | — | 弹窗是否可见；为 `false` 时不渲染任何内容。 |
| `onClose` | `() -> Unit` | — | 在返回/Escape 以及点击遮罩层时调用（当 `dismissOnScrim` 为 true 时）。 |
| `modifier` | `Modifier` | `Modifier` | 应用于对话框卡片 `Surface` 的 Modifier。 |
| `title` | `String?` | `null` | 显示在正文上方的可选标题。 |
| `dismissOnScrim` | `Boolean` | `true` | 点击卡片外的遮罩层时关闭。 |
| `actions` | `(@Composable RowScope.() -> Unit)?` | `null` | 操作行，通常为一到两个按钮。 |
| `content` | `(@Composable () -> Unit)?` | `null` | 对话框正文内容。 |
