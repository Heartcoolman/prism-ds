# Card

A neutral content surface with a top media slot (placeholder when omitted), an eyebrow/title/description text block, free-form body, and an optional footer. Set `interactive` or pass `onClick` for a clickable, lifted card. Use it to group related content into a tappable unit.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismCard
```

## Basic usage

Use the text-block parameters for the common eyebrow / title / description layout.

```kotlin
PrismCard(
    eyebrow = "DESIGN SYSTEM",
    title = "Prism Card",
    description = "Eyebrow + title + description slots.",
)
```

## Clickable card

Pass `onClick` (or set `interactive = true`) for a lifted, tappable card. You can also compose the text-block helpers inside `content`.

```kotlin
PrismCard(onClick = {}) {
    PrismCardEyebrow("DESIGN SYSTEM")
    PrismCardTitle("Prism Card")
    PrismCardDescription("Eyebrow + title + description slots.")
}
```

## Media and footer

Provide a `media` slot (rendered 16:9) and a `footer` for actions.

```kotlin
PrismCard(
    media = { PrismImage() },
    title = "With media",
    description = "Top media slot plus a footer row.",
    footer = { PrismButton(onClick = {}) { Text("Open") } },
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the card surface. |
| `media` | `(@Composable () -> Unit)?` | `null` | Top media slot (16:9). A tinted placeholder shows when omitted. |
| `eyebrow` | `String?` | `null` | Small overline above the title. |
| `title` | `String?` | `null` | Prominent card title. |
| `description` | `String?` | `null` | Supporting one-to-two line description. |
| `footer` | `(@Composable () -> Unit)?` | `null` | Footer slot for actions or links. |
| `interactive` | `Boolean` | `false` | Add hover lift (elevation) for clickable cards. |
| `onClick` | `(() -> Unit)?` | `null` | Makes the whole card clickable and lifted. |
| `content` | `@Composable ColumnScope.() -> Unit` | `{}` | Free-form body rendered between the text block and footer. |

### Text-block helpers

Standalone composables for building a card body manually inside `content`.

```kotlin
@Composable fun PrismCardEyebrow(text: String)
@Composable fun PrismCardTitle(text: String)
@Composable fun PrismCardDescription(text: String)
```
