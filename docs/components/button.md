# Button

A pill-shaped button for the primary actions in a view. Hierarchy is expressed through fill strength across four variants, with semantic `tone`, three sizes, and optional leading/trailing icons. Use a single `Filled` button per area for the main action.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismButton
```

## Basic usage

```kotlin
PrismButton(onClick = { /* handle click */ }) {
    Text("Continue")
}
```

## Variants

`variant` sets the visual weight: `Filled` (primary) > `Tinted` > `Outline` > `Plain`.

```kotlin
PrismButton(onClick = {}, variant = PrismButtonVariant.Filled) { Text("Filled") }
PrismButton(onClick = {}, variant = PrismButtonVariant.Tinted) { Text("Tinted") }
PrismButton(onClick = {}, variant = PrismButtonVariant.Outline, tone = PrismTone.Neutral) { Text("Outline") }
PrismButton(onClick = {}, variant = PrismButtonVariant.Plain) { Text("Plain") }
```

## Tones

`tone` drives the color. Use `Danger` for destructive actions.

```kotlin
PrismButton(onClick = {}, tone = PrismTone.Accent) { Text("Accent") }
PrismButton(onClick = {}, tone = PrismTone.Success) { Text("Success") }
PrismButton(onClick = {}, tone = PrismTone.Danger) { Text("Delete") }
```

## Sizes, icons, and disabled

```kotlin
PrismButton(
    onClick = {},
    size = PrismButtonSize.Lg,
    leadingIcon = { PrismIcon(PrismIcons.Check, contentDescription = null) },
) {
    Text("Save")
}

PrismButton(onClick = {}, enabled = false) { Text("Disabled") }
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `onClick` | `() -> Unit` | — | Invoked when the button is tapped. |
| `modifier` | `Modifier` | `Modifier` | Layout/visual modifier. |
| `variant` | `PrismButtonVariant` | `PrismButtonVariant.Filled` | Visual weight: `Filled`, `Tinted`, `Plain`, `Outline`. |
| `tone` | `PrismTone` | `PrismTone.Accent` | Semantic color: `Accent`, `Success`, `Warning`, `Danger`, `Neutral`. |
| `size` | `PrismButtonSize` | `PrismButtonSize.Md` | Control height: `Sm`, `Md`, `Lg`. |
| `enabled` | `Boolean` | `true` | When `false`, dims to 40% and disables clicks. |
| `leadingIcon` | `(@Composable () -> Unit)?` | `null` | Optional glyph before the content. |
| `trailingIcon` | `(@Composable () -> Unit)?` | `null` | Optional glyph after the content. |
| `content` | `@Composable () -> Unit` | — | Button label content (trailing lambda). |

### Enums

```kotlin
enum class PrismButtonVariant { Filled, Tinted, Plain, Outline }
enum class PrismButtonSize { Sm, Md, Lg }
enum class PrismTone { Accent, Success, Warning, Danger, Neutral }
```

All components assume an enclosing `PrismTheme { }`. See [Styling](/styling) for theming details.
