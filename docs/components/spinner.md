# Spinner

An activity spinner — a continuously rotating accent-colored ring indicating indeterminate progress, in three sizes. `label` is the accessible status text; set `showLabel` to render it beside the ring (otherwise it stays in semantics only).

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismSpinner
```

## Basic usage

```kotlin
PrismSpinner()
```

## Sizes

```kotlin
PrismSpinner(size = PrismSpinnerSize.Sm)
PrismSpinner(size = PrismSpinnerSize.Md)
PrismSpinner(size = PrismSpinnerSize.Lg)
```

## Visible label and custom color

```kotlin
PrismSpinner(
    label = "Loading projects",
    showLabel = true,
    color = PrismTheme.colors.accent,
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | Layout/visual modifier. |
| `size` | `PrismSpinnerSize` | `PrismSpinnerSize.Md` | Ring diameter: `Sm` (16dp), `Md` (24dp), `Lg` (36dp). |
| `color` | `Color` | `PrismTheme.colors.accent` | Ring color. |
| `label` | `String` | `"加载中"` | Accessible status text; also the visible caption when `showLabel` is `true`. |
| `showLabel` | `Boolean` | `false` | Render the label beside the ring instead of semantics-only. |

### Enum

```kotlin
enum class PrismSpinnerSize { Sm, Md, Lg }
```

All components assume an enclosing `PrismTheme { }`. See [Styling](/styling) for theming details.
