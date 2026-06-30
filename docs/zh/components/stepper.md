# Stepper

分段式 [−] 数值 [+] 控件，用于在可选边界内以固定步长调整整数。每个按钮在到达其边界时禁用。适用于小而精确的数量（计数、份数）等滑块会不够精确的场景。

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismStepper
```

## 基本用法

```kotlin
var value by remember { mutableStateOf(0) }

PrismStepper(
    value = value,
    onValueChange = { value = it },
)
```

## 边界与步长

`min`/`max` 会限制数值；减少按钮在 `min` 处禁用，增加按钮在 `max` 处禁用。`step` 设置每次按下的增减量。

```kotlin
var value by remember { mutableStateOf(2) }

PrismStepper(
    value = value,
    onValueChange = { value = it },
    min = 0,
    max = 10,
    step = 2,
)
```

## 禁用

```kotlin
PrismStepper(
    value = 3,
    onValueChange = {},
    enabled = false,
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `value` | `Int` | — | 当前值（受控）。 |
| `onValueChange` | `(Int) -> Unit` | — | 以下一个值触发，已限制在 `min`/`max` 之间。 |
| `modifier` | `Modifier` | `Modifier` | 应用于表面的 Modifier。 |
| `min` | `Int` | `Int.MIN_VALUE` | 下界；减少按钮在此处禁用。 |
| `max` | `Int` | `Int.MAX_VALUE` | 上界；增加按钮在此处禁用。 |
| `step` | `Int` | `1` | 每次按下的增减量。 |
| `enabled` | `Boolean` | `true` | 禁用两个控件并使表面变暗。 |

> 假定外层存在 `PrismTheme { }`。表面使用 `PrismTheme.colors.fillTertiary`；激活图标使用 `PrismTheme.colors.accent`。
