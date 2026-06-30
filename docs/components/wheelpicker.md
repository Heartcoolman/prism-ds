# WheelPicker

A drum/wheel selector: a scrolling list with snap-to-center fling where the centered row is full-opacity while neighbours fade and shrink. Use the single-column form for a short list, or the multi-column form for compound values such as hour / minute / second.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismWheelPicker
import io.github.heartcoolman.prism.ui.PrismWheelColumn
import io.github.heartcoolman.prism.ui.PrismWheelOption
```

## Basic usage (single column)

```kotlin
var index by remember { mutableStateOf(1) }

PrismWheelPicker(
    options = listOf("Sun", "Mon", "Tue", "Wed", "Thu"),
    selectedIndex = index,
    onSelectedChange = { index = it },
)
```

## Multi-column

Pass `columns` to render several wheels side by side. `onChange` reports `(columnIndex, value)`, where `value` is the stable `PrismWheelOption.value`.

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

## Sizing

`visibleCount` (forced odd) sets how many rows are shown, and `itemHeight` sets each row's height.

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

### `PrismWheelPicker` (single column)

| Parameter | Type | Default | Description |
|---|---|---|---|
| `options` | `List<String>` | — | Row labels, in order. |
| `selectedIndex` | `Int` | — | Index of the centered option (controlled). |
| `onSelectedChange` | `(Int) -> Unit` | — | Fired when the wheel settles on or a row is tapped. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the column. |
| `visibleCount` | `Int` | `5` | Number of rows shown; coerced to an odd value. |
| `itemHeight` | `Dp` | `36.dp` | Height of each row. |

### `PrismWheelPicker` (multi-column)

| Parameter | Type | Default | Description |
|---|---|---|---|
| `columns` | `List<PrismWheelColumn>` | — | One or more wheels, side by side. |
| `onChange` | `(columnIndex: Int, value: String) -> Unit` | — | Fired with the column index and newly selected value. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the row of columns. |
| `visibleCount` | `Int` | `5` | Number of rows per column; coerced to an odd value. |
| `itemHeight` | `Dp` | `36.dp` | Height of each row. |

### `PrismWheelColumn`

| Field | Type | Description |
|---|---|---|
| `options` | `List<PrismWheelOption>` | Ordered options shown in this column. |
| `value` | `String` | Currently selected option value. |

### `PrismWheelOption`

| Field | Type | Description |
|---|---|---|
| `label` | `String` | Visible row text. |
| `value` | `String` | Stable value matched against the column's `value`. |

> Assumes an enclosing `PrismTheme { }`. The center selection band uses `PrismTheme.colors.fillTertiary`.
