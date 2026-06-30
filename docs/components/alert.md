# Alert

Centered confirmation dialog for a single decision, mapped to Material 3 `AlertDialog`: title, optional message, and cancel + confirm actions. The confirm action turns `danger`-colored when `destructive`; `stacked` lays the two actions vertically instead of side by side.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=alert" loading="lazy" title="alert demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismAlert
```

## Basic usage

```kotlin
var open by remember { mutableStateOf(false) }

PrismButton(onClick = { open = true }) { Text("Delete") }

PrismAlert(
    open = open,
    onClose = { open = false },
    title = "Delete?",
    message = "This cannot be undone.",
    destructive = true,
    onConfirm = { open = false },
)
```

## Stacked actions

`stacked` lays cancel above confirm in a vertical column.

```kotlin
PrismAlert(
    open = open,
    onClose = { open = false },
    title = "Sign out?",
    confirmLabel = "Sign out",
    cancelLabel = "Stay",
    stacked = true,
    onConfirm = { open = false },
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `open` | `Boolean` | — | Whether the alert is visible; renders nothing when `false`. |
| `onClose` | `() -> Unit` | — | Fires on cancel, scrim dismiss, or Escape. |
| `title` | `String` | — | Headline of the decision. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the dialog. |
| `message` | `String?` | `null` | Optional supporting text under the title. |
| `confirmLabel` | `String` | `"确认"` | Confirm button label. |
| `cancelLabel` | `String` | `"取消"` | Cancel button label. |
| `destructive` | `Boolean` | `false` | Color the confirm action as destructive (danger). |
| `stacked` | `Boolean` | `false` | Stack the buttons vertically (cancel above confirm). |
| `onConfirm` | `() -> Unit` | `{}` | Fires when the confirm button is pressed. |
