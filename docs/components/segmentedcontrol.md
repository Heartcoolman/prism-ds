# SegmentedControl

iOS-style single-select control — a group of equal segments over a tertiary-fill track. The selected segment lifts onto a `bg` pill. Use for a small set of mutually exclusive options. Controlled.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=segmentedcontrol" loading="lazy" title="segmentedcontrol demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismSegmentedControl
import io.github.heartcoolman.prism.ui.PrismSegmentedOption
```

## Basic usage

```kotlin
var value by remember { mutableStateOf("day") }

PrismSegmentedControl(
    options = listOf(
        PrismSegmentedOption("day", "Day"),
        PrismSegmentedOption("week", "Week"),
    ),
    value = value,
    onChange = { value = it },
)
```

## Sizes

`size` selects the control height: `Small` (footnote text) or `Medium` (subhead text, default).

```kotlin
PrismSegmentedControl(
    options = options,
    value = value,
    onChange = { value = it },
    size = PrismSegmentedSize.Small,
)
```

## Full width

`fullWidth` stretches the control to fill its container; each segment shares the width equally.

```kotlin
PrismSegmentedControl(
    options = options,
    value = value,
    onChange = { value = it },
    fullWidth = true,
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `options` | `List<PrismSegmentedOption>` | — | Segments to render, in order. |
| `value` | `String` | — | Currently selected value (controlled). |
| `onChange` | `(String) -> Unit` | — | Fired with the value of the tapped segment. |
| `modifier` | `Modifier` | `Modifier` | Layout modifier for the track. |
| `size` | `PrismSegmentedSize` | `PrismSegmentedSize.Medium` | Control height. |
| `fullWidth` | `Boolean` | `false` | Stretch the control to fill its container width. |

### PrismSegmentedSize

`PrismSegmentedSize.Small` · `PrismSegmentedSize.Medium`

### PrismSegmentedOption

| Field | Type | Description |
|---|---|---|
| `value` | `String` | Unique value emitted on selection. |
| `label` | `String` | Visible segment text. |
