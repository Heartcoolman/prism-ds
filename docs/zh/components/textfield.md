# TextField

带标签的单行文本输入框。标签位于控件上方；帮助或错误文本位于下方。用它来输入简短的自由格式值，例如姓名、邮箱或密码。

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismTextField
```

## 基本用法

```kotlin
var text by remember { mutableStateOf("") }
PrismTextField(
    value = text,
    onValueChange = { text = it },
    label = "Email",
    placeholder = "you@example.com",
)
```

## 状态

非空的 `error` 会将边框和消息切换为危险样式，并替换 `helpText`。`enabled = false` 渲染为禁用样式。

```kotlin
// Help text below the field
PrismTextField(
    value = text,
    onValueChange = { text = it },
    label = "Username",
    helpText = "Pick a unique handle.",
)

// Error state
PrismTextField(
    value = text,
    onValueChange = { text = it },
    label = "Email",
    error = "Invalid email address.",
)

// Disabled
PrismTextField(
    value = text,
    onValueChange = { text = it },
    label = "Locked",
    enabled = false,
)
```

## 前导图标与密码

```kotlin
PrismTextField(
    value = text,
    onValueChange = { text = it },
    label = "Password",
    leadingIcon = { PrismIcon(PrismIcons.Lock, contentDescription = null, size = 18.dp) },
    visualTransformation = PasswordVisualTransformation(),
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `value` | `String` | — | 当前文本值。 |
| `onValueChange` | `(String) -> Unit` | — | 每次编辑时以新值调用。 |
| `modifier` | `Modifier` | `Modifier` | 应用于该列的布局 Modifier。 |
| `label` | `String?` | `null` | 渲染在输入框上方的标签。 |
| `placeholder` | `String?` | `null` | 值为空时显示的占位符。 |
| `helpText` | `String?` | `null` | 非错误状态时显示在下方的辅助文本。 |
| `error` | `String?` | `null` | 错误消息；非空时将字段切换到错误状态并替换 `helpText`。 |
| `leadingIcon` | `(@Composable () -> Unit)?` | `null` | 渲染在输入框内部、左对齐的字形。 |
| `enabled` | `Boolean` | `true` | 字段是否接受输入。 |
| `singleLine` | `Boolean` | `true` | 将输入限制为单行。 |
| `fullWidth` | `Boolean` | `false` | 将字段拉伸以填满容器宽度。 |
| `keyboardOptions` | `KeyboardOptions` | `KeyboardOptions.Default` | 软键盘配置（类型、IME 操作）。 |
| `visualTransformation` | `VisualTransformation` | `VisualTransformation.None` | 应用于文本的视觉变换，例如密码掩码。 |
