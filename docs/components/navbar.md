# NavBar

Sticky top navigation bar over a translucent `materialBg` background with a hairline bottom separator. Three-column layout: leading | centered title | trailing. A default back button (chevron + label) is shown when `onBack` is set and no `leading` slot is given. The `large` variant adds a left-aligned large-title row below the bar.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismNavBar
```

## Basic usage

```kotlin
PrismNavBar(
    title = "Title",
    onBack = { /* navigate back */ },
    trailing = { PrismIcon(PrismIcons.More, contentDescription = null) },
)
```

## Custom leading slot

A `leading` slot overrides the default back button.

```kotlin
PrismNavBar(
    title = "Inbox",
    leading = {
        PrismButton(variant = PrismButtonVariant.Plain, onClick = {}) { Text("Edit") }
    },
    trailing = { PrismIcon(PrismIcons.More, contentDescription = null) },
)
```

## Large title

`large` renders the title as a left-aligned large-title row beneath the bar.

```kotlin
PrismNavBar(
    title = "Library",
    large = true,
    trailing = { PrismIcon(PrismIcons.More, contentDescription = null) },
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | Layout modifier for the bar. |
| `title` | `String?` | `null` | Centered title in the bar row (or large title when `large`). |
| `leading` | `(@Composable () -> Unit)?` | `null` | Leading slot; overrides the default back button. |
| `trailing` | `(@Composable () -> Unit)?` | `null` | Trailing slot, right-aligned. |
| `onBack` | `(() -> Unit)?` | `null` | When set (and no `leading`), renders a default back button. |
| `backLabel` | `String` | `"返回"` | Label for the default back button. |
| `large` | `Boolean` | `false` | Render the title as a left-aligned large title below the bar row. |
