package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

enum class PrismSpinnerSize { Sm, Md, Lg }

/**
 * Spinner — Material3 CircularProgressIndicator, accent-colored, 3 sizes.
 * `label` is the accessible status text; set `showLabel` to render it beside
 * the ring (otherwise it stays in semantics only).
 */
@Composable
fun PrismSpinner(
    modifier: Modifier = Modifier,
    size: PrismSpinnerSize = PrismSpinnerSize.Md,
    color: Color = PrismTheme.colors.accent,
    label: String = "加载中",
    showLabel: Boolean = false,
) {
    val d: Dp = when (size) {
        PrismSpinnerSize.Sm -> 16.dp
        PrismSpinnerSize.Md -> 24.dp
        PrismSpinnerSize.Lg -> 36.dp
    }
    val stroke = when (size) {
        PrismSpinnerSize.Sm -> 2.dp
        PrismSpinnerSize.Md -> 3.dp
        PrismSpinnerSize.Lg -> 4.dp
    }
    val ring: @Composable () -> Unit = {
        CircularProgressIndicator(
            modifier = Modifier.size(d),
            color = color,
            strokeWidth = stroke,
            trackColor = PrismTheme.colors.fillTertiary,
        )
    }
    if (showLabel) {
        Row(
            modifier = modifier.semantics { contentDescription = label },
            horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            ring()
            Text(label, style = PrismTheme.typography.subhead, color = PrismTheme.colors.labelSecondary)
        }
    } else {
        Row(modifier = modifier.semantics { contentDescription = label }) { ring() }
    }
}

/**
 * ProgressBar — Material3 LinearProgressIndicator. `progress == null` →
 * indeterminate; otherwise a 0..1 value. `tone` sets the fill color (overridden
 * by an explicit `color`).
 */
@Composable
fun PrismProgressBar(
    modifier: Modifier = Modifier,
    progress: Float? = null,
    tone: PrismTone = PrismTone.Accent,
    color: Color = tone.color(),
) {
    val track = PrismTheme.colors.fillTertiary
    if (progress == null) {
        LinearProgressIndicator(
            modifier = modifier.fillMaxWidth(),
            color = color,
            trackColor = track,
        )
    } else {
        LinearProgressIndicator(
            progress = { progress.coerceIn(0f, 1f) },
            modifier = modifier.fillMaxWidth(),
            color = color,
            trackColor = track,
        )
    }
}
