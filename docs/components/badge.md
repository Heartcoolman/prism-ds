# Badge

A count or dot badge. Use it standalone, or wrap `content` to float the mark at the content's top-right corner (e.g. over an icon). `max` caps the displayed count to `${max}+`.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=badge" loading="lazy" title="badge demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismBadge
```

## Basic usage

```kotlin
PrismBadge(count = 5)
```

## Dot and overflow

```kotlin
PrismBadge(dot = true, tone = PrismTone.Success)
PrismBadge(count = 250, max = 99) // renders "99+"
```

## Floating over content

When `content` is provided, the badge floats at its top-right corner.

```kotlin
PrismBadge(count = 3) {
    PrismIcon(PrismIcons.Info, contentDescription = "Notifications")
}
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | Layout/visual modifier (applied to the wrapper when `content` is set). |
| `count` | `Int?` | `null` | Numeric value to display; `null` with `dot = false` renders a dot. |
| `dot` | `Boolean` | `false` | Render an 8dp text-less dot instead of a count pill. |
| `max` | `Int` | `99` | Largest count shown before overflowing to `${max}+`. |
| `tone` | `PrismTone` | `PrismTone.Danger` | Semantic color of the badge fill. |
| `content` | `(@Composable () -> Unit)?` | `null` | Optional anchor; the badge floats at its top-right corner. |

### Enum

```kotlin
enum class PrismTone { Accent, Success, Warning, Danger, Neutral }
```

All components assume an enclosing `PrismTheme { }`. See [Styling](/styling) for theming details.
