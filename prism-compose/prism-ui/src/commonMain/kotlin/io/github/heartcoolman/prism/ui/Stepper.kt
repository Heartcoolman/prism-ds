package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.IconButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.icons.PrismIcon
import io.github.heartcoolman.prism.icons.PrismIcons

/**
 * Stepper — segmented [−] value [+] control. Adjusts [value] by [step] within
 * [min]/[max]; each button disables at its bound. Reports via [onValueChange].
 */
@Composable
fun PrismStepper(
    value: Int,
    onValueChange: (Int) -> Unit,
    modifier: Modifier = Modifier,
    min: Int = Int.MIN_VALUE,
    max: Int = Int.MAX_VALUE,
    step: Int = 1,
    enabled: Boolean = true,
) {
    val colors = PrismTheme.colors
    val dims = PrismTheme.dimensions
    val atMin = value <= min
    val atMax = value >= max
    val divider: @Composable () -> Unit = {
        Box(modifier = Modifier.width(1.dp).fillMaxHeight().background(colors.separator))
    }

    Surface(
        modifier = modifier.then(if (enabled) Modifier else Modifier.alpha(0.45f)),
        shape = RoundedCornerShape(PrismTheme.radius.input),
        color = colors.fillTertiary,
        contentColor = colors.labelPrimary,
    ) {
        Row(
            modifier = Modifier.height(dims.sizeTouch),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            IconButton(
                onClick = { onValueChange((value - step).coerceAtLeast(min)) },
                enabled = enabled && !atMin,
            ) {
                PrismIcon(
                    PrismIcons.Minus,
                    contentDescription = "Decrement",
                    size = 18.dp,
                    tint = if (enabled && !atMin) colors.accent else colors.labelQuaternary,
                )
            }
            divider()
            Box(
                modifier = Modifier
                    .defaultMinSize(minWidth = PrismTheme.spacing.s7)
                    .padding(horizontal = PrismTheme.spacing.s3),
                contentAlignment = Alignment.Center,
            ) {
                Text(text = value.toString(), style = PrismTheme.typography.body, color = colors.labelPrimary)
            }
            divider()
            IconButton(
                onClick = { onValueChange((value + step).coerceAtMost(max)) },
                enabled = enabled && !atMax,
            ) {
                PrismIcon(
                    PrismIcons.Plus,
                    contentDescription = "Increment",
                    size = 18.dp,
                    tint = if (enabled && !atMax) colors.accent else colors.labelQuaternary,
                )
            }
        }
    }
}
