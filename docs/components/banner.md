# Banner

An inline status banner. A tinted background and tone-colored leading icon carry the tone; it pairs a bold title with a quieter message, plus an optional action and close (×). `Danger` announces assertively to assistive tech.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismBanner
```

## Basic usage

```kotlin
PrismBanner(
    title = "Heads up",
    message = "Your changes have been saved.",
)
```

## Tones

`tone` drives the tint and the default leading icon (`Success` → check, `Warning`/`Danger` → warning, others → info).

```kotlin
PrismBanner(title = "All set", tone = PrismTone.Success)
PrismBanner(title = "Check your input", tone = PrismTone.Warning)
PrismBanner(title = "Upload failed", message = "Try again.", tone = PrismTone.Danger)
```

## Action and close

```kotlin
PrismBanner(
    title = "Update available",
    message = "A new version is ready to install.",
    tone = PrismTone.Accent,
    onClose = { /* dismiss */ },
    action = { PrismButton(onClick = {}) { Text("Update") } },
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `title` | `String` | — | Bold leading line. |
| `modifier` | `Modifier` | `Modifier` | Layout/visual modifier. |
| `message` | `String?` | `null` | Secondary descriptive text. |
| `tone` | `PrismTone` | `PrismTone.Accent` | Semantic tone driving tint, icon color, and live-region urgency. |
| `icon` | `ImageVector?` | `null` | Leading glyph; falls back to a tone-default icon. |
| `onClose` | `(() -> Unit)?` | `null` | When set, renders a trailing close (×) button. |
| `action` | `(@Composable RowScope.() -> Unit)?` | `null` | Trailing action slot (e.g. a button). |

### Enum

```kotlin
enum class PrismTone { Accent, Success, Warning, Danger, Neutral }
```

All components assume an enclosing `PrismTheme { }`. See [Styling](/styling) for theming details.
