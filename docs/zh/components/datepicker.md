# DatePicker

自包含的日历月份网格，用于选取单个日期。显示的月份由内部管理（依次以 `defaultMonth`、`value`、`today` 作为种子），并通过头部的箭头进行导航。日期运算为纯 Kotlin 实现——不依赖日期库，也不读取系统时钟。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=datepicker" loading="lazy" title="datepicker demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismDatePicker
import io.github.heartcoolman.prism.ui.PrismDate
```

## 基本用法

```kotlin
var date by remember { mutableStateOf<PrismDate?>(null) }

PrismDatePicker(
    value = date,
    onChange = { date = it },
)
```

## 高亮今天

传入 `today` 可为当天加上轮廓。由于不读取时钟，需由你显式提供。`month` 取值为 1-12。

```kotlin
var date by remember { mutableStateOf<PrismDate?>(PrismDate(2026, 6, 30)) }

PrismDatePicker(
    value = date,
    onChange = { date = it },
    today = PrismDate(2026, 6, 30),
)
```

## 设定显示的月份

在没有 `value` 时，用 `defaultMonth` 选择首先打开哪个月份（其中任意一天均可）。

```kotlin
PrismDatePicker(
    value = null,
    onChange = { /* … */ },
    defaultMonth = PrismDate(2026, 1, 1),
)
```

## API

### `PrismDatePicker`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | 应用于表面的 Modifier。 |
| `value` | `PrismDate?` | `null` | 选中的日期，未选中时为 `null`。 |
| `onChange` | `(PrismDate) -> Unit` | `{}` | 以点击的日期触发。 |
| `defaultMonth` | `PrismDate?` | `null` | 首次渲染时显示的月份；回退到 `value`，再回退到 `today`。 |
| `today` | `PrismDate?` | `null` | 加上"今天"轮廓的日期；为 `null` 时不高亮任何内容。 |

### `PrismDate`

| 字段 | 类型 | 说明 |
|---|---|---|
| `year` | `Int` | 完整年份。 |
| `month` | `Int` | 月份，1-12。 |
| `day` | `Int` | 当月的日。 |

> 假定外层存在 `PrismTheme { }`。选中的日期以 `PrismTheme.colors.accent` 填充；今天的轮廓使用相同的强调色。
