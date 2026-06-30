# Select

基于选项列表的带标签下拉框。标签位于上方；帮助或错误文本位于下方。只读的锚点显示已选选项和一个旋转的箭头。用它来从一个小型的、已知的集合中选择一个值。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=select" loading="lazy" title="select demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismSelect
```

## 基本用法

```kotlin
var fruit by remember { mutableStateOf("Apple") }
PrismSelect(
    value = fruit,
    onValueChange = { fruit = it },
    options = listOf("Apple", "Banana", "Cherry"),
    label = "Fruit",
)
```

## 类型化选项

`PrismSelect` 对 `T` 是泛型的。提供 `optionLabel` 将每个选项映射到其显示字符串；默认使用 `toString()`。

```kotlin
data class Country(val code: String, val name: String)

var country by remember { mutableStateOf(Country("US", "United States")) }
PrismSelect(
    value = country,
    onValueChange = { country = it },
    options = listOf(
        Country("US", "United States"),
        Country("JP", "Japan"),
    ),
    label = "Country",
    optionLabel = { it.name },
)
```

## 错误状态

非空的 `error` 会将边框和消息切换为危险样式，并替换 `helpText`。

```kotlin
PrismSelect(
    value = fruit,
    onValueChange = { fruit = it },
    options = listOf("Apple", "Banana"),
    label = "Fruit",
    error = "Please choose a fruit.",
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `value` | `T` | — | 当前选中的选项。 |
| `onValueChange` | `(T) -> Unit` | — | 以所选选项调用。 |
| `options` | `List<T>` | — | 下拉菜单中显示的选项。 |
| `modifier` | `Modifier` | `Modifier` | 应用于该列的布局 Modifier。 |
| `label` | `String?` | `null` | 渲染在控件上方的标签。 |
| `placeholder` | `String?` | `null` | 适用时显示在锚点中的占位符。 |
| `helpText` | `String?` | `null` | 非错误状态时显示在下方的辅助文本。 |
| `error` | `String?` | `null` | 错误消息；非空时将字段切换到错误状态并替换 `helpText`。 |
| `enabled` | `Boolean` | `true` | 下拉框是否可以打开。 |
| `fullWidth` | `Boolean` | `false` | 将控件拉伸以填满容器宽度。 |
| `optionLabel` | `(T) -> String` | `{ it.toString() }` | 将选项映射到其显示字符串。 |
