# Tooltip

在触发器被悬停或聚焦时显示的小型深色气泡。其反转配色（背景上的标签文本）以及不可获得焦点的 `Popup` 意味着它永远不会抢走输入焦点。适用于为纯图标控件提供简短的补充标签。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=tooltip" loading="lazy" title="tooltip demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismTooltip
import io.github.heartcoolman.prism.ui.PrismTooltipPlacement
```

## Basic usage

将触发器作为 `content` 包裹；气泡会在悬停/聚焦时出现。

```kotlin
PrismTooltip(label = "More options") {
    PrismButton(onClick = {}) { Text("Hover me") }
}
```

## Placement

将气泡定位在触发器的四个方向中的任意一侧。

```kotlin
PrismTooltip(label = "Below the trigger", placement = PrismTooltipPlacement.Bottom) {
    PrismIcon(PrismIcons.Star, contentDescription = "star", size = 24.dp)
}
```

## Forcing visibility

设置 `open = true`，可使气泡始终显示，而不受悬停/聚焦影响（例如用于 stories 或截图）。

```kotlin
PrismTooltip(label = "Always visible", open = true) {
    PrismButton(onClick = {}) { Text("Trigger") }
}
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `label` | `String` | — | 悬停/聚焦时显示的气泡文本。 |
| `modifier` | `Modifier` | `Modifier` | 应用于触发器包装盒的 Modifier。 |
| `placement` | `PrismTooltipPlacement` | `PrismTooltipPlacement.Top` | 气泡相对于触发器的方位。 |
| `open` | `Boolean` | `false` | 强制气泡可见。 |
| `content` | `@Composable () -> Unit` | — | 该 tooltip 所描述的触发元素。 |

### PrismTooltipPlacement

```kotlin
enum class PrismTooltipPlacement { Top, Bottom, Left, Right }
```
