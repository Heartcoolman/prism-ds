# BarChart

Restrained vertical bar chart. Bars share the available width and rise proportionally to the series max; a single accent marks one bar (the max-value bar by default). No axes or gridlines — use it for at-a-glance comparisons rather than precise reads.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=barchart" loading="lazy" title="barchart demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.charts.PrismBarChart
import io.github.heartcoolman.prism.charts.PrismBarDatum
```

## Basic usage

```kotlin
PrismBarChart(
    data = listOf(
        PrismBarDatum("Mon", 3f),
        PrismBarDatum("Tue", 6f),
        PrismBarDatum("Wed", 4f),
    ),
    showValues = true,
)
```

## Highlight a specific bar

By default the max-value bar is accented. Pass `highlightIndex` to accent another bar instead.

```kotlin
PrismBarChart(
    data = listOf(
        PrismBarDatum("Q1", 12f),
        PrismBarDatum("Q2", 18f),
        PrismBarDatum("Q3", 9f),
    ),
    highlightIndex = 0,
    height = 200.dp,
)
```

## API

### PrismBarChart

| Parameter | Type | Default | Description |
|---|---|---|---|
| `data` | `List<PrismBarDatum>` | — | Series to plot, left to right. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the chart row. |
| `highlightIndex` | `Int?` | `null` | Index of the accented bar; defaults to the max-value bar. |
| `height` | `Dp` | `160.dp` | Plot height (excludes labels and values). |
| `showValues` | `Boolean` | `false` | Render the value above the highlighted bar. |

### PrismBarDatum

| Parameter | Type | Default | Description |
|---|---|---|---|
| `label` | `String` | — | Caption rendered under the bar. |
| `value` | `Float` | — | Magnitude; bar height is proportional to the series max. |
