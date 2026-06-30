# Menu

A dropdown / context menu of rows with optional leading icons, danger styling, and separators. Built on Material 3 `DropdownMenu` and controlled via `expanded`. Selecting a row runs its `onSelect`, then requests dismissal. Anchor it by placing it inside the `Box` that holds the trigger.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=menu" loading="lazy" title="menu demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismMenu
import io.github.heartcoolman.prism.ui.PrismMenuItem
import io.github.heartcoolman.prism.ui.PrismMenuSeparator
```

## Basic usage

```kotlin
var open by remember { mutableStateOf(false) }

Box {
    PrismButton(onClick = { open = true }) { Text("Menu") }
    PrismMenu(
        expanded = open,
        onDismissRequest = { open = false },
        items = listOf(
            PrismMenuItem(label = "Edit", onSelect = {}),
            PrismMenuItem(label = "Duplicate", onSelect = {}),
        ),
    )
}
```

## Icons, separators and danger rows

Mix `PrismMenuItem`s with `PrismMenuSeparator`. Set `danger = true` for destructive rows and `enabled = false` to disable one.

```kotlin
PrismMenu(
    expanded = open,
    onDismissRequest = { open = false },
    items = listOf(
        PrismMenuItem(
            label = "Edit",
            icon = { PrismIcon(PrismIcons.Edit, contentDescription = null, size = 18.dp) },
            onSelect = {},
        ),
        PrismMenuItem(label = "Archive", enabled = false),
        PrismMenuSeparator,
        PrismMenuItem(label = "Delete", danger = true, onSelect = {}),
    ),
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `expanded` | `Boolean` | — | Whether the menu is shown. |
| `onDismissRequest` | `() -> Unit` | — | Called on outside click, Escape, or after a row is selected. |
| `items` | `List<PrismMenuEntry>` | — | Rows and separators, top to bottom. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the dropdown. |

### PrismMenuEntry

```kotlin
sealed interface PrismMenuEntry

data class PrismMenuItem(
    val label: String,
    val icon: (@Composable () -> Unit)? = null,
    val danger: Boolean = false,
    val enabled: Boolean = true,
    val onSelect: () -> Unit = {},
) : PrismMenuEntry

object PrismMenuSeparator : PrismMenuEntry
```

| Field | Type | Default | Description |
|---|---|---|---|
| `label` | `String` | — | Row text. |
| `icon` | `(@Composable () -> Unit)?` | `null` | Optional leading glyph (secondary tint, or danger tint). |
| `danger` | `Boolean` | `false` | Render the row in the destructive color. |
| `enabled` | `Boolean` | `true` | Block interaction and dim the row when `false`. |
| `onSelect` | `() -> Unit` | `{}` | Invoked when the row is chosen, before dismissal. |
