# LineChart

Trend line chart drawn on a Compose `Canvas`. It scales the data into the viewport, draws a rounded accent polyline with an end dot, and optionally fills the area below with a fading accent gradient. Use it for compact sparkline-style trends.

## Import

```kotlin
import io.github.heartcoolman.prism.charts.PrismLineChart
```

## Basic usage

```kotlin
PrismLineChart(data = listOf(3f, 5f, 2f, 8f, 6f), area = true)
```

## Plain line

Omit `area` for just the polyline and end dot; tune `strokeWidth` and the canvas `width`/`height` as needed.

```kotlin
PrismLineChart(
    data = listOf(10f, 12f, 9f, 14f, 13f, 17f),
    width = 320.dp,
    height = 120.dp,
    strokeWidth = 3.dp,
    contentDescription = "Weekly active users",
)
```

## API

### PrismLineChart

| Parameter | Type | Default | Description |
|---|---|---|---|
| `data` | `List<Float>` | — | Series of y-values, plotted left to right at equal x-spacing. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the canvas. |
| `width` | `Dp` | `260.dp` | Canvas width. |
| `height` | `Dp` | `96.dp` | Canvas height. |
| `area` | `Boolean` | `false` | Fill the region under the line with a fading accent gradient. |
| `strokeWidth` | `Dp` | `2.dp` | Polyline stroke width. |
| `contentDescription` | `String` | `"趋势图"` | Accessible description of the trend. |
