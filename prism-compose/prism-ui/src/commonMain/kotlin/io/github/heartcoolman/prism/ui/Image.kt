package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.LocalContentColor
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.icons.PrismIcon
import io.github.heartcoolman.prism.icons.PrismIcons

enum class PrismImageRatio(internal val value: Float) {
    R16x9(16f / 9f),
    R4x3(4f / 3f),
    R1x1(1f),
    R3x4(3f / 4f),
}

/**
 * Image — fixed aspect-ratio media box with rounded corners, an optional bottom
 * gradient scrim for overlaid text, and a bottom-left content slot. No network
 * loading (use Coil/AsyncImage at the call site); a muted placeholder glyph
 * stands in for the photo here.
 */
@Composable
fun PrismImage(
    modifier: Modifier = Modifier,
    ratio: PrismImageRatio = PrismImageRatio.R16x9,
    radius: Dp = PrismTheme.radius.image,
    overlay: Boolean = false,
    content: (@Composable () -> Unit)? = null,
) {
    val colors = PrismTheme.colors
    Box(
        modifier = modifier
            .fillMaxWidth()
            .aspectRatio(ratio.value)
            .clip(RoundedCornerShape(radius))
            .background(colors.fillTertiary),
    ) {
        PrismIcon(
            PrismIcons.Image,
            contentDescription = null,
            modifier = Modifier.align(Alignment.Center),
            size = 40.dp,
            tint = colors.labelQuaternary,
        )
        if (overlay) {
            Box(
                modifier = Modifier
                    .matchParentSize()
                    .background(
                        Brush.verticalGradient(
                            0f to Color.Transparent,
                            0.4f to Color.Transparent,
                            1f to Color.Black.copy(alpha = 0.4f),
                        ),
                    ),
            )
        }
        if (content != null) {
            Box(
                modifier = Modifier
                    .align(Alignment.BottomStart)
                    .fillMaxWidth()
                    .padding(PrismTheme.spacing.s4),
            ) {
                CompositionLocalProvider(
                    LocalContentColor provides if (overlay) Color.White else colors.labelPrimary,
                    content = content,
                )
            }
        }
    }
}
