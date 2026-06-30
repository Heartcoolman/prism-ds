# Textarea

带标签的多行文本输入框。它与 [TextField](/zh/components/textfield) 共享标签 / 帮助 / 错误的外观结构；控件的尺寸由 `minLines` 决定。用它来输入较长的自由格式文本，例如评论或个人简介。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=textarea" loading="lazy" title="textarea demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismTextarea
```

## 基本用法

```kotlin
var bio by remember { mutableStateOf("") }
PrismTextarea(
    value = bio,
    onValueChange = { bio = it },
    label = "Bio",
    placeholder = "Tell us about yourself…",
    minLines = 3,
)
```

## 状态

非空的 `error` 会将边框和消息渲染为危险样式，并替换 `helpText`。`enabled = false` 渲染为禁用样式。`fullWidth` 将控件拉伸至容器宽度。

```kotlin
// Error
PrismTextarea(
    value = bio,
    onValueChange = { bio = it },
    label = "Notes",
    error = "This field is required.",
)

// Disabled, full width
PrismTextarea(
    value = bio,
    onValueChange = { bio = it },
    label = "Locked",
    enabled = false,
    fullWidth = true,
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `value` | `String` | — | 当前文本值。 |
| `onValueChange` | `(String) -> Unit` | — | 每次编辑时以新值调用。 |
| `modifier` | `Modifier` | `Modifier` | 应用于该列的布局 Modifier。 |
| `label` | `String?` | `null` | 渲染在字段上方的标签。 |
| `placeholder` | `String?` | `null` | 值为空时显示的占位符。 |
| `helpText` | `String?` | `null` | 非错误状态时显示在下方的辅助文本。 |
| `error` | `String?` | `null` | 错误消息；非空时将字段切换到错误状态并替换 `helpText`。 |
| `enabled` | `Boolean` | `true` | 字段是否接受输入。 |
| `minLines` | `Int` | `4` | 可见文本行的最小数量。 |
| `maxLines` | `Int` | `Int.MAX_VALUE` | 可见文本行的最大数量。 |
| `fullWidth` | `Boolean` | `false` | 将字段拉伸以填满容器宽度。 |
