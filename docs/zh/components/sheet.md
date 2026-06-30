# Sheet

底部弹出面板：遮罩层使页面变暗，同时一个面板从底部边缘向上滑出，带有抓取手柄、可选标题以及可滚动内容。适用于不值得占用整屏的次要任务或上下文操作。关闭时不渲染任何内容；将它放在根 `Box` 的末尾，使其叠加在上层。

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismSheet
```

## Basic usage

```kotlin
var open by remember { mutableStateOf(false) }

Box(modifier = Modifier.fillMaxSize()) {
    PrismButton(onClick = { open = true }) { Text("Open sheet") }

    PrismSheet(
        open = open,
        onClose = { open = false },
        title = "Sheet",
    ) {
        Text("Sheet body")
    }
}
```

## Without a title

省略 `title`，即可得到一个只显示抓取手柄和内容的面板。

```kotlin
PrismSheet(open = open, onClose = { open = false }) {
    Text("Content with no headline")
}
```

## Disabling scrim dismissal

设置 `dismissOnScrim = false`，以要求通过明确的操作才能关闭（Escape/返回由宿主驱动）。

```kotlin
PrismSheet(
    open = open,
    onClose = { open = false },
    title = "Confirm",
    dismissOnScrim = false,
) {
    Text("Tap a button to dismiss")
}
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `open` | `Boolean` | — | 面板是否可见。为 `false` 时不渲染任何内容。 |
| `modifier` | `Modifier` | `Modifier` | 应用于全屏叠加层根容器的 Modifier。 |
| `onClose` | `() -> Unit` | `{}` | 用户请求关闭（点击遮罩层）时调用。 |
| `title` | `String?` | `null` | 显示在内容上方的可选标题。 |
| `dismissOnScrim` | `Boolean` | `true` | 允许通过点击遮罩层关闭。 |
| `content` | `@Composable ColumnScope.() -> Unit` | — | 面板正文内容，以可滚动列布局排列。 |
