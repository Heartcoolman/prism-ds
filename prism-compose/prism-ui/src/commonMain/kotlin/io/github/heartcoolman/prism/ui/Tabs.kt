package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.selection.selectable
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.semantics.Role
import io.github.heartcoolman.prism.core.PrismTheme

/** One underline-tab descriptor. */
data class PrismTabItem(val key: String, val label: String)

/**
 * Tabs — a row of tab buttons over a 1px separator track; the active tab is
 * emphasized (weight 600) with a 2px accent underline bar. Controlled.
 * `fullWidth` stretches tabs to share the row equally; otherwise inline-sized.
 */
@Composable
fun PrismTabs(
    tabs: List<PrismTabItem>,
    value: String,
    onChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    fullWidth: Boolean = false,
) {
    val colors = PrismTheme.colors
    val dims = PrismTheme.dimensions
    Box(modifier = modifier.then(if (fullWidth) Modifier.fillMaxWidth() else Modifier)) {
        // Hairline separator under the whole track.
        Box(
            Modifier
                .align(Alignment.BottomStart)
                .fillMaxWidth()
                .height(1.dp)
                .background(colors.separator),
        )
        Row(
            modifier = if (fullWidth) Modifier.fillMaxWidth() else Modifier,
            horizontalArrangement = Arrangement.spacedBy(if (fullWidth) 0.dp else PrismTheme.spacing.s5),
        ) {
            tabs.forEach { tab ->
                val selected = tab.key == value
                Box(
                    modifier = (if (fullWidth) Modifier.weight(1f) else Modifier)
                        .selectable(
                            selected = selected,
                            role = Role.Tab,
                            onClick = { onChange(tab.key) },
                        )
                        .defaultMinSize(minHeight = dims.sizeTouch)
                        .padding(horizontal = PrismTheme.spacing.s1),
                    contentAlignment = Alignment.Center,
                ) {
                    Text(
                        text = tab.label,
                        style = PrismTheme.typography.subhead,
                        color = if (selected) colors.labelPrimary else colors.labelSecondary,
                        fontWeight = if (selected) FontWeight.SemiBold else null,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis,
                    )
                    if (selected) {
                        Box(
                            Modifier
                                .align(Alignment.BottomCenter)
                                .fillMaxWidth()
                                .height(2.dp)
                                .background(colors.accent),
                        )
                    }
                }
            }
        }
    }
}
