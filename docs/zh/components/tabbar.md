# TabBar

基于 Material 3 `NavigationBar` 构建的底部标签栏。半透明的 `materialBg` 背景，顶部带有细线分隔；每个标签将一个 24px 图标叠在脚注标签之上。选中的标签使用强调色，其余为三级色。受控。

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismTabBar
import io.github.heartcoolman.prism.ui.PrismTabBarItem
```

## 基本用法

```kotlin
var value by remember { mutableStateOf("home") }

PrismTabBar(
    items = listOf(
        PrismTabBarItem("home", "Home") {
            PrismIcon(PrismIcons.Home, contentDescription = null, size = 24.dp)
        },
        PrismTabBarItem("me", "Me") {
            PrismIcon(PrismIcons.User, contentDescription = null, size = 24.dp)
        },
    ),
    value = value,
    onChange = { value = it },
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `items` | `List<PrismTabBarItem>` | — | 标签定义，从左到右。 |
| `value` | `String` | — | 当前选中标签的 `key`。 |
| `onChange` | `(String) -> Unit` | — | 触发时携带选中标签的 `key`。 |
| `modifier` | `Modifier` | `Modifier` | 标签栏的布局 Modifier。 |

### PrismTabBarItem

| 字段 | 类型 | 说明 |
|---|---|---|
| `key` | `String` | 与 `value` 匹配的稳定标识符。 |
| `label` | `String` | 图标下方的可见文本。 |
| `icon` | `@Composable () -> Unit` | 图形槽，渲染在 24px 的盒子中（例如 `PrismIcon(..., size = 24.dp)`）。 |
