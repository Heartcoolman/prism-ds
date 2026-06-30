package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.selection.triStateToggleable
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TriStateCheckbox
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.state.ToggleableState
import io.github.heartcoolman.prism.core.PrismTheme

/**
 * Checkbox — checked / indeterminate / disabled. Maps to Material3
 * [TriStateCheckbox]; [indeterminate] takes precedence and renders the dash.
 * An optional [label] makes the row toggleable (the box becomes presentational).
 */
@Composable
fun PrismCheckbox(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    indeterminate: Boolean = false,
    label: String? = null,
) {
    val colors = PrismTheme.colors
    val state = when {
        indeterminate -> ToggleableState.Indeterminate
        checked -> ToggleableState.On
        else -> ToggleableState.Off
    }
    val checkboxColors = CheckboxDefaults.colors(
        checkedColor = colors.accent,
        uncheckedColor = colors.labelTertiary,
        checkmarkColor = colors.labelOnAccent,
    )
    val onClick = { onCheckedChange(!checked) }

    if (label == null) {
        TriStateCheckbox(
            state = state,
            onClick = onClick,
            modifier = modifier,
            enabled = enabled,
            colors = checkboxColors,
        )
    } else {
        Row(
            modifier = modifier.triStateToggleable(
                state = state,
                enabled = enabled,
                role = Role.Checkbox,
                onClick = onClick,
            ),
            horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            TriStateCheckbox(
                state = state,
                onClick = null,
                enabled = enabled,
                colors = checkboxColors,
            )
            Text(text = label, style = PrismTheme.typography.body, color = colors.labelPrimary)
        }
    }
}
