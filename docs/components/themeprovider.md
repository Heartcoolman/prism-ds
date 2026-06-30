# ThemeProvider

The root theme entry point. `PrismTheme` provides every Prism design token (colors, typography, spacing, radius, elevation, motion, materials) plus a Material3 base, so all Prism and Material3 controls resolve correctly. Wrap your app (or any rendered subtree) in it. See [Styling](/styling) for token details and brand overrides.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=themeprovider" loading="lazy" title="themeprovider demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.core.PrismTheme
```

## Basic usage

By default it follows the system dark/light setting and uses the Apple brand.

```kotlin
PrismTheme {
    // Tokens are now available: PrismTheme.colors.accent, PrismTheme.spacing.s4, …
    App()
}
```

## Color scheme

Force a specific scheme with `colorScheme`.

```kotlin
import io.github.heartcoolman.prism.core.tokens.PrismColorScheme

PrismTheme(colorScheme = PrismColorScheme.Dark) {
    App()
}
```

## Brand override

Pass a `PrismBrand` to override accent + status colors and radius geometry. The
default is `appleBrand`.

```kotlin
import io.github.heartcoolman.prism.core.tokens.appleBrand

PrismTheme(brand = appleBrand) {
    App()
}
```

## Reading tokens

Inside any composable under `PrismTheme`, read tokens from the `PrismTheme`
object:

```kotlin
Text("Title", style = PrismTheme.typography.largeTitle, color = PrismTheme.colors.accent)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `colorScheme` | `PrismColorScheme` | `if (isSystemInDarkTheme()) PrismColorScheme.Dark else PrismColorScheme.Light` | Light or dark color scheme for the subtree. |
| `brand` | `PrismBrand` | `appleBrand` | Brand override for accent/status colors and radius geometry. |
| `content` | `@Composable () -> Unit` | — | The themed subtree. |

### `PrismColorScheme`

| Value | Description |
|---|---|
| `Light` | Light color scheme. |
| `Dark` | Dark color scheme. |

> `PrismTheme` also exposes the token accessor object `PrismTheme.*` (`colors`, `typography`, `spacing`, `radius`, `elevation`, `motion`, `dimensions`, `materials`). See [Styling](/styling).
