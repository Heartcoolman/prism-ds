# PageControl

一行页面圆点，当前页以更宽的强调色胶囊形状高亮显示。用它来指示在分页轮播或引导流程中的位置。提供 `onChange` 即可让圆点可点击。

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismPageControl
```

## 基本用法

```kotlin
PrismPageControl(count = 4, activeIndex = 1)
```

## 交互式

提供 `onChange` 时，每个圆点都会变成可点击的标签并报告所选索引；否则这一行纯粹是装饰性的。

```kotlin
var page by remember { mutableStateOf(0) }
PrismPageControl(
    count = 5,
    activeIndex = page,
    onChange = { page = it },
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `count` | `Int` | — | 页面（圆点）总数。 |
| `activeIndex` | `Int` | — | 当前页面的从零开始的索引。 |
| `modifier` | `Modifier` | `Modifier` | 应用于圆点行的布局 Modifier。 |
| `onChange` | `((Int) -> Unit)?` | `null` | 提供时，圆点变为可点击并报告所选索引。 |
