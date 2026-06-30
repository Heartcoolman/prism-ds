# ProgressRing

绘制在 Compose `Canvas` 上的环形进度条，在中性轨道上叠加一段圆头弧线，并带有中心标签。用于表示 0 到 100 之间的单一有界完成值。中心默认显示 `${value}%`。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=progressring" loading="lazy" title="progressring demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.charts.PrismProgressRing
```

## 基本用法

```kotlin
PrismProgressRing(value = 72f, tone = PrismRingTone.Success, label = "72%")
```

## 色调

```kotlin
PrismProgressRing(value = 40f, tone = PrismRingTone.Accent)
PrismProgressRing(value = 80f, tone = PrismRingTone.Success)
PrismProgressRing(value = 95f, tone = PrismRingTone.Danger)
```

## 尺寸与粗细

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

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `value` | `Float` | — | 以百分比表示的完成度，被限制在 0–100。 |
| `modifier` | `Modifier` | `Modifier` | 应用于环形框的 Modifier。 |
| `size` | `Dp` | `96.dp` | 外径。 |
| `thickness` | `Dp` | `12.dp` | 环形描边粗细。 |
| `tone` | `PrismRingTone` | `PrismRingTone.Accent` | 填充弧线的语义色。 |
| `label` | `String?` | `null` | 中心文字；为 null 时默认显示 `${value}%`。 |

### PrismRingTone

| 取值 | 说明 |
|---|---|
| `Accent` | 品牌强调色弧线。 |
| `Success` | 成功色弧线。 |
| `Danger` | 危险色弧线。 |
