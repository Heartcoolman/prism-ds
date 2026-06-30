# Slider

A draggable control for choosing a value within a continuous (or stepped) range, drawn as an accent fill on a pill track. An optional header row shows a `label` and live value readout.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismSlider
```

## Basic usage

```kotlin
var value by remember { mutableStateOf(0.5f) }

PrismSlider(
    value = value,
    onValueChange = { value = it },
)
```

## Label and value readout

When `label` is set or `showValue` is `true`, a header row renders above the track. Customize the readout with `valueText`.

```kotlin
var value by remember { mutableStateOf(40f) }

PrismSlider(
    value = value,
    onValueChange = { value = it },
    valueRange = 0f..100f,
    label = "Slider",
    showValue = true,
    valueText = { "${it.roundToInt()}%" },
)
```

## Stepped range

Set `steps` to snap to discrete stops between the ends of `valueRange`. Use `onValueChangeFinished` to react after the drag settles.

```kotlin
PrismSlider(
    value = value,
    onValueChange = { value = it },
    valueRange = 0f..10f,
    steps = 9,
    onValueChangeFinished = { /* commit */ },
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `value` | `Float` | — | Current value (controlled). |
| `onValueChange` | `(Float) -> Unit` | — | Fired continuously as the thumb moves. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the column wrapper (fills max width). |
| `enabled` | `Boolean` | `true` | Whether the slider accepts input. |
| `valueRange` | `ClosedFloatingPointRange<Float>` | `0f..1f` | Inclusive min/max range. |
| `steps` | `Int` | `0` | Number of discrete stops between the ends; `0` is continuous. |
| `label` | `String?` | `null` | Optional header label above the track. |
| `showValue` | `Boolean` | `false` | Show the value readout in the header row. |
| `valueText` | `(Float) -> String` | `{ it.roundToInt().toString() }` | Formats the value readout. |
| `onValueChangeFinished` | `(() -> Unit)?` | `null` | Fired once when the drag/scroll gesture finishes. |

> Assumes an enclosing `PrismTheme { }`. The thumb and active track use `PrismTheme.colors.accent`; the inactive track uses `PrismTheme.colors.fillTertiary`.
