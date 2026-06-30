# LineChart

绘制在 Compose `Canvas` 上的趋势折线图。它将数据缩放到视口内，绘制带末端圆点的圆角强调色折线，并可选地用渐隐的强调色渐变填充下方区域。适用于紧凑的迷你折线（sparkline）式趋势。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=linechart" loading="lazy" title="linechart demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.charts.PrismLineChart
```

## 基本用法

```kotlin
PrismLineChart(data = listOf(3f, 5f, 2f, 8f, 6f), area = true)
```

## 纯折线

省略 `area` 即可只保留折线和末端圆点；按需调整 `strokeWidth` 以及画布的 `width`/`height`。

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

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `data` | `List<Float>` | — | y 值系列，以相等的 x 间距从左到右绘制。 |
| `modifier` | `Modifier` | `Modifier` | 应用于画布的 Modifier。 |
| `width` | `Dp` | `260.dp` | 画布宽度。 |
| `height` | `Dp` | `96.dp` | 画布高度。 |
| `area` | `Boolean` | `false` | 用渐隐的强调色渐变填充折线下方的区域。 |
| `strokeWidth` | `Dp` | `2.dp` | 折线描边宽度。 |
| `contentDescription` | `String` | `"趋势图"` | 趋势的无障碍描述。 |
