# Radio

A single circular selection control. Use `PrismRadio` for a standalone option, or `PrismRadioGroup` for a managed single-choice set.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=radio" loading="lazy" title="radio demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismRadio
import io.github.heartcoolman.prism.ui.PrismRadioGroup
import io.github.heartcoolman.prism.ui.PrismRadioOption
import io.github.heartcoolman.prism.ui.PrismRadioOrientation
```

## Basic usage

```kotlin
var selected by remember { mutableStateOf(false) }

PrismRadio(
    selected = selected,
    onClick = { selected = !selected },
    label = "Radio",
)
```

## Radio group

`PrismRadioGroup` manages the selected `value` across `options` and reports the newly selected value via `onValueChange`.

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

## Orientation

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

| Parameter | Type | Default | Description |
|---|---|---|---|
| `selected` | `Boolean` | — | Whether this control is selected. |
| `onClick` | `() -> Unit` | — | Fired when the control (or its row) is activated. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the control (or the row when `label` is set). |
| `enabled` | `Boolean` | `true` | Whether the control accepts input. |
| `label` | `String?` | `null` | Optional text beside the control; makes the whole row selectable. |

### `PrismRadioGroup`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `value` | `String` | — | Currently selected option value (controlled). |
| `onValueChange` | `(String) -> Unit` | — | Fired with the newly selected value. |
| `options` | `List<PrismRadioOption>` | — | Options to render, in order. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the group container. |
| `enabled` | `Boolean` | `true` | Disables every option (combined with each option's `enabled`). |
| `orientation` | `PrismRadioOrientation` | `PrismRadioOrientation.Vertical` | Stack rows vertically or lay them out inline. |

### `PrismRadioOption`

| Field | Type | Default | Description |
|---|---|---|---|
| `value` | `String` | — | Value reported when this option is selected. |
| `label` | `String` | — | Visible label. |
| `enabled` | `Boolean` | `true` | Disable this single option. |

### `PrismRadioOrientation`

| Value | Description |
|---|---|
| `Vertical` | Stack options in a column (default). |
| `Horizontal` | Lay options out in a row. |

> Assumes an enclosing `PrismTheme { }`. The selected color is `PrismTheme.colors.accent`.
