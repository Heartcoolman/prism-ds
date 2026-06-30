// Prism token schema (hand-written, stable API). The *values* live in the
// generated PrismGeneratedTokens.kt, produced from tokens/prism-tokens.json.
// See COMPOSE-MIGRATION.md §3.
package io.github.heartcoolman.prism.core.tokens

import androidx.compose.animation.core.Easing
import androidx.compose.runtime.Immutable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.Dp

enum class PrismColorScheme { Light, Dark }

/** Semantic color tokens (the only theme-dependent layer). Mirrors tokens.css. */
@Immutable
data class PrismColors(
    val accent: Color,
    val accentHover: Color,
    val accentPressed: Color,
    val success: Color,
    val warning: Color,
    val danger: Color,
    val bg: Color,
    val bgElevated: Color,
    val bgSecondary: Color,
    val bgOverlay: Color,
    val labelPrimary: Color,
    val labelSecondary: Color,
    val labelTertiary: Color,
    val labelQuaternary: Color,
    val labelOnAccent: Color,
    val separator: Color,
    val separatorOpaque: Color,
    val fillSecondary: Color,
    val fillTertiary: Color,
    val fillQuaternary: Color,
    val tintAccentBg: Color,
    val tintSuccessBg: Color,
    val tintWarningBg: Color,
    val tintDangerBg: Color,
    val materialBg: Color,
    val focusRing: Color,
)

@Immutable
data class PrismTypography(
    val largeTitle: TextStyle,
    val title1: TextStyle,
    val title2: TextStyle,
    val headline: TextStyle,
    val body: TextStyle,
    val subhead: TextStyle,
    val footnote: TextStyle,
)

/** 4-based spacing scale (8pt rhythm). Shared across light/dark. */
@Immutable
data class PrismSpacing(
    val s1: Dp,
    val s2: Dp,
    val s3: Dp,
    val s4: Dp,
    val s5: Dp,
    val s6: Dp,
    val s7: Dp,
)

@Immutable
data class PrismRadius(
    val pill: Dp,
    val card: Dp,
    val modal: Dp,
    val sheet: Dp,
    val input: Dp,
    val inner: Dp,
    val image: Dp,
    val sm: Dp,
)

/** Compose elevation (Dp) — an approximation of the web box-shadow ladder. */
@Immutable
data class PrismElevation(
    val level1: Dp,
    val level2: Dp,
    val level3: Dp,
    val level4: Dp,
    val card: Dp,
)

@Immutable
data class PrismMotion(
    val easeStandard: Easing,
    val easeEnter: Easing,
    val easeExit: Easing,
    val easeEmphasized: Easing,
    val durStandard: Int,
    val durEnter: Int,
    val durExit: Int,
    val durEmphasized: Int,
)

@Immutable
data class PrismDimensions(
    val sizeTouch: Dp,
    val controlHeightSm: Dp,
    val controlHeightMd: Dp,
    val controlHeightLg: Dp,
    val focusRingWidth: Dp,
)

/** Glass/material blur radii. Theme-independent. Consumed by prism-glass. */
@Immutable
data class PrismMaterials(
    val blurThin: Dp,
    val blurRegular: Dp,
    val blurThick: Dp,
)

/**
 * Brand override — the Compose equivalent of the web `ThemeProvider theme` prop
 * / presets.ts. Overrides accent + status colors and the radius geometry on top
 * of the base color scheme.
 */
@Immutable
data class PrismBrand(
    val accent: Color,
    val accentHover: Color,
    val accentPressed: Color,
    val success: Color,
    val warning: Color,
    val danger: Color,
    val radiusPill: Dp,
    val radiusCard: Dp,
    val radiusModal: Dp,
    val radiusInput: Dp,
    val radiusImage: Dp,
    val radiusSm: Dp,
)

/** Apply brand overrides to a base color scheme (accent + status colors only). */
fun PrismColors.withBrand(b: PrismBrand): PrismColors = copy(
    accent = b.accent,
    accentHover = b.accentHover,
    accentPressed = b.accentPressed,
    success = b.success,
    warning = b.warning,
    danger = b.danger,
)

/** Apply brand radius geometry. The web brand exposes one `radiusModal` shared by modal + sheet. */
fun PrismRadius.withBrand(b: PrismBrand): PrismRadius = copy(
    pill = b.radiusPill,
    card = b.radiusCard,
    modal = b.radiusModal,
    sheet = b.radiusModal,
    input = b.radiusInput,
    inner = b.radiusInput,
    image = b.radiusImage,
    sm = b.radiusSm,
)
