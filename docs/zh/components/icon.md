# Icon

将内置图标集中的字形渲染为带色调的矢量图。默认作为装饰元素；传入 `contentDescription` 可将其暴露给屏幕阅读器。继承本地内容颜色。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=icon" loading="lazy" title="icon demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.icons.PrismIcon
import io.github.heartcoolman.prism.icons.PrismIcons
```

## 基本用法

```kotlin
PrismIcon(PrismIcons.Star, contentDescription = "star", size = 24.dp)
```

## 装饰性图标

当图标紧邻一个已传达含义的文本标签时，通过传入 `contentDescription = null` 将其标记为装饰性元素。

```kotlin
PrismIcon(PrismIcons.Home, contentDescription = null, size = 24.dp)
```

## 尺寸与色调

`size` 设置正方形的边长；`tint` 默认采用继承的内容颜色，但可被覆盖。

```kotlin
PrismIcon(
    icon = PrismIcons.Edit,
    contentDescription = null,
    size = 18.dp,
    tint = PrismTheme.colors.accent,
)
```

## 自定义矢量图

`PrismIcons` 为每个内置字形提供类型安全的访问器（例如 `Search`、`Home`、`User`、`More`、`Edit`、`Star`、`Trash`、`Settings`）。对于数据驱动的图标，可按名称查找，或直接以自定义描边宽度构建矢量图。

```kotlin
PrismIcon(PrismIcons.byName("search"), contentDescription = "Search")

PrismIcon(prismIconVector("heart", strokeWidth = 1.5f), contentDescription = null)
```

## API

### `PrismIcon`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `icon` | `ImageVector` | — | 要渲染的矢量字形（例如 `PrismIcons.Star`）。 |
| `contentDescription` | `String?` | — | 无障碍标签；`null` 表示该图标为装饰性元素。 |
| `modifier` | `Modifier` | `Modifier` | 应用于图标的 Modifier。 |
| `size` | `Dp` | `24.dp` | 图标的正方形尺寸。 |
| `tint` | `Color` | `LocalContentColor.current` | 应用于字形的颜色。 |

### `prismIconVector`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `name` | `String` | — | 内置图标键名（例如 `"search"`）。 |
| `strokeWidth` | `Float` | `2f` | 所生成路径的描边宽度。 |

> 假定外层存在 `PrismTheme { }`，由它提供继承的内容颜色。
