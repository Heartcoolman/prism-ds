# Checkbox

用于布尔或混合选择的三态复选框——选中、不确定或关闭。可用于单独的选项勾选，或用作"全选"控件，其 `indeterminate` 状态反映子项的部分选中情况。

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismCheckbox
```

## 基本用法

```kotlin
var checked by remember { mutableStateOf(false) }

PrismCheckbox(
    checked = checked,
    onCheckedChange = { checked = it },
)
```

## 带标签

设置 `label` 后，整行都可切换，复选框则渲染为纯展示形式。

```kotlin
var checked by remember { mutableStateOf(true) }

PrismCheckbox(
    checked = checked,
    onCheckedChange = { checked = it },
    label = "Checkbox",
)
```

## 不确定状态

`indeterminate` 优先级高于 `checked`，会渲染为短横线。切换时仍报告 `!checked`。

```kotlin
PrismCheckbox(
    checked = false,
    onCheckedChange = {},
    indeterminate = true,
    label = "Select all",
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `checked` | `Boolean` | — | 复选框是否选中。 |
| `onCheckedChange` | `(Boolean) -> Unit` | — | 切换时以 `!checked` 触发。 |
| `modifier` | `Modifier` | `Modifier` | 应用于复选框的 Modifier（设置 `label` 时则应用于整行）。 |
| `enabled` | `Boolean` | `true` | 控件是否接受输入。 |
| `indeterminate` | `Boolean` | `false` | 渲染混合状态的短横线；优先级高于 `checked`。 |
| `label` | `String?` | `null` | 复选框旁的可选文本；使整行都可切换。 |

> 假定外层存在 `PrismTheme { }`。选中时的填充色为 `PrismTheme.colors.accent`。
