# ProgressRing

Circular progress ring drawn on a Compose `Canvas` with a round-capped arc over a neutral track and a center label. Use it for a single bounded completion value from 0 to 100. The center defaults to `${value}%`.

## Import

```kotlin
import io.github.heartcoolman.prism.charts.PrismProgressRing
```

## Basic usage

```kotlin
PrismProgressRing(value = 72f, tone = PrismRingTone.Success, label = "72%")
```

## Tones

```kotlin
PrismProgressRing(value = 40f, tone = PrismRingTone.Accent)
PrismProgressRing(value = 80f, tone = PrismRingTone.Success)
PrismProgressRing(value = 95f, tone = PrismRingTone.Danger)
```

## Size and thickness

```kotlin
PrismProgressRing(
    value = 60f,
    size = 128.dp,
    thickness = 16.dp,
    label = "60%",
)
```

## API

### PrismProgressRing

| Parameter | Type | Default | Description |
|---|---|---|---|
| `value` | `Float` | — | Completion as a percentage, clamped to 0–100. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the ring box. |
| `size` | `Dp` | `96.dp` | Outer diameter. |
| `thickness` | `Dp` | `12.dp` | Ring stroke thickness. |
| `tone` | `PrismRingTone` | `PrismRingTone.Accent` | Semantic color of the filled arc. |
| `label` | `String?` | `null` | Center text; defaults to `${value}%` when null. |

### PrismRingTone

| Value | Description |
|---|---|
| `Accent` | Brand accent arc. |
| `Success` | Success-colored arc. |
| `Danger` | Danger-colored arc. |
