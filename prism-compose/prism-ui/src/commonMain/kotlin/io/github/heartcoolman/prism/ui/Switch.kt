package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.selection.toggleable
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.Role
import io.github.heartcoolman.prism.core.PrismTheme

/**
 * Switch — pill track + sliding white thumb. Off uses a neutral fill, on uses
 * accent. Maps to Material3 [Switch] styled from Prism tokens; an optional
 * [label] makes the whole row toggleable (the control becomes presentational).
 */
@Composable
fun PrismSwitch(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    label: String? = null,
) {
    val colors = PrismTheme.colors
    val switchColors = SwitchDefaults.colors(
        checkedThumbColor = Color.White,
        checkedTrackColor = colors.accent,
        checkedBorderColor = Color.Transparent,
        uncheckedThumbColor = Color.White,
        uncheckedTrackColor = colors.fillTertiary,
        uncheckedBorderColor = Color.Transparent,
    )

    if (label == null) {
        Switch(
            checked = checked,
            onCheckedChange = onCheckedChange,
            modifier = modifier,
            enabled = enabled,
            colors = switchColors,
        )
    } else {
        Row(
            modifier = modifier.toggleable(
                value = checked,
                enabled = enabled,
                role = Role.Switch,
                onValueChange = onCheckedChange,
            ),
            horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Switch(
                checked = checked,
                onCheckedChange = null,
                enabled = enabled,
                colors = switchColors,
            )
            Text(text = label, style = PrismTheme.typography.body, color = colors.labelPrimary)
        }
    }
}
