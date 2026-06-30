# WheelPicker

滚筒/滚轮选择器：带有吸附居中惯性滚动的列表，居中的行为全不透明，相邻行则淡出并缩小。短列表使用单列形式，时/分/秒等复合值则使用多列形式。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=wheelpicker" loading="lazy" title="wheelpicker demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismWheelPicker
import io.github.heartcoolman.prism.ui.PrismWheelColumn
import io.github.heartcoolman.prism.ui.PrismWheelOption
```

## 基本用法（单列）

```kotlin
var index by remember { mutableStateOf(1) }

PrismWheelPicker(
    options = listOf("Sun", "Mon", "Tue", "Wed", "Thu"),
    selectedIndex = index,
    onSelectedChange = { index = it },
)
```

## 多列

传入 `columns` 可并排渲染多个滚轮。`onChange` 报告 `(columnIndex, value)`，其中 `value` 是稳定的 `PrismWheelOption.value`。

```kotlin
var hour by remember { mutableStateOf("09") }
var minute by remember { mutableStateOf("30") }

PrismWheelPicker(
    columns = listOf(
        PrismWheelColumn(
            options = (0..23).map { PrismWheelOption(label = "%02d".format(it), value = "%02d".format(it)) },
            value = hour,
        ),
        PrismWheelColumn(
            options = (0..59).map { PrismWheelOption(label = "%02d".format(it), value = "%02d".format(it)) },
            value = minute,
        ),
    ),
    onChange = { columnIndex, value ->
        if (columnIndex == 0) hour = value else minute = value
    },
)
```

## 尺寸

`visibleCount`（强制为奇数）设置显示的行数，`itemHeight` 设置每行的高度。

```kotlin
PrismWheelPicker(
    options = options,
    selectedIndex = index,
    onSelectedChange = { index = it },
    visibleCount = 7,
    itemHeight = 40.dp,
)
```

## API

### `PrismWheelPicker`（单列）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `options` | `List<String>` | — | 按顺序排列的行标签。 |
| `selectedIndex` | `Int` | — | 居中选项的索引（受控）。 |
| `onSelectedChange` | `(Int) -> Unit` | — | 滚轮停稳或点击某行时触发。 |
| `modifier` | `Modifier` | `Modifier` | 应用于该列的 Modifier。 |
| `visibleCount` | `Int` | `5` | 显示的行数；会强制为奇数。 |
| `itemHeight` | `Dp` | `36.dp` | 每行的高度。 |

### `PrismWheelPicker`（多列）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `columns` | `List<PrismWheelColumn>` | — | 一个或多个并排的滚轮。 |
| `onChange` | `(columnIndex: Int, value: String) -> Unit` | — | 触发时带有列索引和新选中的值。 |
| `modifier` | `Modifier` | `Modifier` | 应用于这一行列的 Modifier。 |
| `visibleCount` | `Int` | `5` | 每列显示的行数；会强制为奇数。 |
| `itemHeight` | `Dp` | `36.dp` | 每行的高度。 |

### `PrismWheelColumn`

| 字段 | 类型 | 说明 |
|---|---|---|
| `options` | `List<PrismWheelOption>` | 该列中按顺序显示的选项。 |
| `value` | `String` | 当前选中的选项值。 |

### `PrismWheelOption`

| 字段 | 类型 | 说明 |
|---|---|---|
| `label` | `String` | 可见的行文本。 |
| `value` | `String` | 与列的 `value` 匹配的稳定值。 |

> 假定外层有 `PrismTheme { }`。居中选择带使用 `PrismTheme.colors.fillTertiary`。
