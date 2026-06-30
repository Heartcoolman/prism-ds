# LiquidGlass

A translucent dynamic material that floats above the UI — a rounded, elevated capsule built on the Prism material surface. Use it ONLY for floating control layers (nav, toolbars, popovers); never glass-on-glass and never full-screen.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=liquidglass" loading="lazy" title="liquidglass demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.glass.PrismLiquidGlass
```

## Basic usage

```kotlin
PrismLiquidGlass {
    Text("Liquid glass", modifier = Modifier.padding(PrismTheme.spacing.s4))
}
```

## Pill shape

Set `pill = true` for floating toolbars and capsule controls. The default shape
uses the theme's card radius.

```kotlin
PrismLiquidGlass(pill = true) {
    Text("Liquid glass", modifier = Modifier.padding(PrismTheme.spacing.s4))
}
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the floating `Box`. |
| `pill` | `Boolean` | `false` | Capsule (50% rounded) shape when `true`; otherwise `PrismTheme.radius.card`. |
| `content` | `@Composable BoxScope.() -> Unit` | — | Content rendered inside the glass. |

> Built on the `Thin` material tier plus a `PrismTheme.elevation.level3` shadow. Assumes an enclosing `PrismTheme { }`.
