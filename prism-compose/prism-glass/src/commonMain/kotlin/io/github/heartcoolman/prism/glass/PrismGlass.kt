// prism-glass — the risk-isolated material layer (plan §2/§5).
//
// HONEST SCOPE: this ships the *translucent-material approximation* tier that
// compiles on every Compose target (desktop/iOS/Android/web) with no extra
// dependency. It is NOT a live backdrop blur. The production Android path is
// Haze (`dev.chrisbanes.haze`, RenderEffect.createBlurEffect, API 31+) and the
// iOS/Desktop path is a Skia runtime shader — both plug in behind THIS SAME API
// (`Modifier.prismMaterial` / `PrismMaterial` / `PrismLiquidGlass`) without
// touching call sites. Per §5 the App-side glass is an *approximation* of
// Apple-native glass by design; this is the always-available baseline tier.
package io.github.heartcoolman.prism.glass

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

/** Blur strength tier; thickens with elevation (nav < popover < sheet). */
enum class MaterialThickness { UltraThin, Thin, Regular, Thick }

private fun MaterialThickness.alphaScale(): Float = when (this) {
    MaterialThickness.UltraThin -> 0.70f
    MaterialThickness.Thin -> 0.85f
    MaterialThickness.Regular -> 1.00f
    MaterialThickness.Thick -> 1.15f
}

/**
 * Apply the Prism frosted-material surface to any composable. Uses the
 * `materialBg` token (theme-aware translucency) + a hairline highlight.
 * `progressive` ramps the material to clear along the bottom edge (for bars
 * that dissolve content rather than ending on a hard line).
 */
@Composable
fun Modifier.prismMaterial(
    thickness: MaterialThickness = MaterialThickness.Regular,
    shape: Shape = RectangleShape,
    progressive: Boolean = false,
): Modifier {
    val base = PrismTheme.colors.materialBg
    val mat = base.copy(alpha = (base.alpha * thickness.alphaScale()).coerceIn(0f, 1f))
    val fill = if (progressive) {
        Modifier.background(
            brush = Brush.verticalGradient(listOf(mat, mat.copy(alpha = 0f))),
            shape = shape,
        )
    } else {
        Modifier.background(color = mat, shape = shape)
    }
    return this
        .clip(shape)
        .then(fill)
        .border(1.dp, PrismTheme.colors.separator, shape)
}

/**
 * Frosted-glass surface (web `Material`). Floating chrome — nav bars, popovers,
 * bottom sheets. Layered, never opaque.
 */
@Composable
fun PrismMaterial(
    modifier: Modifier = Modifier,
    thickness: MaterialThickness = MaterialThickness.Regular,
    shape: Shape = RectangleShape,
    progressive: Boolean = false,
    content: @Composable BoxScope.() -> Unit,
) {
    Box(modifier = modifier.prismMaterial(thickness, shape, progressive), content = content)
}

/**
 * Liquid Glass (web `LiquidGlass`) — a translucent capsule that floats above the
 * UI. Use ONLY for floating control layers (nav, toolbars, popovers); never
 * glass-on-glass, never full-screen.
 */
@Composable
fun PrismLiquidGlass(
    modifier: Modifier = Modifier,
    pill: Boolean = false,
    content: @Composable BoxScope.() -> Unit,
) {
    val shape: Shape = if (pill) RoundedCornerShape(percent = 50) else RoundedCornerShape(PrismTheme.radius.card)
    Box(
        modifier = modifier
            .shadow(elevation = PrismTheme.elevation.level3, shape = shape, clip = false)
            .prismMaterial(MaterialThickness.Thin, shape),
        content = content,
    )
}
