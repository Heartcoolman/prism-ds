# Grid

响应式布局栅格，将各项排入等宽的轨道中。不指定 `columns` 时，它会根据可用宽度自适应（小于 600dp 为 4 列，小于 1024dp 为 8 列，否则为 12 列）。指定 `columns` 时则精确渲染相应数量的轨道。最后一行会用空轨道补齐，以保持宽度均匀。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=grid" loading="lazy" title="grid demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismGrid
```

## Basic usage

```kotlin
PrismGrid(items = listOf("A", "B", "C", "D"), columns = 2) { item ->
    Text(item)
}
```

## Responsive

省略 `columns`，让栅格根据可用宽度自行选择轨道数量。

```kotlin
PrismGrid(items = products) { product ->
    PrismCard { Text(product.name) }
}
```

## Custom gap

`gap` 默认为 `PrismTheme.spacing.s5`；传入任意 `Dp` 即可覆盖。

```kotlin
PrismGrid(
    items = listOf(1, 2, 3, 4, 5, 6),
    columns = 3,
    gap = PrismTheme.spacing.s3,
) { n ->
    Text("Item $n")
}
```

## API

### PrismGrid

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `items` | `List<T>` | — | 按顺序渲染到栅格中的各项。 |
| `modifier` | `Modifier` | `Modifier` | 应用于根容器的 Modifier。 |
| `columns` | `Int?` | `null` | 固定轨道数量；为 null 时栅格自适应（4 / 8 / 12）。 |
| `gap` | `Dp` | `Dp.Unspecified` | 轨道与行之间的间距；未指定时回退为 `spacing.s5`。 |
| `itemContent` | `@Composable (T) -> Unit` | — | 为每一项渲染的内容。 |
