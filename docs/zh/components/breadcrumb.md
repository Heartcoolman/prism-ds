# Breadcrumb

面包屑导航，显示通往当前页面的路径——一行由 chevron 分隔的面包屑。当设置了 `onNavigate` 时，非末尾的面包屑为强调色且可点击；末尾的面包屑即当前页面。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=breadcrumb" loading="lazy" title="breadcrumb demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismBreadcrumb
import io.github.heartcoolman.prism.ui.PrismBreadcrumbItem
```

## 基本用法

```kotlin
PrismBreadcrumb(
    items = listOf(
        PrismBreadcrumbItem("Home"),
        PrismBreadcrumbItem("Library"),
        PrismBreadcrumbItem("Item"),
    ),
    onNavigate = { index -> /* navigate to items[index] */ },
)
```

## 静态路径

省略 `onNavigate` 可将面包屑渲染为纯文本（不可点击）。

```kotlin
PrismBreadcrumb(
    items = listOf(
        PrismBreadcrumbItem("Home"),
        PrismBreadcrumbItem("Settings"),
    ),
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `items` | `List<PrismBreadcrumbItem>` | — | 从根到当前页面的有序路径；最后一项为当前页面。 |
| `modifier` | `Modifier` | `Modifier` | 该行的布局 Modifier。 |
| `onNavigate` | `((Int) -> Unit)?` | `null` | 设置后，非末尾的面包屑变为可点击并报告被点击的索引。 |

### PrismBreadcrumbItem

| 字段 | 类型 | 说明 |
|---|---|---|
| `label` | `String` | 面包屑的可见标签。 |
