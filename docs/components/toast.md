# Toast

A floating feedback card. It is presentation-only with no auto-dismiss timer — drive visibility yourself via `open`. A variant-colored leading icon is resolved automatically, or overridden via `icon`. Renders nothing when `open` is `false`.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismToast
```

## Basic usage

```kotlin
PrismToast(text = "Saved")
```

## Variants

`variant` sets the leading icon and its color (`Success` → check, `Error` → warning, `Neutral` → none).

```kotlin
PrismToast(text = "Saved", variant = PrismToastVariant.Success)
PrismToast(text = "Something went wrong", variant = PrismToastVariant.Error)
```

## Controlling visibility

```kotlin
var open by remember { mutableStateOf(true) }

PrismToast(text = "Copied to clipboard", open = open)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `text` | `String` | — | Message content. |
| `modifier` | `Modifier` | `Modifier` | Layout/visual modifier. |
| `variant` | `PrismToastVariant` | `PrismToastVariant.Neutral` | Semantic color and default icon: `Neutral`, `Success`, `Error`. |
| `open` | `Boolean` | `true` | Visibility; renders nothing when `false`. |
| `icon` | `ImageVector?` | `null` | Leading glyph; overrides the default variant icon. |

### Enum

```kotlin
enum class PrismToastVariant { Neutral, Success, Error }
```

All components assume an enclosing `PrismTheme { }`. See [Styling](/styling) for theming details.
