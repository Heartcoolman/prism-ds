# Tag

A compact pill for labels, filters, and tokens. `tone` sets the color (`Neutral` gray by default), `selected` raises an accent ring, `onClick` makes the pill a button, and `onRemove` appends a working trailing × control whose click does not trigger `onClick`.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismTag
```

## Basic usage

```kotlin
PrismTag("Label")
```

## Tones

```kotlin
PrismTag("Neutral", tone = PrismTone.Neutral)
PrismTag("Accent", tone = PrismTone.Accent)
PrismTag("Success", tone = PrismTone.Success)
PrismTag("Warning", tone = PrismTone.Warning)
PrismTag("Danger", tone = PrismTone.Danger)
```

## Selected, clickable, and removable

```kotlin
var selected by remember { mutableStateOf(false) }

PrismTag(
    label = "Filter",
    selected = selected,
    onClick = { selected = !selected },
    onRemove = { /* remove the tag */ },
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `label` | `String` | — | Text shown inside the pill. |
| `modifier` | `Modifier` | `Modifier` | Layout/visual modifier. |
| `tone` | `PrismTone` | `PrismTone.Neutral` | Semantic color: `Accent`, `Success`, `Warning`, `Danger`, `Neutral`. |
| `selected` | `Boolean` | `false` | Raises an accent tint, accent text, and accent ring. |
| `onClick` | `(() -> Unit)?` | `null` | When set, the pill becomes a clickable button. |
| `onRemove` | `(() -> Unit)?` | `null` | When set, appends a trailing × control; its click does not trigger `onClick`. |

### Enum

```kotlin
enum class PrismTone { Accent, Success, Warning, Danger, Neutral }
```

All components assume an enclosing `PrismTheme { }`. See [Styling](/styling) for theming details.
