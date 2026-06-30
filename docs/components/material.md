# Material

A translucent frosted-glass surface that sits over content and lets it show through — layered, never opaque. Use it for floating chrome such as nav bars, popovers, and bottom sheets.

## Import

```kotlin
import io.github.heartcoolman.prism.glass.PrismMaterial
import io.github.heartcoolman.prism.glass.MaterialThickness
```

## Basic usage

```kotlin
PrismMaterial(thickness = MaterialThickness.Regular) {
    Text("Material", modifier = Modifier.padding(PrismTheme.spacing.s4))
}
```

## Thickness

The material's translucency thickens with elevation (nav < popover < sheet).

```kotlin
PrismMaterial(thickness = MaterialThickness.UltraThin) {
    Text("Nav bar", modifier = Modifier.padding(PrismTheme.spacing.s4))
}

PrismMaterial(thickness = MaterialThickness.Thick) {
    Text("Bottom sheet", modifier = Modifier.padding(PrismTheme.spacing.s4))
}
```

## Shape and progressive edge

Pass a `shape` to clip the surface, and set `progressive = true` to ramp the
material to clear along its bottom edge (for bars that dissolve content rather
than ending on a hard line).

```kotlin
PrismMaterial(
    shape = RoundedCornerShape(PrismTheme.radius.card),
    progressive = true,
) {
    Text("Dissolving bar", modifier = Modifier.padding(PrismTheme.spacing.s4))
}
```

## Modifier form

The same surface is available as a `Modifier` extension when you do not need a
wrapping `Box`:

```kotlin
Box(Modifier.prismMaterial(thickness = MaterialThickness.Thin)) {
    Text("Chrome")
}
```

## API

### `PrismMaterial`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the surface `Box`. |
| `thickness` | `MaterialThickness` | `MaterialThickness.Regular` | Blur/translucency tier; thickens with elevation. |
| `shape` | `Shape` | `RectangleShape` | Shape used to clip and border the surface. |
| `progressive` | `Boolean` | `false` | Ramps the material to clear along the bottom edge. |
| `content` | `@Composable BoxScope.() -> Unit` | — | Content rendered over the material. |

### `MaterialThickness`

| Value | Description |
|---|---|
| `UltraThin` | Lightest translucency (alpha scale 0.70). |
| `Thin` | Light translucency (alpha scale 0.85). |
| `Regular` | Default translucency (alpha scale 1.00). |
| `Thick` | Heaviest translucency (alpha scale 1.15). |

> Assumes an enclosing `PrismTheme { }`; colors are read from `PrismTheme.colors.materialBg` and `PrismTheme.colors.separator`.
