# NavBar

吸附在顶部的导航栏，位于半透明的 `materialBg` 背景之上，底部带有细线分隔。三列布局：前导 | 居中标题 | 尾随。当设置了 `onBack` 且未提供 `leading` 槽时，会显示默认的返回按钮（chevron + 标签）。`large` 变体会在导航栏下方添加一行左对齐的大标题。

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismNavBar
```

## 基本用法

```kotlin
PrismNavBar(
    title = "Title",
    onBack = { /* navigate back */ },
    trailing = { PrismIcon(PrismIcons.More, contentDescription = null) },
)
```

## 自定义前导槽

`leading` 槽会覆盖默认的返回按钮。

```kotlin
PrismNavBar(
    title = "Inbox",
    leading = {
        PrismButton(variant = PrismButtonVariant.Plain, onClick = {}) { Text("Edit") }
    },
    trailing = { PrismIcon(PrismIcons.More, contentDescription = null) },
)
```

## 大标题

`large` 会将标题渲染为导航栏下方一行左对齐的大标题。

```kotlin
PrismNavBar(
    title = "Library",
    large = true,
    trailing = { PrismIcon(PrismIcons.More, contentDescription = null) },
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | 导航栏的布局 Modifier。 |
| `title` | `String?` | `null` | 导航栏行中的居中标题（`large` 时为大标题）。 |
| `leading` | `(@Composable () -> Unit)?` | `null` | 前导槽；覆盖默认的返回按钮。 |
| `trailing` | `(@Composable () -> Unit)?` | `null` | 尾随槽，右对齐。 |
| `onBack` | `(() -> Unit)?` | `null` | 设置后（且无 `leading`），渲染默认的返回按钮。 |
| `backLabel` | `String` | `"返回"` | 默认返回按钮的标签。 |
| `large` | `Boolean` | `false` | 将标题渲染为导航栏行下方左对齐的大标题。 |
