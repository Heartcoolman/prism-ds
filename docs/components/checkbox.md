# Checkbox

A tri-state box for boolean or mixed selection — checked, indeterminate, or off. Use it for individual opt-ins or for a "select all" control whose `indeterminate` state reflects a partial child selection.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=checkbox" loading="lazy" title="checkbox demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismCheckbox
```

## Basic usage

```kotlin
var checked by remember { mutableStateOf(false) }

PrismCheckbox(
    checked = checked,
    onCheckedChange = { checked = it },
)
```

## With a label

When `label` is set, the whole row becomes toggleable and the box is rendered as presentational.

```kotlin
var checked by remember { mutableStateOf(true) }

PrismCheckbox(
    checked = checked,
    onCheckedChange = { checked = it },
    label = "Checkbox",
)
```

## Indeterminate

`indeterminate` takes precedence over `checked` and renders the dash. Toggling still reports `!checked`.

```kotlin
PrismCheckbox(
    checked = false,
    onCheckedChange = {},
    indeterminate = true,
    label = "Select all",
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `checked` | `Boolean` | — | Whether the box is checked. |
| `onCheckedChange` | `(Boolean) -> Unit` | — | Fired with `!checked` when toggled. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the box (or the row when `label` is set). |
| `enabled` | `Boolean` | `true` | Whether the control accepts input. |
| `indeterminate` | `Boolean` | `false` | Renders the mixed-state dash; takes precedence over `checked`. |
| `label` | `String?` | `null` | Optional text beside the box; makes the whole row toggleable. |

> Assumes an enclosing `PrismTheme { }`. The checked fill is `PrismTheme.colors.accent`.
