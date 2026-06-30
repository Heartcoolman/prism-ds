# Switch

A pill-track toggle with a sliding white thumb for a single on/off setting. Off uses a neutral fill, on uses the accent color. Pass a `label` to make the whole row toggleable.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=switch" loading="lazy" title="switch demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismSwitch
```

## Basic usage

```kotlin
var checked by remember { mutableStateOf(false) }

PrismSwitch(
    checked = checked,
    onCheckedChange = { checked = it },
)
```

## With a label

When `label` is set, the whole row becomes toggleable and the switch itself is rendered as presentational (its own `onCheckedChange` is `null`).

```kotlin
var checked by remember { mutableStateOf(true) }

PrismSwitch(
    checked = checked,
    onCheckedChange = { checked = it },
    label = "Switch",
)
```

## Disabled

```kotlin
PrismSwitch(
    checked = true,
    onCheckedChange = {},
    enabled = false,
    label = "Locked",
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `checked` | `Boolean` | — | Whether the switch is on. |
| `onCheckedChange` | `(Boolean) -> Unit` | — | Fired with the next checked state. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the switch (or the row when `label` is set). |
| `enabled` | `Boolean` | `true` | Whether the control accepts input. |
| `label` | `String?` | `null` | Optional text beside the track; makes the whole row toggleable. |

> Assumes an enclosing `PrismTheme { }`. The track on-color is `PrismTheme.colors.accent`, the off-color is `PrismTheme.colors.fillTertiary`.
