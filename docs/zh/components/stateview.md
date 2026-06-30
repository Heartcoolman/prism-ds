# StateView

用于空 / 加载 / 错误 / 成功页面的页面状态模式：一个居中的列，包含图标圆圈、标题、可选的描述以及可选的操作。用它来填充没有内容、正在加载、加载失败或刚刚成功的区域。

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismStateView
```

## 基本用法

```kotlin
PrismStateView(
    title = "No items",
    description = "Nothing here yet.",
)
```

## 变体

`variant` 决定默认字形、其颜色以及无障碍播报方式：`Loading` 和 `Success` 以礼貌方式播报，`Error` 以强调方式播报。`Loading` 会显示加载指示器而非字形。

```kotlin
PrismStateView(title = "No items", variant = PrismStateVariant.Empty)
PrismStateView(title = "Loading…", variant = PrismStateVariant.Loading)
PrismStateView(title = "Something went wrong", variant = PrismStateVariant.Error)
PrismStateView(title = "All done", variant = PrismStateVariant.Success)
```

## 带操作

```kotlin
PrismStateView(
    title = "No items",
    description = "Nothing here yet.",
    action = { PrismButton(onClick = {}) { Text("Add") } },
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `title` | `String` | — | 主要消息（标题）。 |
| `modifier` | `Modifier` | `Modifier` | 应用于该列的布局 Modifier。 |
| `variant` | `PrismStateVariant` | `PrismStateVariant.Empty` | 页面状态，决定默认图标、颜色和 aria 角色。 |
| `description` | `String?` | `null` | 标题下方的可选辅助文本。 |
| `icon` | `(@Composable () -> Unit)?` | `null` | 覆盖变体默认值的自定义字形。 |
| `action` | `(@Composable () -> Unit)?` | `null` | 可选的操作槽位，通常是一个按钮。 |

### PrismStateVariant

```kotlin
enum class PrismStateVariant { Empty, Loading, Error, Success }
```
