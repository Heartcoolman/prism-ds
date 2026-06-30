# Image

Fixed aspect-ratio media box with rounded corners, an optional bottom gradient scrim for overlaid text, and a bottom-left content slot. There is no network loading here — a muted placeholder glyph stands in for the photo; use Coil/`AsyncImage` at the call site for real images.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismImage
```

## Basic usage

```kotlin
PrismImage(ratio = PrismImageRatio.R16x9)
```

## Overlay caption

Set `overlay = true` to add a bottom gradient scrim; the `content` slot is pinned bottom-left and switches to white text when the overlay is on.

```kotlin
PrismImage(overlay = true) {
    Text("Caption")
}
```

## Aspect ratios

```kotlin
PrismImage(ratio = PrismImageRatio.R1x1)
PrismImage(ratio = PrismImageRatio.R4x3)
PrismImage(ratio = PrismImageRatio.R3x4)
```

## API

### PrismImage

| Parameter | Type | Default | Description |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the media box. |
| `ratio` | `PrismImageRatio` | `PrismImageRatio.R16x9` | Fixed aspect ratio of the box. |
| `radius` | `Dp` | `PrismTheme.radius.image` | Corner radius. |
| `overlay` | `Boolean` | `false` | Bottom gradient scrim to keep overlaid text legible. |
| `content` | `(@Composable () -> Unit)?` | `null` | Overlaid content (e.g. a caption), pinned bottom-left. |

### PrismImageRatio

| Value | Ratio |
|---|---|
| `R16x9` | 16:9 |
| `R4x3` | 4:3 |
| `R1x1` | 1:1 |
| `R3x4` | 3:4 |
