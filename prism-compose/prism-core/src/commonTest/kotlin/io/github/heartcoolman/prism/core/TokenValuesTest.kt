package io.github.heartcoolman.prism.core

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import io.github.heartcoolman.prism.core.tokens.appleBrand
import io.github.heartcoolman.prism.core.tokens.darkPrismColors
import io.github.heartcoolman.prism.core.tokens.lightPrismColors
import io.github.heartcoolman.prism.core.tokens.neutralBrand
import io.github.heartcoolman.prism.core.tokens.prismRadius
import io.github.heartcoolman.prism.core.tokens.prismSpacing
import io.github.heartcoolman.prism.core.tokens.prismTypography
import io.github.heartcoolman.prism.core.tokens.withBrand
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals

/**
 * Cross-verification that the generated Kotlin tokens carry the exact values from
 * the single source (tokens/prism-tokens.json), i.e. value parity with the web CSS.
 */
class TokenValuesTest {

    @Test
    fun lightAccentIsAppleBlue() {
        assertEquals(Color(0xFF0066CC), lightPrismColors.accent)
    }

    @Test
    fun darkAccentIsBrighterBlue() {
        assertEquals(Color(0xFF3393FF), darkPrismColors.accent)
        assertNotEquals(lightPrismColors.accent, darkPrismColors.accent)
    }

    @Test
    fun darkSharesNonOverriddenTokens() {
        // labelOnAccent is only defined for light; dark inherits it.
        assertEquals(Color(0xFFFFFFFF), darkPrismColors.labelOnAccent)
    }

    @Test
    fun spacingScaleIsFourBased() {
        assertEquals(4.dp, prismSpacing.s1)
        assertEquals(16.dp, prismSpacing.s4)
        assertEquals(64.dp, prismSpacing.s7)
    }

    @Test
    fun radiusPillIsFullPill() {
        assertEquals(980.dp, prismRadius.pill)
        assertEquals(18.dp, prismRadius.card)
    }

    @Test
    fun bodyTypographyMatchesSource() {
        assertEquals(17.sp, prismTypography.body.fontSize)
        assertEquals(34.sp, prismTypography.largeTitle.fontSize)
    }

    @Test
    fun appleBrandIsIdempotentOnDefaults() {
        // Applying the default (apple) brand must not change the apple-derived base.
        assertEquals(lightPrismColors.accent, lightPrismColors.withBrand(appleBrand).accent)
    }

    @Test
    fun neutralBrandOverridesAccentButNotBackground() {
        val branded = lightPrismColors.withBrand(neutralBrand)
        assertEquals(Color(0xFF4F46E5), branded.accent)
        // Non-brand tokens (background) stay put.
        assertEquals(lightPrismColors.bg, branded.bg)
    }

    @Test
    fun neutralBrandTightensRadii() {
        val r = prismRadius.withBrand(neutralBrand)
        assertEquals(8.dp, r.pill)
        assertNotEquals(prismRadius.pill, r.pill)
    }
}
