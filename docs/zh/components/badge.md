# Badge

数字或圆点徽标。可以独立使用，也可以包裹 `content`，让标记浮动到内容的右上角（例如覆盖在图标上）。`max` 会将显示的计数上限设为 `${max}+`。

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismBadge
```

## 基本用法

```kotlin
PrismBadge(count = 5)
```

## 圆点与溢出

```kotlin
PrismBadge(dot = true, tone = PrismTone.Success)
PrismBadge(count = 250, max = 99) // renders "99+"
```

## 浮动于内容之上

当提供 `content` 时，徽标会浮动到其右上角。

```kotlin
PrismBadge(count = 3) {
    PrismIcon(PrismIcons.Info, contentDescription = "Notifications")
}
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | 布局/视觉 modifier（当设置了 `content` 时应用于包裹容器）。 |
| `count` | `Int?` | `null` | 要显示的数值；当 `dot = false` 且为 `null` 时渲染为圆点。 |
| `dot` | `Boolean` | `false` | 渲染一个 8dp 的无文字圆点，而非计数胶囊。 |
| `max` | `Int` | `99` | 溢出为 `${max}+` 之前显示的最大计数。 |
| `tone` | `PrismTone` | `PrismTone.Danger` | 徽标填充的语义颜色。 |
| `content` | `(@Composable () -> Unit)?` | `null` | 可选的锚点；徽标会浮动到其右上角。 |

### 枚举

```kotlin
enum class PrismTone { Accent, Success, Warning, Danger, Neutral }
```

所有组件都假定外层包裹着 `PrismTheme { }`。主题相关细节参见 [Styling](/zh/styling)。
