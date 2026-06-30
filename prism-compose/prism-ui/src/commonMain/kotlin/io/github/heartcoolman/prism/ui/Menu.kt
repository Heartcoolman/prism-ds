package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Modifier
import io.github.heartcoolman.prism.core.PrismTheme

/** One row or a divider in a [PrismMenu]. */
sealed interface PrismMenuEntry

/** A selectable menu row: label + optional leading icon, danger styling, disabled state. */
data class PrismMenuItem(
    val label: String,
    val icon: (@Composable () -> Unit)? = null,
    val danger: Boolean = false,
    val enabled: Boolean = true,
    val onSelect: () -> Unit = {},
) : PrismMenuEntry

/** A thin divider line between rows. */
object PrismMenuSeparator : PrismMenuEntry

/**
 * Menu — dropdown / context menu of rows with optional leading icons, danger
 * styling and separators. Maps to Material3 DropdownMenu; controlled via
 * [expanded]. Selecting a row runs its `onSelect` then requests dismissal.
 * Anchor it by placing this inside the Box that holds the trigger.
 */
@Composable
fun PrismMenu(
    expanded: Boolean,
    onDismissRequest: () -> Unit,
    items: List<PrismMenuEntry>,
    modifier: Modifier = Modifier,
) {
    val colors = PrismTheme.colors
    DropdownMenu(
        expanded = expanded,
        onDismissRequest = onDismissRequest,
        modifier = modifier,
    ) {
        items.forEach { entry ->
            when (entry) {
                PrismMenuSeparator -> HorizontalDivider(
                    modifier = Modifier.padding(vertical = PrismTheme.spacing.s1),
                    color = colors.separator,
                )
                is PrismMenuItem -> {
                    val textColor = if (entry.danger) colors.danger else colors.labelPrimary
                    val iconColor = if (entry.danger) colors.danger else colors.labelSecondary
                    DropdownMenuItem(
                        text = { Text(entry.label, style = PrismTheme.typography.body, color = textColor) },
                        onClick = {
                            entry.onSelect()
                            onDismissRequest()
                        },
                        enabled = entry.enabled,
                        leadingIcon = entry.icon?.let { icon ->
                            { CompositionLocalProvider(LocalContentColor provides iconColor) { icon() } }
                        },
                    )
                }
            }
        }
    }
}
