# Theming

Prism's theme is a set of `@Immutable` token tables exposed through `CompositionLocal`s and accessed via the `PrismTheme` object. It follows the [custom design system](https://developer.android.com/develop/ui/compose/designsystems/custom) pattern recommended for Compose — not a fork of Material's own theme.

## PrismTheme

```kotlin
@Composable
fun PrismTheme(
    colorScheme: PrismColorScheme = if (isSystemInDarkTheme()) PrismColorScheme.Dark else PrismColorScheme.Light,
    brand: PrismBrand = appleBrand,
    content: @Composable () -> Unit,
)
```

It does two things:

1. **Provides Prism tokens** — `LocalPrismColors`, `LocalPrismTypography`, `LocalPrismSpacing`, `LocalPrismRadius`, `LocalPrismElevation`, `LocalPrismMotion`, `LocalPrismDimensions`, `LocalPrismMaterials`.
2. **Maps onto Material 3** — turns Prism colors into a `ColorScheme` so Material 3 controls (`Switch`, `OutlinedTextField`, `NavigationBar`, …) inherit the brand automatically.

## Reading tokens

```kotlin
@Composable
fun Price(text: String) {
    Text(
        text = text,
        style = PrismTheme.typography.headline,
        color = PrismTheme.colors.accent,
        modifier = Modifier.padding(PrismTheme.spacing.s3),
    )
}
```

| Accessor | Holds |
|---|---|
| `PrismTheme.colors` | 26 semantic colors (`accent`, `bg`, `labelPrimary`, `separator`, `tint*Bg`, `materialBg`, `focusRing`, …) |
| `PrismTheme.typography` | `largeTitle` · `title1` · `title2` · `headline` · `body` · `subhead` · `footnote` |
| `PrismTheme.spacing` | `s1`…`s7` (4-based, 8pt rhythm) |
| `PrismTheme.radius` | `pill` · `card` · `modal` · `sheet` · `input` · `inner` · `image` · `sm` |
| `PrismTheme.elevation` | `level1`…`level4` · `card` |
| `PrismTheme.motion` | easings (`easeStandard`, …) + durations (`durStandard`, …) |
| `PrismTheme.dimensions` | control heights, touch target, focus-ring width |
| `PrismTheme.materials` | blur radii (`blurThin` · `blurRegular` · `blurThick`) |

## Light & dark

`PrismTheme` defaults to the system setting via `isSystemInDarkTheme()`. Force a scheme with the `colorScheme` parameter. Only colors differ between schemes — spacing, radius, type and motion are shared.

## Brand presets

```kotlin
PrismTheme(brand = appleBrand)    { … }   // the default Apple-inspired look
PrismTheme(brand = neutralBrand)  { … }   // calm indigo, tighter geometry
```

A `PrismBrand` overrides accent + status colors and the radius geometry on top of the base scheme — the Compose equivalent of the web `ThemeProvider`'s `theme` prop. Build your own by constructing a `PrismBrand`.

## One token source

The token **values** are generated from a single source of truth — `tokens/prism-tokens.json` — by `tokens/build-tokens.mjs`, which emits **both**:

- the web CSS custom properties (`src/styles/tokens.css`), and
- the Kotlin token data classes (`PrismGeneratedTokens.kt`).

A parity check asserts the generated CSS is value-identical to the production web CSS (107 tokens), so web and Compose can never drift. See [CSS theming (web)](THEMING.md) for the web side.
