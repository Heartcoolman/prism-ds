# TabBar

Bottom tab bar built on Material 3 `NavigationBar`. Translucent `materialBg` background with a hairline top separator; each tab stacks a 24px icon over a footnote label. The selected tab uses the accent color, the rest are tertiary. Controlled.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismTabBar
import io.github.heartcoolman.prism.ui.PrismTabBarItem
```

## Basic usage

```kotlin
var value by remember { mutableStateOf("home") }

PrismTabBar(
    items = listOf(
        PrismTabBarItem("home", "Home") {
            PrismIcon(PrismIcons.Home, contentDescription = null, size = 24.dp)
        },
        PrismTabBarItem("me", "Me") {
            PrismIcon(PrismIcons.User, contentDescription = null, size = 24.dp)
        },
    ),
    value = value,
    onChange = { value = it },
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `items` | `List<PrismTabBarItem>` | — | Tab definitions, left to right. |
| `value` | `String` | — | `key` of the currently selected tab. |
| `onChange` | `(String) -> Unit` | — | Fires with the selected tab's `key`. |
| `modifier` | `Modifier` | `Modifier` | Layout modifier for the bar. |

### PrismTabBarItem

| Field | Type | Description |
|---|---|---|
| `key` | `String` | Stable identifier matched against `value`. |
| `label` | `String` | Visible text under the icon. |
| `icon` | `@Composable () -> Unit` | Glyph slot, rendered in a 24px box (e.g. `PrismIcon(..., size = 24.dp)`). |
