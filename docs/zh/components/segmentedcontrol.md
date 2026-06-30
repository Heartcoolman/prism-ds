# SegmentedControl

iOS 风格的单选控件——一组等宽分段位于三级填充（tertiary-fill）轨道之上。选中的分段会浮起到一个 `bg` 胶囊上。用于一小组互斥选项。受控。

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismSegmentedControl
import io.github.heartcoolman.prism.ui.PrismSegmentedOption
```

## 基本用法

```kotlin
var value by remember { mutableStateOf("day") }

PrismSegmentedControl(
    options = listOf(
        PrismSegmentedOption("day", "Day"),
        PrismSegmentedOption("week", "Week"),
    ),
    value = value,
    onChange = { value = it },
)
```

## 尺寸

`size` 选择控件高度：`Small`（脚注文本）或 `Medium`（副标题文本，默认）。

```kotlin
PrismSegmentedControl(
    options = options,
    value = value,
    onChange = { value = it },
    size = PrismSegmentedSize.Small,
)
```

## 全宽

`fullWidth` 会将控件拉伸以填满其容器；每个分段平均分摊宽度。

```kotlin
PrismSegmentedControl(
    options = options,
    value = value,
    onChange = { value = it },
    fullWidth = true,
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `options` | `List<PrismSegmentedOption>` | — | 按顺序渲染的分段。 |
| `value` | `String` | — | 当前选中的值（受控）。 |
| `onChange` | `(String) -> Unit` | — | 触发时携带被点击分段的值。 |
| `modifier` | `Modifier` | `Modifier` | 轨道的布局 Modifier。 |
| `size` | `PrismSegmentedSize` | `PrismSegmentedSize.Medium` | 控件高度。 |
| `fullWidth` | `Boolean` | `false` | 将控件拉伸以填满其容器宽度。 |

### PrismSegmentedSize

`PrismSegmentedSize.Small` · `PrismSegmentedSize.Medium`

### PrismSegmentedOption

| 字段 | 类型 | 说明 |
|---|---|---|
| `value` | `String` | 选中时发出的唯一值。 |
| `label` | `String` | 可见的分段文本。 |
