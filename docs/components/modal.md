# Modal

Centered dialog card over a dimmed scrim, mapped to a foundation `Dialog`. Closes on back/Escape and on scrim click (when `dismissOnScrim`). Use for focused tasks that need title, body, and one or two actions. The `actions` slot is a `RowScope`, so callers can apply `Modifier.weight(1f)` to fill the row.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismModal
```

## Basic usage

```kotlin
var open by remember { mutableStateOf(false) }

PrismButton(onClick = { open = true }) { Text("Open") }

PrismModal(
    open = open,
    onClose = { open = false },
    title = "Modal",
    actions = {
        PrismButton(onClick = { open = false }) { Text("OK") }
    },
    content = { Text("Modal body") },
)
```

## Two actions

The `actions` lambda runs in a `RowScope`; weight each button to split the row.

```kotlin
PrismModal(
    open = open,
    onClose = { open = false },
    title = "Save changes?",
    content = { Text("Your edits will be kept.") },
    actions = {
        PrismButton(
            variant = PrismButtonVariant.Gray,
            onClick = { open = false },
            modifier = Modifier.weight(1f),
        ) { Text("Cancel") }
        PrismButton(
            onClick = { open = false },
            modifier = Modifier.weight(1f),
        ) { Text("Save") }
    },
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `open` | `Boolean` | — | Whether the modal is visible; renders nothing when `false`. |
| `onClose` | `() -> Unit` | — | Called on back/Escape and on scrim click (when `dismissOnScrim`). |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the dialog card `Surface`. |
| `title` | `String?` | `null` | Optional heading shown above the body. |
| `dismissOnScrim` | `Boolean` | `true` | Dismiss when the scrim outside the card is clicked. |
| `actions` | `(@Composable RowScope.() -> Unit)?` | `null` | Actions row, typically one or two buttons. |
| `content` | `(@Composable () -> Unit)?` | `null` | Dialog body content. |
