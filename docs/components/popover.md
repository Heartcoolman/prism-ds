# Popover

A floating card anchored to a trigger on one of four sides. The anchor stays in flow; the card floats in a focusable `Popup` so an outside click or Escape dismisses it. Use it for lightweight contextual content (details, small forms) attached to a control.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismPopover
import io.github.heartcoolman.prism.ui.PrismPopoverPlacement
```

## Basic usage

The trailing lambda is the `anchor`; `content` floats when `open` is true.

```kotlin
var open by remember { mutableStateOf(false) }

PrismPopover(
    open = open,
    onClose = { open = false },
    content = { Text("Popover body") },
) {
    PrismButton(onClick = { open = true }) { Text("Open") }
}
```

## Placement

Choose which side of the anchor the card sits on. Cross-axis is centered.

```kotlin
PrismPopover(
    open = open,
    onClose = { open = false },
    placement = PrismPopoverPlacement.Right,
    content = { Text("To the right") },
) {
    PrismButton(onClick = { open = true }) { Text("Anchor") }
}
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `open` | `Boolean` | — | Whether the floating card is shown. |
| `onClose` | `() -> Unit` | — | Called on outside click or Escape. |
| `content` | `@Composable () -> Unit` | — | Body rendered inside the floating card. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the anchor wrapper box. |
| `placement` | `PrismPopoverPlacement` | `PrismPopoverPlacement.Bottom` | Side of the anchor the card sits on. |
| `anchor` | `@Composable () -> Unit` | — | The trigger element the card points at (stays in flow). |

### PrismPopoverPlacement

```kotlin
enum class PrismPopoverPlacement { Top, Bottom, Left, Right }
```
