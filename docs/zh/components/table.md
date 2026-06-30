# Table

数据表格，采用 footnote 字重的表头，下方为以发丝线分隔的 subhead 字重数据行。用它展示小规模、只读的表格数据；数值列右对齐并使用等宽数字（tabular figures）。每个单元格的值都通过其列的 `key` 在行映射中查找，各列等分宽度。

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismTable
import io.github.heartcoolman.prism.ui.PrismTableColumn
```

## Basic usage

```kotlin
PrismTable(
    columns = listOf(
        PrismTableColumn(key = "name", header = "Name"),
        PrismTableColumn(key = "qty", header = "Qty", numeric = true),
    ),
    rows = listOf(
        mapOf("name" to "Apples", "qty" to "12"),
        mapOf("name" to "Pears", "qty" to "7"),
    ),
    caption = "Inventory",
)
```

## Columns

`numeric` 会让列右对齐，并以等宽数字（`tnum`）渲染其单元格。使用 `align` 可显式覆盖对齐方式；未设置 `align` 时，数值列回退为右对齐，其余为左对齐。

```kotlin
PrismTable(
    columns = listOf(
        PrismTableColumn(key = "city", header = "City"),
        PrismTableColumn(key = "code", header = "Code", align = PrismCellAlign.Right),
        PrismTableColumn(key = "pop", header = "Population", numeric = true),
    ),
    rows = listOf(
        mapOf("city" to "Tokyo", "code" to "JP", "pop" to "13960000"),
        mapOf("city" to "Paris", "code" to "FR", "pop" to "2161000"),
    ),
)
```

## API

### PrismTable

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `columns` | `List<PrismTableColumn>` | — | 列定义，按显示顺序排列。 |
| `rows` | `List<Map<String, String>>` | — | 行数据；每个单元格通过其列的 `key` 查找。 |
| `modifier` | `Modifier` | `Modifier` | 应用于根列的 Modifier。 |
| `caption` | `String?` | `null` | 可选的 footnote 标题，渲染在表格上方。 |

### PrismTableColumn

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `key` | `String` | — | 用于查找单元格值的行映射 key。 |
| `header` | `String` | — | 列表头文本。 |
| `align` | `PrismCellAlign?` | `null` | 文本对齐方式；`numeric` 时默认右对齐，否则左对齐。 |
| `numeric` | `Boolean` | `false` | 使单元格右对齐并使用等宽数字。 |

### PrismCellAlign

| 值 | 说明 |
|---|---|
| `Left` | 起始对齐的单元格。 |
| `Right` | 末端对齐的单元格。 |
