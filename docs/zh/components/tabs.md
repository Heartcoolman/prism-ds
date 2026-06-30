# Tabs

下划线标签页——一行标签按钮位于 1px 分隔轨道之上。激活的标签会被强调（半粗体）并带有 2px 的强调色下划线。用于在屏幕内的同级视图间切换。受控。

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismTabs
import io.github.heartcoolman.prism.ui.PrismTabItem
```

## 基本用法

```kotlin
var value by remember { mutableStateOf("one") }

PrismTabs(
    tabs = listOf(
        PrismTabItem("one", "One"),
        PrismTabItem("two", "Two"),
    ),
    value = value,
    onChange = { value = it },
)
```

## 全宽

`fullWidth` 会将标签拉伸以平均分摊整行宽度；否则标签按内容大小排布。

```kotlin
PrismTabs(
    tabs = listOf(
        PrismTabItem("day", "Day"),
        PrismTabItem("week", "Week"),
        PrismTabItem("month", "Month"),
    ),
    value = value,
    onChange = { value = it },
    fullWidth = true,
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `tabs` | `List<PrismTabItem>` | — | 标签描述符，从左到右渲染。 |
| `value` | `String` | — | 当前选中标签的 `key`（受控）。 |
| `onChange` | `(String) -> Unit` | — | 激活时携带选中标签的 `key` 触发。 |
| `modifier` | `Modifier` | `Modifier` | 标签行的布局 Modifier。 |
| `fullWidth` | `Boolean` | `false` | 将标签拉伸以平均分摊整行宽度。 |

### PrismTabItem

| 字段 | 类型 | 说明 |
|---|---|---|
| `key` | `String` | 由 `onChange` 发出的稳定标识符。 |
| `label` | `String` | 可见的标签文本。 |
