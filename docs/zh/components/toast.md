# Toast

浮动的反馈卡片。它仅负责展示，没有自动消失计时器——需要你自己通过 `open` 来控制可见性。前导图标会根据 variant 自动确定其颜色，也可以通过 `icon` 覆盖。当 `open` 为 `false` 时不渲染任何内容。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=toast" loading="lazy" title="toast demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismToast
```

## 基本用法

```kotlin
PrismToast(text = "Saved")
```

## 变体

`variant` 设置前导图标及其颜色（`Success` → 对勾，`Error` → 警告，`Neutral` → 无）。

```kotlin
PrismToast(text = "Saved", variant = PrismToastVariant.Success)
PrismToast(text = "Something went wrong", variant = PrismToastVariant.Error)
```

## 控制可见性

```kotlin
var open by remember { mutableStateOf(true) }

PrismToast(text = "Copied to clipboard", open = open)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `text` | `String` | — | 消息内容。 |
| `modifier` | `Modifier` | `Modifier` | 布局/视觉 modifier。 |
| `variant` | `PrismToastVariant` | `PrismToastVariant.Neutral` | 语义颜色和默认图标：`Neutral`、`Success`、`Error`。 |
| `open` | `Boolean` | `true` | 可见性；为 `false` 时不渲染任何内容。 |
| `icon` | `ImageVector?` | `null` | 前导字形；覆盖该 variant 的默认图标。 |

### 枚举

```kotlin
enum class PrismToastVariant { Neutral, Success, Error }
```

所有组件都假定外层包裹着 `PrismTheme { }`。主题相关细节参见 [Styling](/zh/styling)。
