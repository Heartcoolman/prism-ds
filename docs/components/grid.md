# Grid

Responsive layout grid that flows items into equal-width tracks. Without `columns` it adapts to the available width (4 columns below 600dp, 8 below 1024dp, otherwise 12). With `columns` it renders exactly that many tracks. The last row is padded with empty tracks so widths stay even.

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

Omit `columns` to let the grid pick its track count from the available width.

```kotlin
PrismGrid(items = products) { product ->
    PrismCard { Text(product.name) }
}
```

## Custom gap

`gap` defaults to `PrismTheme.spacing.s5`; pass any `Dp` to override.

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

| Parameter | Type | Default | Description |
|---|---|---|---|
| `items` | `List<T>` | — | Items rendered into the grid, in order. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the root container. |
| `columns` | `Int?` | `null` | Fixed track count; when null the grid is responsive (4 / 8 / 12). |
| `gap` | `Dp` | `Dp.Unspecified` | Gap between tracks and rows; falls back to `spacing.s5` when unspecified. |
| `itemContent` | `@Composable (T) -> Unit` | — | Content rendered for each item. |
