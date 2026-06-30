# Disclosure

一种折叠面板，其摘要行用于切换下方的内容区域。尾部的 chevron 会旋转 90 度，内容区域则对高度进行动画过渡。支持非受控（`defaultOpen`）或受控（`open` + `onToggle`）两种用法。用它来渐进式地展开次要细节。

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismDisclosure
```

## Basic usage

非受控——组件自行跟踪其展开状态。

```kotlin
PrismDisclosure(title = "Details") {
    Text("Collapsible content.")
}
```

## Default open

使用 `defaultOpen` 让面板初始即展开，同时保持非受控。

```kotlin
PrismDisclosure(title = "Details", defaultOpen = true) {
    Text("Visible on first render.")
}
```

## Controlled

通过 `open` + `onToggle` 自行驱动展开状态。

```kotlin
var open by remember { mutableStateOf(false) }

PrismDisclosure(
    title = "Details",
    open = open,
    onToggle = { open = it },
) {
    Text("State owned by the caller.")
}
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `title` | `String` | — | 显示在 chevron 旁的摘要行标签。 |
| `modifier` | `Modifier` | `Modifier` | 应用于根列的 Modifier。 |
| `defaultOpen` | `Boolean` | `false` | 非受控用法下的初始展开状态。 |
| `open` | `Boolean?` | `null` | 受控展开状态；需与 `onToggle` 配合使用。 |
| `onToggle` | `((Boolean) -> Unit)?` | `null` | 当摘要行被激活时，以下一个展开状态为参数调用。 |
| `content` | `@Composable ColumnScope.() -> Unit` | — | 展开时渲染在摘要行下方的内容。 |
