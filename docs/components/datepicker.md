# DatePicker

A self-contained calendar month grid for picking a single day. The displayed month is managed internally (seeded from `defaultMonth`, then `value`, then `today`) and navigated with the header chevrons. Date math is pure Kotlin — no date library and no system clock is read.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismDatePicker
import io.github.heartcoolman.prism.ui.PrismDate
```

## Basic usage

```kotlin
var date by remember { mutableStateOf<PrismDate?>(null) }

PrismDatePicker(
    value = date,
    onChange = { date = it },
)
```

## Highlighting today

Pass `today` to outline the current day. Because no clock is read, you supply it explicitly. `month` is 1-12.

```kotlin
var date by remember { mutableStateOf<PrismDate?>(PrismDate(2026, 6, 30)) }

PrismDatePicker(
    value = date,
    onChange = { date = it },
    today = PrismDate(2026, 6, 30),
)
```

## Seeding the displayed month

With no `value`, use `defaultMonth` to choose which month opens first (any day within it).

```kotlin
PrismDatePicker(
    value = null,
    onChange = { /* … */ },
    defaultMonth = PrismDate(2026, 1, 1),
)
```

## API

### `PrismDatePicker`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the surface. |
| `value` | `PrismDate?` | `null` | Selected date, or `null` when nothing is selected. |
| `onChange` | `(PrismDate) -> Unit` | `{}` | Fired with the clicked day. |
| `defaultMonth` | `PrismDate?` | `null` | Month shown on first render; falls back to `value`, then `today`. |
| `today` | `PrismDate?` | `null` | Day to outline as "today"; nothing is highlighted if `null`. |

### `PrismDate`

| Field | Type | Description |
|---|---|---|
| `year` | `Int` | Full year. |
| `month` | `Int` | Month, 1-12. |
| `day` | `Int` | Day of month. |

> Assumes an enclosing `PrismTheme { }`. The selected day fills with `PrismTheme.colors.accent`; the today outline uses the same accent.
