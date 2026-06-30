# List

一个分组列表容器：由若干 `PrismListRow` 组成、经过裁剪、带卡片圆角的列。每一行自行绘制发丝分隔线，并带有 leading 槽位、标题（+ 可选副标题）、trailing 槽位以及可选的 disclosure chevron。用它实现设置项、详情行和可导航条目。

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismList
import io.github.heartcoolman.prism.ui.PrismListRow
```

## Basic usage

将 `PrismListRow` 子项放入 `PrismList` 中。在最后一行设置 `showDivider = false` 以去掉其发丝线。

```kotlin
PrismList {
    PrismListRow(
        title = "Row one",
        subtitle = "Subtitle",
        leading = { PrismIcon(PrismIcons.Star, contentDescription = null, size = 20.dp) },
        chevron = true,
        onClick = {},
    )
    PrismListRow(title = "Row two", trailing = { Text("Detail") }, showDivider = false)
}
```

## Inset

设置 `inset = true` 可在分组容器周围添加水平外边距。

```kotlin
PrismList(inset = true) {
    PrismListRow(title = "Wi-Fi", trailing = { Text("On") }, showDivider = false)
}
```

## API

### PrismList

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | 应用于容器列的 Modifier。 |
| `inset` | `Boolean` | `false` | 在分组周围添加水平外边距。 |
| `content` | `@Composable ColumnScope.() -> Unit` | — | 要排布的 `PrismListRow`。 |

### PrismListRow

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `title` | `String` | — | 主文本。 |
| `modifier` | `Modifier` | `Modifier` | 应用于行列的 Modifier。 |
| `subtitle` | `String?` | `null` | 标题下方的次要文本。 |
| `leading` | `(@Composable () -> Unit)?` | `null` | Leading 槽位——图标或头像。 |
| `trailing` | `(@Composable () -> Unit)?` | `null` | Trailing 槽位——数值文本或控件。 |
| `chevron` | `Boolean` | `false` | 显示尾部的 disclosure chevron。 |
| `onClick` | `(() -> Unit)?` | `null` | 设置后使该行可交互（`role = Button`）。 |
| `showDivider` | `Boolean` | `true` | 绘制底部发丝线；在最后一行设为 `false`。 |
