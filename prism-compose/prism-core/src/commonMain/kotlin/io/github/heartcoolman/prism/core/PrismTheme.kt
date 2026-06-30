// PrismTheme — the Compose equivalent of the web ThemeProvider (COMPOSE-MIGRATION.md §3).
// Material3 base + Prism CompositionLocals (decision #4): maps Prism tokens into a
// Material3 ColorScheme so Material3 controls take Prism colors, and additionally
// exposes Prism-only tokens (materials, motion, brand accents) via CompositionLocal.
package io.github.heartcoolman.prism.core

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.ColorScheme
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ProvideTextStyle
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.runtime.staticCompositionLocalOf
import io.github.heartcoolman.prism.core.tokens.PrismColorScheme
import io.github.heartcoolman.prism.core.tokens.PrismColors
import io.github.heartcoolman.prism.core.tokens.PrismDimensions
import io.github.heartcoolman.prism.core.tokens.PrismElevation
import io.github.heartcoolman.prism.core.tokens.PrismMaterials
import io.github.heartcoolman.prism.core.tokens.PrismMotion
import io.github.heartcoolman.prism.core.tokens.PrismRadius
import io.github.heartcoolman.prism.core.tokens.PrismSpacing
import io.github.heartcoolman.prism.core.tokens.PrismTypography
import io.github.heartcoolman.prism.core.tokens.PrismBrand
import io.github.heartcoolman.prism.core.tokens.appleBrand
import io.github.heartcoolman.prism.core.tokens.darkPrismColors
import io.github.heartcoolman.prism.core.tokens.lightPrismColors
import io.github.heartcoolman.prism.core.tokens.prismDimensions
import io.github.heartcoolman.prism.core.tokens.prismElevation
import io.github.heartcoolman.prism.core.tokens.prismMaterials
import io.github.heartcoolman.prism.core.tokens.prismMotion
import io.github.heartcoolman.prism.core.tokens.prismRadius
import io.github.heartcoolman.prism.core.tokens.prismSpacing
import io.github.heartcoolman.prism.core.tokens.prismTypography
import io.github.heartcoolman.prism.core.tokens.withBrand

val LocalPrismColors = staticCompositionLocalOf<PrismColors> { error("PrismTheme missing") }
val LocalPrismTypography = staticCompositionLocalOf<PrismTypography> { error("PrismTheme missing") }
val LocalPrismSpacing = staticCompositionLocalOf<PrismSpacing> { error("PrismTheme missing") }
val LocalPrismRadius = staticCompositionLocalOf<PrismRadius> { error("PrismTheme missing") }
val LocalPrismElevation = staticCompositionLocalOf<PrismElevation> { error("PrismTheme missing") }
val LocalPrismMotion = staticCompositionLocalOf<PrismMotion> { error("PrismTheme missing") }
val LocalPrismDimensions = staticCompositionLocalOf<PrismDimensions> { error("PrismTheme missing") }
val LocalPrismMaterials = staticCompositionLocalOf<PrismMaterials> { error("PrismTheme missing") }

/** Access tokens inside composables: `PrismTheme.colors.accent`, `PrismTheme.spacing.s4`, … */
object PrismTheme {
    val colors: PrismColors
        @Composable @ReadOnlyComposable get() = LocalPrismColors.current
    val typography: PrismTypography
        @Composable @ReadOnlyComposable get() = LocalPrismTypography.current
    val spacing: PrismSpacing
        @Composable @ReadOnlyComposable get() = LocalPrismSpacing.current
    val radius: PrismRadius
        @Composable @ReadOnlyComposable get() = LocalPrismRadius.current
    val elevation: PrismElevation
        @Composable @ReadOnlyComposable get() = LocalPrismElevation.current
    val motion: PrismMotion
        @Composable @ReadOnlyComposable get() = LocalPrismMotion.current
    val dimensions: PrismDimensions
        @Composable @ReadOnlyComposable get() = LocalPrismDimensions.current
    val materials: PrismMaterials
        @Composable @ReadOnlyComposable get() = LocalPrismMaterials.current
}

/** Map Prism semantic colors onto a Material3 ColorScheme (§3a) so Material3 controls inherit them. */
fun PrismColors.toMaterial3(isDark: Boolean): ColorScheme {
    val base = if (isDark) darkColorScheme() else lightColorScheme()
    return base.copy(
        primary = accent,
        onPrimary = labelOnAccent,
        secondary = accent,
        background = bg,
        onBackground = labelPrimary,
        surface = bgElevated,
        onSurface = labelPrimary,
        surfaceVariant = fillSecondary,
        onSurfaceVariant = labelSecondary,
        error = danger,
        onError = labelOnAccent,
        outline = separatorOpaque,
        outlineVariant = separator,
    )
}

/**
 * Root theme. Provides Prism tokens + a Material3 base. Defaults to the Apple
 * brand (the library's default look), following the system dark/light setting.
 */
@Composable
fun PrismTheme(
    colorScheme: PrismColorScheme =
        if (isSystemInDarkTheme()) PrismColorScheme.Dark else PrismColorScheme.Light,
    brand: PrismBrand = appleBrand,
    content: @Composable () -> Unit,
) {
    val isDark = colorScheme == PrismColorScheme.Dark
    val colors = (if (isDark) darkPrismColors else lightPrismColors).withBrand(brand)
    val radius = prismRadius.withBrand(brand)

    CompositionLocalProvider(
        LocalPrismColors provides colors,
        LocalPrismTypography provides prismTypography,
        LocalPrismSpacing provides prismSpacing,
        LocalPrismRadius provides radius,
        LocalPrismElevation provides prismElevation,
        LocalPrismMotion provides prismMotion,
        LocalPrismDimensions provides prismDimensions,
        LocalPrismMaterials provides prismMaterials,
        LocalContentColor provides colors.labelPrimary,
    ) {
        MaterialTheme(colorScheme = colors.toMaterial3(isDark)) {
            ProvideTextStyle(prismTypography.body, content)
        }
    }
}
