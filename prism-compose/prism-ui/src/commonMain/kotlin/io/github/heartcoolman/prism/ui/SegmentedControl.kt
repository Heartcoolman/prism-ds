package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

enum class PrismSegmentedSize { Small, Medium }

/** One segment descriptor. */
data class PrismSegmentedOption(val value: String, val label: String)

/**
 * SegmentedControl — iOS-style single-select group of equal segments over a
 * tertiary-fill track; the selected segment lifts onto a `bg` pill (no sliding
 * indicator — each segment toggles its own background). Controlled.
 */
@Composable
fun PrismSegmentedControl(
    options: List<PrismSegmentedOption>,
    value: String,
    onChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    size: PrismSegmentedSize = PrismSegmentedSize.Medium,
    fullWidth: Boolean = false,
) {
    val colors = PrismTheme.colors
    val segShape = RoundedCornerShape(PrismTheme.radius.sm)
    val segHeight = when (size) {
        PrismSegmentedSize.Small -> PrismTheme.dimensions.controlHeightSm - 4.dp
        PrismSegmentedSize.Medium -> PrismTheme.dimensions.controlHeightMd - 4.dp
    }
    val hPad = if (size == PrismSegmentedSize.Small) PrismTheme.spacing.s2 else PrismTheme.spacing.s3
    val textStyle =
        if (size == PrismSegmentedSize.Small) PrismTheme.typography.footnote else PrismTheme.typography.subhead

    Row(
        modifier = modifier
            .then(if (fullWidth) Modifier.fillMaxWidth() else Modifier)
            .clip(RoundedCornerShape(PrismTheme.radius.input))
            .background(colors.fillTertiary)
            .padding(2.dp),
        horizontalArrangement = Arrangement.spacedBy(2.dp),
    ) {
        options.forEach { option ->
            val selected = option.value == value
            Box(
                modifier = (if (fullWidth) Modifier.weight(1f) else Modifier)
                    .then(
                        if (selected) {
                            Modifier.shadow(PrismTheme.elevation.level1, segShape).background(colors.bg)
                        } else {
                            Modifier.clip(segShape)
                        },
                    )
                    .selectable(
                        selected = selected,
                        role = Role.Tab,
                        onClick = { onChange(option.value) },
                    )
                    .defaultMinSize(minHeight = segHeight)
                    .padding(horizontal = hPad),
                contentAlignment = Alignment.Center,
            ) {
                Text(
                    text = option.label,
                    style = textStyle,
                    color = if (selected) colors.labelPrimary else colors.labelSecondary,
                    fontWeight = FontWeight.Medium,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
            }
        }
    }
}
