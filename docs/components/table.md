# Table

Data table with footnote-weight headings over subhead body rows separated by hairlines. Use it for small, read-only tabular data; numeric columns right-align with tabular figures. Each cell value is looked up in the row map by its column `key`, and columns share width equally.

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

`numeric` right-aligns a column and renders its cells with tabular figures (`tnum`). Override alignment explicitly with `align`; an unset `align` falls back to right for numeric columns and left otherwise.

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

| Parameter | Type | Default | Description |
|---|---|---|---|
| `columns` | `List<PrismTableColumn>` | — | Column definitions, in display order. |
| `rows` | `List<Map<String, String>>` | — | Row data; each cell is looked up by its column `key`. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the root column. |
| `caption` | `String?` | `null` | Optional footnote caption rendered above the table. |

### PrismTableColumn

| Parameter | Type | Default | Description |
|---|---|---|---|
| `key` | `String` | — | Row-map key used to look up the cell value. |
| `header` | `String` | — | Column heading text. |
| `align` | `PrismCellAlign?` | `null` | Text alignment; defaults to right when `numeric`, else left. |
| `numeric` | `Boolean` | `false` | Right-aligns cells and uses tabular figures. |

### PrismCellAlign

| Value | Description |
|---|---|
| `Left` | Start-aligned cells. |
| `Right` | End-aligned cells. |
