package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.selection.selectableGroup
import androidx.compose.material3.RadioButton
import androidx.compose.material3.RadioButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role
import io.github.heartcoolman.prism.core.PrismTheme

/**
 * Radio — single circular control. Maps to Material3 [RadioButton]; an optional
 * [label] makes the row selectable. For single-choice fields use [PrismRadioGroup].
 */
@Composable
fun PrismRadio(
    selected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    label: String? = null,
) {
    val colors = PrismTheme.colors
    val radioColors = RadioButtonDefaults.colors(
        selectedColor = colors.accent,
        unselectedColor = colors.labelTertiary,
    )
    if (label == null) {
        RadioButton(
            selected = selected,
            onClick = onClick,
            modifier = modifier,
            enabled = enabled,
            colors = radioColors,
        )
    } else {
        Row(
            modifier = modifier.selectable(
                selected = selected,
                enabled = enabled,
                role = Role.RadioButton,
                onClick = onClick,
            ),
            horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            RadioButton(selected = selected, onClick = null, enabled = enabled, colors = radioColors)
            Text(text = label, style = PrismTheme.typography.body, color = colors.labelPrimary)
        }
    }
}

enum class PrismRadioOrientation { Vertical, Horizontal }

/** One option in a [PrismRadioGroup]. */
data class PrismRadioOption(
    val value: String,
    val label: String,
    val enabled: Boolean = true,
)

/**
 * RadioGroup — single-choice set over [options]. Reports the newly selected
 * value via [onValueChange]; lays out [PrismRadio] rows in the given orientation.
 */
@Composable
fun PrismRadioGroup(
    value: String,
    onValueChange: (String) -> Unit,
    options: List<PrismRadioOption>,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    orientation: PrismRadioOrientation = PrismRadioOrientation.Vertical,
) {
    val item: @Composable (PrismRadioOption) -> Unit = { opt ->
        PrismRadio(
            selected = value == opt.value,
            onClick = { onValueChange(opt.value) },
            enabled = enabled && opt.enabled,
            label = opt.label,
        )
    }
    if (orientation == PrismRadioOrientation.Vertical) {
        Column(
            modifier = modifier.selectableGroup(),
            verticalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s3),
        ) {
            options.forEach { item(it) }
        }
    } else {
        Row(
            modifier = modifier.selectableGroup(),
            horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s4),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            options.forEach { item(it) }
        }
    }
}
