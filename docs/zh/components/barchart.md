# BarChart

克制的垂直柱状图。各柱共享可用宽度，并按系列最大值成比例升高；单一强调色标记某一根柱（默认为最大值柱）。没有坐标轴或网格线——用于一目了然的对比，而非精确读数。

## 导入

```kotlin
import io.github.heartcoolman.prism.charts.PrismBarChart
import io.github.heartcoolman.prism.charts.PrismBarDatum
```

## 基本用法

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

## 突出显示特定柱

默认强调最大值柱。传入 `highlightIndex` 可改为强调另一根柱。

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

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `data` | `List<PrismBarDatum>` | — | 要绘制的系列，从左到右。 |
| `modifier` | `Modifier` | `Modifier` | 应用于图表行的 Modifier。 |
| `highlightIndex` | `Int?` | `null` | 被强调柱的索引；默认为最大值柱。 |
| `height` | `Dp` | `160.dp` | 绘图高度（不含标签和数值）。 |
| `showValues` | `Boolean` | `false` | 在被强调柱上方渲染数值。 |

### PrismBarDatum

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `label` | `String` | — | 渲染在柱下方的文字。 |
| `value` | `Float` | — | 数值大小；柱高与系列最大值成比例。 |
