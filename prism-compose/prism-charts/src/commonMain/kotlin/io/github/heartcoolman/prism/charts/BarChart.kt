package io.github.heartcoolman.prism.charts

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

data class PrismBarDatum(val label: String, val value: Float)

private fun fmt(v: Float): String = if (v % 1f == 0f) v.toInt().toString() else v.toString()

/**
 * Restrained vertical bar chart (plan §4.3): bars share width, rise proportionally
 * to the series max, one accent bar (max by default). No axes/gridlines.
 */
@Composable
fun PrismBarChart(
    data: List<PrismBarDatum>,
    modifier: Modifier = Modifier,
    highlightIndex: Int? = null,
    height: Dp = 160.dp,
    showValues: Boolean = false,
) {
    val max = data.maxOfOrNull { it.value } ?: 0f
    val accentIndex = highlightIndex ?: data.indexOfFirst { it.value == max }
    val summary = "柱状图，共 ${data.size} 项，最大值 ${fmt(max)}"

    Row(
        modifier = modifier.semantics { contentDescription = summary },
        horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2),
        verticalAlignment = Alignment.Bottom,
    ) {
        data.forEachIndexed { i, d ->
            val pct = if (max > 0f) (d.value / max).coerceIn(0.004f, 1f) else 0.004f
            val highlighted = i == accentIndex
            Column(
                modifier = Modifier.weight(1f),
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                Box(
                    modifier = Modifier.height(height).fillMaxWidth(),
                    contentAlignment = Alignment.BottomCenter,
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Bottom) {
                        if (showValues && highlighted) {
                            Text(fmt(d.value), style = PrismTheme.typography.footnote, color = PrismTheme.colors.accent)
                        }
                        Box(
                            modifier = Modifier
                                .fillMaxWidth(0.7f)
                                .fillMaxHeight(pct)
                                .clip(RoundedCornerShape(PrismTheme.radius.sm))
                                .background(if (highlighted) PrismTheme.colors.accent else PrismTheme.colors.fillTertiary),
                        )
                    }
                }
                Text(
                    text = d.label,
                    style = PrismTheme.typography.footnote,
                    color = PrismTheme.colors.labelSecondary,
                    modifier = Modifier.padding(top = PrismTheme.spacing.s1),
                )
            }
        }
    }
}
