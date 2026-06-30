# Button

用于视图中主要操作的胶囊形按钮。层级通过四个变体之间的填充强度来表达，并配以语义化的 `tone`、三种尺寸以及可选的前置/后置图标。每个区域只使用一个 `Filled` 按钮作为主操作。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=button" loading="lazy" title="button demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismButton
```

## 基础用法

```kotlin
PrismButton(onClick = { /* handle click */ }) {
    Text("Continue")
}
```

## 变体

`variant` 设置视觉权重：`Filled`（主要）> `Tinted` > `Outline` > `Plain`。

```kotlin
PrismButton(onClick = {}, variant = PrismButtonVariant.Filled) { Text("Filled") }
PrismButton(onClick = {}, variant = PrismButtonVariant.Tinted) { Text("Tinted") }
PrismButton(onClick = {}, variant = PrismButtonVariant.Outline, tone = PrismTone.Neutral) { Text("Outline") }
PrismButton(onClick = {}, variant = PrismButtonVariant.Plain) { Text("Plain") }
```

## 色调

`tone` 决定颜色。破坏性操作请使用 `Danger`。

```kotlin
PrismButton(onClick = {}, tone = PrismTone.Accent) { Text("Accent") }
PrismButton(onClick = {}, tone = PrismTone.Success) { Text("Success") }
PrismButton(onClick = {}, tone = PrismTone.Danger) { Text("Delete") }
```

## 尺寸、图标与禁用

```kotlin
PrismButton(
    onClick = {},
    size = PrismButtonSize.Lg,
    leadingIcon = { PrismIcon(PrismIcons.Check, contentDescription = null) },
) {
    Text("Save")
}

PrismButton(onClick = {}, enabled = false) { Text("Disabled") }
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `onClick` | `() -> Unit` | — | 点按按钮时调用。 |
| `modifier` | `Modifier` | `Modifier` | 布局/视觉修饰符。 |
| `variant` | `PrismButtonVariant` | `PrismButtonVariant.Filled` | 视觉权重：`Filled`、`Tinted`、`Plain`、`Outline`。 |
| `tone` | `PrismTone` | `PrismTone.Accent` | 语义颜色：`Accent`、`Success`、`Warning`、`Danger`、`Neutral`。 |
| `size` | `PrismButtonSize` | `PrismButtonSize.Md` | 控件高度：`Sm`、`Md`、`Lg`。 |
| `enabled` | `Boolean` | `true` | 为 `false` 时，变暗至 40% 并禁用点击。 |
| `leadingIcon` | `(@Composable () -> Unit)?` | `null` | 内容之前的可选字形。 |
| `trailingIcon` | `(@Composable () -> Unit)?` | `null` | 内容之后的可选字形。 |
| `content` | `@Composable () -> Unit` | — | 按钮标签内容（尾随 lambda）。 |

### 枚举

```kotlin
enum class PrismButtonVariant { Filled, Tinted, Plain, Outline }
enum class PrismButtonSize { Sm, Md, Lg }
enum class PrismTone { Accent, Success, Warning, Danger, Neutral }
```

所有组件都假定外层存在一个 `PrismTheme { }`。主题细节请参见 [Styling](/zh/styling)。
