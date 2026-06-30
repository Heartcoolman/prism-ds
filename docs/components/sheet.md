# Sheet

Bottom sheet: a scrim dims the page while a panel slides up from the bottom edge with a grab handle, optional title, and scrollable content. Use it for secondary tasks or contextual actions that don't warrant a full screen. Renders nothing when closed; place it at the end of a root `Box` so it overlays.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=sheet" loading="lazy" title="sheet demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismSheet
```

## Basic usage

```kotlin
var open by remember { mutableStateOf(false) }

Box(modifier = Modifier.fillMaxSize()) {
    PrismButton(onClick = { open = true }) { Text("Open sheet") }

    PrismSheet(
        open = open,
        onClose = { open = false },
        title = "Sheet",
    ) {
        Text("Sheet body")
    }
}
```

## Without a title

Omit `title` for a sheet that shows only the grab handle and content.

```kotlin
PrismSheet(open = open, onClose = { open = false }) {
    Text("Content with no headline")
}
```

## Disabling scrim dismissal

Set `dismissOnScrim = false` to require an explicit action to close (Escape/back is host-driven).

```kotlin
PrismSheet(
    open = open,
    onClose = { open = false },
    title = "Confirm",
    dismissOnScrim = false,
) {
    Text("Tap a button to dismiss")
}
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `open` | `Boolean` | — | Whether the sheet is visible. Renders nothing when `false`. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the full-size overlay root. |
| `onClose` | `() -> Unit` | `{}` | Called when the user requests dismissal (scrim click). |
| `title` | `String?` | `null` | Optional headline shown above the content. |
| `dismissOnScrim` | `Boolean` | `true` | Allow closing by clicking the scrim. |
| `content` | `@Composable ColumnScope.() -> Unit` | — | Sheet body content, laid out in a scrollable column. |
