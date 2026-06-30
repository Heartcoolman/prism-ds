# Tooltip

A small dark bubble revealed while the trigger is hovered or focused. Inverted colors (label on background) and a non-focusable `Popup` mean it never steals input. Use it for brief, supplementary labels on icon-only controls.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismTooltip
import io.github.heartcoolman.prism.ui.PrismTooltipPlacement
```

## Basic usage

Wrap the trigger as `content`; the bubble appears on hover/focus.

```kotlin
PrismTooltip(label = "More options") {
    PrismButton(onClick = {}) { Text("Hover me") }
}
```

## Placement

Position the bubble on any of the four sides of the trigger.

```kotlin
PrismTooltip(label = "Below the trigger", placement = PrismTooltipPlacement.Bottom) {
    PrismIcon(PrismIcons.Star, contentDescription = "star", size = 24.dp)
}
```

## Forcing visibility

Set `open = true` to keep the bubble shown regardless of hover/focus (e.g. for stories or screenshots).

```kotlin
PrismTooltip(label = "Always visible", open = true) {
    PrismButton(onClick = {}) { Text("Trigger") }
}
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `label` | `String` | — | Bubble text shown on hover/focus. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the trigger wrapper box. |
| `placement` | `PrismTooltipPlacement` | `PrismTooltipPlacement.Top` | Bubble side relative to the trigger. |
| `open` | `Boolean` | `false` | Force the bubble visible. |
| `content` | `@Composable () -> Unit` | — | The trigger element the tooltip describes. |

### PrismTooltipPlacement

```kotlin
enum class PrismTooltipPlacement { Top, Bottom, Left, Right }
```
