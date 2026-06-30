package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Slider
import androidx.compose.material3.SliderDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import io.github.heartcoolman.prism.core.PrismTheme
import kotlin.math.roundToInt

/**
 * Slider — accent fill on a pill track. Maps to Material3 [Slider]; an optional
 * [label] and a [showValue] readout render in a header row above the track.
 */
@Composable
fun PrismSlider(
    value: Float,
    onValueChange: (Float) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    valueRange: ClosedFloatingPointRange<Float> = 0f..1f,
    steps: Int = 0,
    label: String? = null,
    showValue: Boolean = false,
    valueText: (Float) -> String = { it.roundToInt().toString() },
    onValueChangeFinished: (() -> Unit)? = null,
) {
    val colors = PrismTheme.colors
    Column(
        modifier = modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2),
    ) {
        if (label != null || showValue) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(
                    text = label ?: "",
                    style = PrismTheme.typography.subhead,
                    color = colors.labelSecondary,
                )
                if (showValue) {
                    Text(
                        text = valueText(value),
                        style = PrismTheme.typography.footnote,
                        color = colors.labelPrimary,
                    )
                }
            }
        }
        Slider(
            value = value,
            onValueChange = onValueChange,
            enabled = enabled,
            valueRange = valueRange,
            steps = steps,
            onValueChangeFinished = onValueChangeFinished,
            colors = SliderDefaults.colors(
                thumbColor = colors.accent,
                activeTrackColor = colors.accent,
                inactiveTrackColor = colors.fillTertiary,
            ),
        )
    }
}
