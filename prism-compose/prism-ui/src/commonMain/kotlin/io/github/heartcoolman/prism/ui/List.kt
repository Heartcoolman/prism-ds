package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.icons.PrismIcon
import io.github.heartcoolman.prism.icons.PrismIcons

/**
 * Grouped list container. A clipped, card-radius column of [PrismListRow]s.
 * [inset] adds horizontal margin. Rows draw their own hairline separators.
 */
@Composable
fun PrismList(
    modifier: Modifier = Modifier,
    inset: Boolean = false,
    content: @Composable ColumnScope.() -> Unit,
) {
    Column(
        modifier = modifier
            .then(if (inset) Modifier.padding(horizontal = PrismTheme.spacing.s4) else Modifier)
            .clip(androidx.compose.foundation.shape.RoundedCornerShape(PrismTheme.radius.card))
            .background(PrismTheme.colors.bg),
        content = content,
    )
}

/**
 * A single list row: leading slot, title (+ optional subtitle), trailing slot,
 * and an optional disclosure chevron. Interactive when [onClick] is set.
 * [showDivider] draws a bottom hairline; set false on the last row to drop it.
 */
@Composable
fun PrismListRow(
    title: String,
    modifier: Modifier = Modifier,
    subtitle: String? = null,
    leading: (@Composable () -> Unit)? = null,
    trailing: (@Composable () -> Unit)? = null,
    chevron: Boolean = false,
    onClick: (() -> Unit)? = null,
    showDivider: Boolean = true,
) {
    val colors = PrismTheme.colors
    val spacing = PrismTheme.spacing
    Column(modifier = modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .then(if (onClick != null) Modifier.clickable(role = Role.Button, onClick = onClick) else Modifier)
                .heightIn(min = PrismTheme.dimensions.sizeTouch)
                .padding(horizontal = spacing.s4, vertical = spacing.s3),
            horizontalArrangement = Arrangement.spacedBy(spacing.s3),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            if (leading != null) {
                CompositionLocalProvider(LocalContentColor provides colors.labelSecondary) { leading() }
            }
            Column(modifier = Modifier.weight(1f)) {
                Text(title, style = PrismTheme.typography.body, color = colors.labelPrimary)
                if (subtitle != null) {
                    Text(subtitle, style = PrismTheme.typography.footnote, color = colors.labelSecondary)
                }
            }
            if (trailing != null) {
                CompositionLocalProvider(LocalContentColor provides colors.labelSecondary) {
                    androidx.compose.material3.ProvideTextStyle(PrismTheme.typography.subhead) { trailing() }
                }
            }
            if (chevron) {
                PrismIcon(
                    icon = PrismIcons.ChevronRight,
                    contentDescription = null,
                    size = 18.dp,
                    tint = colors.labelTertiary,
                )
            }
        }
        if (showDivider) {
            HorizontalDivider(thickness = 1.dp, color = colors.separator)
        }
    }
}
