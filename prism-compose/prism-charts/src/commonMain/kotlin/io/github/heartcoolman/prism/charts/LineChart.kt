package io.github.heartcoolman.prism.charts

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

/**
 * Trend line chart (plan §4.3 Hard). Scales `data` into the viewport, draws a
 * rounded accent polyline + optional accent→transparent area fill + end dot.
 * Replaces the web inline-SVG with a Compose Canvas.
 */
@Composable
fun PrismLineChart(
    data: List<Float>,
    modifier: Modifier = Modifier,
    width: Dp = 260.dp,
    height: Dp = 96.dp,
    area: Boolean = false,
    strokeWidth: Dp = 2.dp,
    contentDescription: String = "趋势图",
) {
    val accent = PrismTheme.colors.accent
    Canvas(
        modifier = modifier
            .size(width, height)
            .semantics { this.contentDescription = contentDescription },
    ) {
        val n = data.size
        if (n == 0) return@Canvas
        val pad = 6.dp.toPx()
        val min = data.minOrNull() ?: 0f
        val max = data.maxOrNull() ?: 0f
        val span = (max - min).let { if (it == 0f) 1f else it }
        val innerW = size.width - pad * 2
        val innerH = size.height - pad * 2
        val baseline = size.height - pad

        val pts = data.mapIndexed { i, v ->
            val x = if (n > 1) pad + innerW * i / (n - 1) else size.width / 2
            val y = pad + innerH * (1f - (v - min) / span)
            Offset(x, y)
        }

        if (area && pts.isNotEmpty()) {
            val areaPath = Path().apply {
                moveTo(pts.first().x, baseline)
                pts.forEach { lineTo(it.x, it.y) }
                lineTo(pts.last().x, baseline)
                close()
            }
            drawPath(
                path = areaPath,
                brush = Brush.verticalGradient(
                    colors = listOf(accent.copy(alpha = 0.28f), accent.copy(alpha = 0f)),
                    startY = pad,
                    endY = baseline,
                ),
            )
        }

        val linePath = Path().apply {
            moveTo(pts.first().x, pts.first().y)
            pts.drop(1).forEach { lineTo(it.x, it.y) }
        }
        drawPath(
            path = linePath,
            color = accent,
            style = Stroke(width = strokeWidth.toPx(), cap = StrokeCap.Round, join = StrokeJoin.Round),
        )
        drawCircle(color = accent, radius = 3.dp.toPx(), center = pts.last())
    }
}
