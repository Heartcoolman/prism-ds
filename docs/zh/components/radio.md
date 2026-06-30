# Radio

单个圆形选择控件。使用 `PrismRadio` 表示独立选项，或使用 `PrismRadioGroup` 表示受管理的单选集合。

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismRadio
import io.github.heartcoolman.prism.ui.PrismRadioGroup
import io.github.heartcoolman.prism.ui.PrismRadioOption
import io.github.heartcoolman.prism.ui.PrismRadioOrientation
```

## 基本用法

```kotlin
var selected by remember { mutableStateOf(false) }

PrismRadio(
    selected = selected,
    onClick = { selected = !selected },
    label = "Radio",
)
```

## 单选组

`PrismRadioGroup` 在 `options` 之间管理选中的 `value`，并通过 `onValueChange` 报告新选中的值。

```kotlin
var value by remember { mutableStateOf("a") }

PrismRadioGroup(
    value = value,
    onValueChange = { value = it },
    options = listOf(
        PrismRadioOption(value = "a", label = "Option A"),
        PrismRadioOption(value = "b", label = "Option B"),
    ),
)
```

## 排列方向

```kotlin
PrismRadioGroup(
    value = value,
    onValueChange = { value = it },
    options = options,
    orientation = PrismRadioOrientation.Horizontal,
)
```

## API

### `PrismRadio`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `selected` | `Boolean` | — | 此控件是否被选中。 |
| `onClick` | `() -> Unit` | — | 当控件（或其所在行）被激活时触发。 |
| `modifier` | `Modifier` | `Modifier` | 应用于控件的 Modifier（设置 `label` 时则应用于整行）。 |
| `enabled` | `Boolean` | `true` | 控件是否接受输入。 |
| `label` | `String?` | `null` | 控件旁的可选文本；使整行都可选。 |

### `PrismRadioGroup`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `value` | `String` | — | 当前选中的选项值（受控）。 |
| `onValueChange` | `(String) -> Unit` | — | 以新选中的值触发。 |
| `options` | `List<PrismRadioOption>` | — | 要渲染的选项，按顺序排列。 |
| `modifier` | `Modifier` | `Modifier` | 应用于组容器的 Modifier。 |
| `enabled` | `Boolean` | `true` | 禁用每个选项（与各选项自身的 `enabled` 组合生效）。 |
| `orientation` | `PrismRadioOrientation` | `PrismRadioOrientation.Vertical` | 将各行垂直堆叠，或并排排列。 |

### `PrismRadioOption`

| 字段 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `value` | `String` | — | 选中此选项时报告的值。 |
| `label` | `String` | — | 可见标签。 |
| `enabled` | `Boolean` | `true` | 禁用这单个选项。 |

### `PrismRadioOrientation`

| 值 | 说明 |
|---|---|
| `Vertical` | 将选项堆叠成一列（默认）。 |
| `Horizontal` | 将选项排成一行。 |

> 假定外层存在 `PrismTheme { }`。选中色为 `PrismTheme.colors.accent`。
