# Skeleton

A pulsing placeholder shown while content loads. Use it to reserve layout space and signal loading without a spinner. It is purely decorative and skipped by assistive tech.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=skeleton" loading="lazy" title="skeleton demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismSkeleton
```

## Basic usage

```kotlin
PrismSkeleton(lines = 3)
```

## Variants

`Text` renders `lines` bars (the last tapered to 60% when multi-line). `Rect` and `Circle` use the explicit `width`/`height` you supply; for `Circle` the diameter is `width ?: height`.

```kotlin
// Multi-line text block
PrismSkeleton(variant = PrismSkeletonVariant.Text, lines = 3)

// Rectangle (e.g. an image placeholder)
PrismSkeleton(variant = PrismSkeletonVariant.Rect, width = 200.dp, height = 120.dp)

// Circle (e.g. an avatar placeholder)
PrismSkeleton(variant = PrismSkeletonVariant.Circle, width = 48.dp)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | Layout modifier applied to the placeholder. |
| `variant` | `PrismSkeletonVariant` | `PrismSkeletonVariant.Text` | Placeholder shape. |
| `width` | `Dp?` | `null` | Explicit width for `Rect`; diameter for `Circle`. `Text` fills available width. |
| `height` | `Dp` | `16.dp` | Height for `Rect`; fallback diameter for `Circle`. |
| `lines` | `Int` | `1` | Number of stacked bars for the `Text` variant. |

### PrismSkeletonVariant

```kotlin
enum class PrismSkeletonVariant { Text, Rect, Circle }
```
