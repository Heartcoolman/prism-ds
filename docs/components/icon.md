# Icon

Renders a glyph from the built-in icon set as a tinted vector. Decorative by default; pass a `contentDescription` to expose it to screen readers. Inherits the local content color.

## Import

```kotlin
import io.github.heartcoolman.prism.icons.PrismIcon
import io.github.heartcoolman.prism.icons.PrismIcons
```

## Basic usage

```kotlin
PrismIcon(PrismIcons.Star, contentDescription = "star", size = 24.dp)
```

## Decorative icons

When an icon sits next to a text label that already conveys meaning, mark it
decorative by passing `contentDescription = null`.

```kotlin
PrismIcon(PrismIcons.Home, contentDescription = null, size = 24.dp)
```

## Size and tint

`size` sets the square dimension; `tint` defaults to the inherited content
color but can be overridden.

```kotlin
PrismIcon(
    icon = PrismIcons.Edit,
    contentDescription = null,
    size = 18.dp,
    tint = PrismTheme.colors.accent,
)
```

## Custom vectors

`PrismIcons` exposes type-safe accessors for every built-in glyph (e.g.
`Search`, `Home`, `User`, `More`, `Edit`, `Star`, `Trash`, `Settings`). For
data-driven icons, look up by name or build a vector directly with a custom
stroke width.

```kotlin
PrismIcon(PrismIcons.byName("search"), contentDescription = "Search")

PrismIcon(prismIconVector("heart", strokeWidth = 1.5f), contentDescription = null)
```

## API

### `PrismIcon`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `icon` | `ImageVector` | — | The vector glyph to render (e.g. `PrismIcons.Star`). |
| `contentDescription` | `String?` | — | Accessible label; `null` marks the icon decorative. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the icon. |
| `size` | `Dp` | `24.dp` | Square size of the icon. |
| `tint` | `Color` | `LocalContentColor.current` | Color applied to the glyph. |

### `prismIconVector`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `name` | `String` | — | Built-in icon key (e.g. `"search"`). |
| `strokeWidth` | `Float` | `2f` | Stroke width of the generated path. |

> Assumes an enclosing `PrismTheme { }`, which provides the inherited content color.
