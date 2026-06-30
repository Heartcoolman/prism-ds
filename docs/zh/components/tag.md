# Tag

用于标签、筛选和令牌的紧凑胶囊。`tone` 设置颜色（默认 `Neutral` 灰色），`selected` 升起一个强调色边框环，`onClick` 使胶囊成为按钮，`onRemove` 在尾部附加一个可用的 × 控件，其点击不会触发 `onClick`。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=tag" loading="lazy" title="tag demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismTag
```

## 基础用法

```kotlin
PrismTag("Label")
```

## 色调

```kotlin
PrismTag("Neutral", tone = PrismTone.Neutral)
PrismTag("Accent", tone = PrismTone.Accent)
PrismTag("Success", tone = PrismTone.Success)
PrismTag("Warning", tone = PrismTone.Warning)
PrismTag("Danger", tone = PrismTone.Danger)
```

## 选中、可点击与可移除

```kotlin
var selected by remember { mutableStateOf(false) }

PrismTag(
    label = "Filter",
    selected = selected,
    onClick = { selected = !selected },
    onRemove = { /* remove the tag */ },
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `label` | `String` | — | 显示在胶囊内的文本。 |
| `modifier` | `Modifier` | `Modifier` | 布局/视觉修饰符。 |
| `tone` | `PrismTone` | `PrismTone.Neutral` | 语义颜色：`Accent`、`Success`、`Warning`、`Danger`、`Neutral`。 |
| `selected` | `Boolean` | `false` | 升起强调色着色、强调色文本和强调色边框环。 |
| `onClick` | `(() -> Unit)?` | `null` | 设置后，胶囊成为可点击的按钮。 |
| `onRemove` | `(() -> Unit)?` | `null` | 设置后，在尾部附加一个 × 控件；其点击不会触发 `onClick`。 |

### 枚举

```kotlin
enum class PrismTone { Accent, Success, Warning, Danger, Neutral }
```

所有组件都假定外层存在一个 `PrismTheme { }`。主题细节请参见 [Styling](/zh/styling)。
