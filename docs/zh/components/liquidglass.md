# LiquidGlass

一种漂浮于 UI 之上的半透明动态材质——基于 Prism 材质表面构建的圆角、抬升的胶囊。仅用于浮动的控制层（导航、工具栏、弹出框）；切勿玻璃叠玻璃，也切勿全屏使用。

## 导入

```kotlin
import io.github.heartcoolman.prism.glass.PrismLiquidGlass
```

## 基本用法

```kotlin
PrismLiquidGlass {
    Text("Liquid glass", modifier = Modifier.padding(PrismTheme.spacing.s4))
}
```

## 胶囊形状

为浮动工具栏和胶囊控件设置 `pill = true`。默认形状使用主题的卡片圆角半径。

```kotlin
PrismLiquidGlass(pill = true) {
    Text("Liquid glass", modifier = Modifier.padding(PrismTheme.spacing.s4))
}
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | 应用于浮动 `Box` 的 Modifier。 |
| `pill` | `Boolean` | `false` | 为 `true` 时使用胶囊（50% 圆角）形状；否则使用 `PrismTheme.radius.card`。 |
| `content` | `@Composable BoxScope.() -> Unit` | — | 渲染在玻璃内部的内容。 |

> 基于 `Thin` 材质层级加上 `PrismTheme.elevation.level3` 阴影构建。假定外层包裹了 `PrismTheme { }`。
