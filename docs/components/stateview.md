# StateView

A page-state pattern for empty / loading / error / success screens: a centered column with an icon circle, a title, an optional description, and an optional action. Use it to fill a region that has no content, is loading, failed, or just succeeded.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismStateView
```

## Basic usage

```kotlin
PrismStateView(
    title = "No items",
    description = "Nothing here yet.",
)
```

## Variants

The `variant` drives the default glyph, its color, and the accessibility announcement: `Loading` and `Success` announce politely, `Error` announces assertively. `Loading` shows a spinner instead of a glyph.

```kotlin
PrismStateView(title = "No items", variant = PrismStateVariant.Empty)
PrismStateView(title = "Loading…", variant = PrismStateVariant.Loading)
PrismStateView(title = "Something went wrong", variant = PrismStateVariant.Error)
PrismStateView(title = "All done", variant = PrismStateVariant.Success)
```

## With an action

```kotlin
PrismStateView(
    title = "No items",
    description = "Nothing here yet.",
    action = { PrismButton(onClick = {}) { Text("Add") } },
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `title` | `String` | — | Primary message (headline). |
| `modifier` | `Modifier` | `Modifier` | Layout modifier applied to the column. |
| `variant` | `PrismStateVariant` | `PrismStateVariant.Empty` | Page state driving the default icon, color, and aria role. |
| `description` | `String?` | `null` | Optional supporting text below the title. |
| `icon` | `(@Composable () -> Unit)?` | `null` | Custom glyph that overrides the variant default. |
| `action` | `(@Composable () -> Unit)?` | `null` | Optional action slot, typically a button. |

### PrismStateVariant

```kotlin
enum class PrismStateVariant { Empty, Loading, Error, Success }
```
