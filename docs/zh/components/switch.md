# Switch

胶囊轨道式开关，配有可滑动的白色滑块，用于单个的开/关设置。关闭时使用中性填充色，开启时使用强调色。传入 `label` 可让整行都可切换。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=switch" loading="lazy" title="switch demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismSwitch
```

## 基本用法

```kotlin
var checked by remember { mutableStateOf(false) }

PrismSwitch(
    checked = checked,
    onCheckedChange = { checked = it },
)
```

## 带标签

设置 `label` 后，整行都可切换，开关本身则渲染为纯展示形式（其自身的 `onCheckedChange` 为 `null`）。

```kotlin
var checked by remember { mutableStateOf(true) }

PrismSwitch(
    checked = checked,
    onCheckedChange = { checked = it },
    label = "Switch",
)
```

## 禁用

```kotlin
PrismSwitch(
    checked = true,
    onCheckedChange = {},
    enabled = false,
    label = "Locked",
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `checked` | `Boolean` | — | 开关是否处于开启状态。 |
| `onCheckedChange` | `(Boolean) -> Unit` | — | 以下一个选中状态触发。 |
| `modifier` | `Modifier` | `Modifier` | 应用于开关的 Modifier（设置 `label` 时则应用于整行）。 |
| `enabled` | `Boolean` | `true` | 控件是否接受输入。 |
| `label` | `String?` | `null` | 轨道旁的可选文本；使整行都可切换。 |

> 假定外层存在 `PrismTheme { }`。轨道的开启色为 `PrismTheme.colors.accent`，关闭色为 `PrismTheme.colors.fillTertiary`。
