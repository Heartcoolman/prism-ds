package io.github.heartcoolman.prism.ui

import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

enum class PrismSkeletonVariant { Text, Rect, Circle }

/** Shared pulse alpha, duration from the motion token (§6 explicit animation). */
@Composable
private fun pulseAlpha(): Float {
    val transition = rememberInfiniteTransition(label = "skeleton")
    val alpha by transition.animateFloat(
        initialValue = 0.35f,
        targetValue = 0.85f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = PrismTheme.motion.durEmphasized),
            repeatMode = RepeatMode.Reverse,
        ),
        label = "skeleton-alpha",
    )
    return alpha
}

/**
 * Pulsing placeholder shown while content loads. `Text` renders `lines` bars
 * (the last tapered to 60% when multi-line); `Rect`/`Circle` use explicit
 * `width`/`height`. Purely decorative.
 */
@Composable
fun PrismSkeleton(
    modifier: Modifier = Modifier,
    variant: PrismSkeletonVariant = PrismSkeletonVariant.Text,
    width: Dp? = null,
    height: Dp = 16.dp,
    lines: Int = 1,
) {
    val alpha = pulseAlpha()
    val fill = PrismTheme.colors.fillTertiary.copy(alpha = alpha)
    val rounded = RoundedCornerShape(PrismTheme.radius.sm)

    when (variant) {
        PrismSkeletonVariant.Text -> {
            val count = lines.coerceAtLeast(1)
            Column(
                modifier = modifier,
                verticalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2),
            ) {
                for (i in 0 until count) {
                    val w = if (i == count - 1 && count > 1) Modifier.fillMaxWidth(0.6f) else Modifier.fillMaxWidth()
                    Box(w.height(12.dp).clip(rounded).background(fill))
                }
            }
        }
        PrismSkeletonVariant.Rect -> {
            val wMod = if (width != null) Modifier.width(width) else Modifier.fillMaxWidth()
            Box(modifier.then(wMod).height(height).clip(rounded).background(fill))
        }
        PrismSkeletonVariant.Circle -> {
            val d = width ?: height
            Box(modifier.size(d).clip(CircleShape).background(fill))
        }
    }
}
