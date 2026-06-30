# Slider

用于在连续（或分步）范围内选择数值的可拖动控件，绘制为胶囊轨道上的强调色填充。可选的头部行会显示 `label` 和实时数值读数。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=slider" loading="lazy" title="slider demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismSlider
```

## 基本用法

```kotlin
var value by remember { mutableStateOf(0.5f) }

PrismSlider(
    value = value,
    onValueChange = { value = it },
)
```

## 标签与数值读数

当设置了 `label` 或 `showValue` 为 `true` 时，轨道上方会渲染一个头部行。通过 `valueText` 自定义读数。

```kotlin
var value by remember { mutableStateOf(40f) }

PrismSlider(
    value = value,
    onValueChange = { value = it },
    valueRange = 0f..100f,
    label = "Slider",
    showValue = true,
    valueText = { "${it.roundToInt()}%" },
)
```

## 分步范围

设置 `steps` 可在 `valueRange` 两端之间吸附到离散的停靠点。使用 `onValueChangeFinished` 在拖动结束后做出响应。

```kotlin
PrismSlider(
    value = value,
    onValueChange = { value = it },
    valueRange = 0f..10f,
    steps = 9,
    onValueChangeFinished = { /* commit */ },
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `value` | `Float` | — | 当前值（受控）。 |
| `onValueChange` | `(Float) -> Unit` | — | 随滑块移动持续触发。 |
| `modifier` | `Modifier` | `Modifier` | 应用于列容器的 Modifier（占满最大宽度）。 |
| `enabled` | `Boolean` | `true` | 滑块是否接受输入。 |
| `valueRange` | `ClosedFloatingPointRange<Float>` | `0f..1f` | 包含端点的最小/最大范围。 |
| `steps` | `Int` | `0` | 两端之间离散停靠点的数量；`0` 表示连续。 |
| `label` | `String?` | `null` | 轨道上方的可选头部标签。 |
| `showValue` | `Boolean` | `false` | 在头部行中显示数值读数。 |
| `valueText` | `(Float) -> String` | `{ it.roundToInt().toString() }` | 格式化数值读数。 |
| `onValueChangeFinished` | `(() -> Unit)?` | `null` | 在拖动/滚动手势结束时触发一次。 |

> 假定外层存在 `PrismTheme { }`。滑块和活动轨道使用 `PrismTheme.colors.accent`；非活动轨道使用 `PrismTheme.colors.fillTertiary`。
