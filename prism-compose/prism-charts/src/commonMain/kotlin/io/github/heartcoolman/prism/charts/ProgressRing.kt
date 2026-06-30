package io.github.heartcoolman.prism.charts

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

enum class PrismRingTone { Accent, Success, Danger }

/**
 * Circular progress ring (plan §4.2): Canvas drawArc with round caps + center
 * label. Replaces the web conic-gradient + inner-mask. value is 0..100.
 */
@Composable
fun PrismProgressRing(
    value: Float,
    modifier: Modifier = Modifier,
    size: Dp = 96.dp,
    thickness: Dp = 12.dp,
    tone: PrismRingTone = PrismRingTone.Accent,
    label: String? = null,
) {
    val pct = value.coerceIn(0f, 100f)
    val arcColor = when (tone) {
        PrismRingTone.Accent -> PrismTheme.colors.accent
        PrismRingTone.Success -> PrismTheme.colors.success
        PrismRingTone.Danger -> PrismTheme.colors.danger
    }
    val track = PrismTheme.colors.fillTertiary

    Box(
        modifier = modifier
            .size(size)
            .semantics { contentDescription = "${pct.toInt()}%" },
        contentAlignment = Alignment.Center,
    ) {
        Canvas(modifier = Modifier.size(size)) {
            val stroke = Stroke(width = thickness.toPx(), cap = StrokeCap.Round)
            val inset = thickness.toPx() / 2f
            val arc = Size(this.size.width - thickness.toPx(), this.size.height - thickness.toPx())
            val topLeft = Offset(inset, inset)
            drawArc(color = track, startAngle = -90f, sweepAngle = 360f, useCenter = false, topLeft = topLeft, size = arc, style = stroke)
            drawArc(color = arcColor, startAngle = -90f, sweepAngle = 360f * pct / 100f, useCenter = false, topLeft = topLeft, size = arc, style = stroke)
        }
        Text(
            text = label ?: "${pct.toInt()}%",
            style = PrismTheme.typography.title2,
            color = PrismTheme.colors.labelPrimary,
        )
    }
}
