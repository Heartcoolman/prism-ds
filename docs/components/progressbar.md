# ProgressBar

A linear progress indicator. Pass `progress` as a `0..1` value for determinate fill, or leave it `null` for an indeterminate sliding segment. `tone` sets the fill color, overridden by an explicit `color`.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=progressbar" loading="lazy" title="progressbar demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismProgressBar
```

## Basic usage

```kotlin
PrismProgressBar(progress = 0.6f)
```

## Indeterminate

Omit `progress` (or pass `null`) for an indeterminate bar.

```kotlin
PrismProgressBar()
```

## Tones

```kotlin
PrismProgressBar(progress = 0.4f, tone = PrismTone.Accent)
PrismProgressBar(progress = 0.8f, tone = PrismTone.Success)
PrismProgressBar(progress = 0.3f, tone = PrismTone.Danger)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | Layout/visual modifier (the bar fills max width). |
| `progress` | `Float?` | `null` | `null` → indeterminate; otherwise a `0..1` value (coerced into range). |
| `tone` | `PrismTone` | `PrismTone.Accent` | Semantic fill color: `Accent`, `Success`, `Warning`, `Danger`, `Neutral`. |
| `color` | `Color` | `tone.color()` | Fill color; overrides the color derived from `tone`. |

### Enum

```kotlin
enum class PrismTone { Accent, Success, Warning, Danger, Neutral }
```

All components assume an enclosing `PrismTheme { }`. See [Styling](/styling) for theming details.
