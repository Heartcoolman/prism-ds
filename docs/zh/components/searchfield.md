# SearchField

带填充背景的搜索输入框，前导有放大镜图标，尾部有仅在存在值时才出现的清除按钮。输入框无边框且在三级填充色上透明。用它来过滤或查询列表。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=searchfield" loading="lazy" title="searchfield demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismSearchField
```

## 基本用法

```kotlin
var query by remember { mutableStateOf("") }
PrismSearchField(
    value = query,
    onValueChange = { query = it },
    onClear = { query = "" },
)
```

## 占位符与全宽

`placeholder` 默认为 `"搜索"`。只要 `value` 非空，清除按钮就会自动显示，按下时调用 `onClear`。

```kotlin
PrismSearchField(
    value = query,
    onValueChange = { query = it },
    placeholder = "Search library",
    onClear = { query = "" },
    fullWidth = true,
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `value` | `String` | — | 当前查询文本。 |
| `onValueChange` | `(String) -> Unit` | — | 每次编辑时以新值调用。 |
| `modifier` | `Modifier` | `Modifier` | 应用于字段行的布局 Modifier。 |
| `placeholder` | `String` | `"搜索"` | 值为空时显示的占位符。 |
| `onClear` | `(() -> Unit)?` | `null` | 按下尾部清除按钮时调用。 |
| `enabled` | `Boolean` | `true` | 字段是否接受输入以及清除按钮是否可用。 |
| `fullWidth` | `Boolean` | `false` | 将字段拉伸以填满容器宽度。 |
