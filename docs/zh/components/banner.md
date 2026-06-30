# Banner

内联状态横幅。通过着色的背景和与 tone 同色的前导图标来传达 tone；它将加粗标题与较弱的消息文本配对，并可选地附带操作和关闭按钮（×）。`Danger` 会向辅助技术发出强提示。

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismBanner
```

## 基本用法

```kotlin
PrismBanner(
    title = "Heads up",
    message = "Your changes have been saved.",
)
```

## Tone

`tone` 决定着色以及默认的前导图标（`Success` → 对勾，`Warning`/`Danger` → 警告，其他 → 信息）。

```kotlin
PrismBanner(title = "All set", tone = PrismTone.Success)
PrismBanner(title = "Check your input", tone = PrismTone.Warning)
PrismBanner(title = "Upload failed", message = "Try again.", tone = PrismTone.Danger)
```

## 操作与关闭

```kotlin
PrismBanner(
    title = "Update available",
    message = "A new version is ready to install.",
    tone = PrismTone.Accent,
    onClose = { /* dismiss */ },
    action = { PrismButton(onClick = {}) { Text("Update") } },
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `title` | `String` | — | 加粗的前导行。 |
| `modifier` | `Modifier` | `Modifier` | 布局/视觉 modifier。 |
| `message` | `String?` | `null` | 次要的描述性文本。 |
| `tone` | `PrismTone` | `PrismTone.Accent` | 决定着色、图标颜色和实时区域提示紧急度的语义 tone。 |
| `icon` | `ImageVector?` | `null` | 前导字形；缺省时回退到该 tone 的默认图标。 |
| `onClose` | `(() -> Unit)?` | `null` | 设置后，渲染一个尾部的关闭按钮（×）。 |
| `action` | `(@Composable RowScope.() -> Unit)?` | `null` | 尾部的操作槽位（例如一个按钮）。 |

### 枚举

```kotlin
enum class PrismTone { Accent, Success, Warning, Danger, Neutral }
```

所有组件都假定外层包裹着 `PrismTheme { }`。主题相关细节参见 [Styling](/zh/styling)。
