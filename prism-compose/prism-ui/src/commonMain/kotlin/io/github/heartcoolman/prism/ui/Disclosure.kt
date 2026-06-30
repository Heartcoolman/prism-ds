package io.github.heartcoolman.prism.ui

import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.ProvideTextStyle
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.icons.PrismIcon
import io.github.heartcoolman.prism.icons.PrismIcons

/**
 * Disclosure (accordion). Summary row toggles a content region below it.
 * Uncontrolled via [defaultOpen], or controlled via [open] + [onToggle].
 * Trailing chevron rotates 90deg and the region animates its height.
 */
@Composable
fun PrismDisclosure(
    title: String,
    modifier: Modifier = Modifier,
    defaultOpen: Boolean = false,
    open: Boolean? = null,
    onToggle: ((Boolean) -> Unit)? = null,
    content: @Composable ColumnScope.() -> Unit,
) {
    val colors = PrismTheme.colors
    val spacing = PrismTheme.spacing
    val controlled = open != null
    var internalOpen by remember { mutableStateOf(defaultOpen) }
    val isOpen = open ?: internalOpen
    val angle by animateFloatAsState(if (isOpen) 90f else 0f, label = "chevron")

    Column(modifier = modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable(role = Role.Button) {
                    val next = !isOpen
                    if (!controlled) internalOpen = next
                    onToggle?.invoke(next)
                }
                .semantics { stateDescription = if (isOpen) "Expanded" else "Collapsed" }
                .heightIn(min = PrismTheme.dimensions.sizeTouch)
                .padding(horizontal = spacing.s4, vertical = spacing.s3),
            horizontalArrangement = Arrangement.spacedBy(spacing.s3),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(
                text = title,
                modifier = Modifier.weight(1f),
                style = PrismTheme.typography.headline,
                color = colors.labelPrimary,
            )
            PrismIcon(
                icon = PrismIcons.ChevronRight,
                contentDescription = null,
                modifier = Modifier.rotate(angle),
                size = 18.dp,
                tint = colors.labelTertiary,
            )
        }
        Column(modifier = Modifier.fillMaxWidth().animateContentSize()) {
            if (isOpen) {
                Column(
                    modifier = Modifier.padding(
                        start = spacing.s4,
                        end = spacing.s4,
                        bottom = spacing.s4,
                    ),
                ) {
                    CompositionLocalProvider(LocalContentColor provides colors.labelSecondary) {
                        ProvideTextStyle(PrismTheme.typography.body) { content() }
                    }
                }
            }
        }
    }
}
