# Tabs

Underline tabs — a row of tab buttons over a 1px separator track. The active tab is emphasized (semibold) with a 2px accent underline. Use for switching between sibling views within a screen. Controlled.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismTabs
import io.github.heartcoolman.prism.ui.PrismTabItem
```

## Basic usage

```kotlin
var value by remember { mutableStateOf("one") }

PrismTabs(
    tabs = listOf(
        PrismTabItem("one", "One"),
        PrismTabItem("two", "Two"),
    ),
    value = value,
    onChange = { value = it },
)
```

## Full width

`fullWidth` stretches the tabs to share the row equally; otherwise they are inline-sized.

```kotlin
PrismTabs(
    tabs = listOf(
        PrismTabItem("day", "Day"),
        PrismTabItem("week", "Week"),
        PrismTabItem("month", "Month"),
    ),
    value = value,
    onChange = { value = it },
    fullWidth = true,
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `tabs` | `List<PrismTabItem>` | — | Tab descriptors, rendered left to right. |
| `value` | `String` | — | `key` of the currently selected tab (controlled). |
| `onChange` | `(String) -> Unit` | — | Fires with the selected tab's `key` on activation. |
| `modifier` | `Modifier` | `Modifier` | Layout modifier for the tab row. |
| `fullWidth` | `Boolean` | `false` | Stretch tabs to share the full row width equally. |

### PrismTabItem

| Field | Type | Description |
|---|---|---|
| `key` | `String` | Stable identifier emitted by `onChange`. |
| `label` | `String` | Visible tab text. |
