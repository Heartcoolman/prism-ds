# Menu

一个由多行组成的下拉/上下文菜单，支持可选的前导图标、danger 样式以及分隔符。基于 Material 3 `DropdownMenu` 构建，并通过 `expanded` 控制。选中某一行会运行其 `onSelect`，然后请求关闭。将它放置在承载触发器的 `Box` 内即可完成锚定。

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismMenu
import io.github.heartcoolman.prism.ui.PrismMenuItem
import io.github.heartcoolman.prism.ui.PrismMenuSeparator
```

## Basic usage

```kotlin
var open by remember { mutableStateOf(false) }

Box {
    PrismButton(onClick = { open = true }) { Text("Menu") }
    PrismMenu(
        expanded = open,
        onDismissRequest = { open = false },
        items = listOf(
            PrismMenuItem(label = "Edit", onSelect = {}),
            PrismMenuItem(label = "Duplicate", onSelect = {}),
        ),
    )
}
```

## Icons, separators and danger rows

将 `PrismMenuItem` 与 `PrismMenuSeparator` 混合使用。为破坏性行设置 `danger = true`，并通过 `enabled = false` 禁用某一行。

```kotlin
PrismMenu(
    expanded = open,
    onDismissRequest = { open = false },
    items = listOf(
        PrismMenuItem(
            label = "Edit",
            icon = { PrismIcon(PrismIcons.Edit, contentDescription = null, size = 18.dp) },
            onSelect = {},
        ),
        PrismMenuItem(label = "Archive", enabled = false),
        PrismMenuSeparator,
        PrismMenuItem(label = "Delete", danger = true, onSelect = {}),
    ),
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `expanded` | `Boolean` | — | 菜单是否显示。 |
| `onDismissRequest` | `() -> Unit` | — | 点击外部、按 Escape 或某一行被选中后调用。 |
| `items` | `List<PrismMenuEntry>` | — | 自上而下的行与分隔符。 |
| `modifier` | `Modifier` | `Modifier` | 应用于下拉菜单的 Modifier。 |

### PrismMenuEntry

```kotlin
sealed interface PrismMenuEntry

data class PrismMenuItem(
    val label: String,
    val icon: (@Composable () -> Unit)? = null,
    val danger: Boolean = false,
    val enabled: Boolean = true,
    val onSelect: () -> Unit = {},
) : PrismMenuEntry

object PrismMenuSeparator : PrismMenuEntry
```

| 字段 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `label` | `String` | — | 行文本。 |
| `icon` | `(@Composable () -> Unit)?` | `null` | 可选的前导图标（次要色调，或 danger 色调）。 |
| `danger` | `Boolean` | `false` | 以破坏性配色渲染该行。 |
| `enabled` | `Boolean` | `true` | 为 `false` 时阻止交互并使该行变暗。 |
| `onSelect` | `() -> Unit` | `{}` | 选中该行时（关闭前）调用。 |
```
