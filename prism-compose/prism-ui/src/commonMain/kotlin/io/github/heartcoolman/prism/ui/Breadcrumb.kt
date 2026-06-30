package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.icons.PrismIcon
import io.github.heartcoolman.prism.icons.PrismIcons

/** One crumb. The last item in the trail is the current page. */
data class PrismBreadcrumbItem(val label: String)

/**
 * Breadcrumb — the path to the current page: a row of crumbs separated by
 * chevrons. Non-last crumbs are accent-colored and clickable when `onNavigate`
 * is set (reports the tapped index); the last crumb is the current page.
 */
@Composable
fun PrismBreadcrumb(
    items: List<PrismBreadcrumbItem>,
    modifier: Modifier = Modifier,
    onNavigate: ((Int) -> Unit)? = null,
) {
    val colors = PrismTheme.colors
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s1),
    ) {
        items.forEachIndexed { index, item ->
            val isLast = index == items.size - 1
            if (isLast) {
                Text(
                    text = item.label,
                    style = PrismTheme.typography.subhead,
                    color = colors.labelPrimary,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
            } else {
                Text(
                    text = item.label,
                    style = PrismTheme.typography.subhead,
                    color = colors.accent,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    modifier = if (onNavigate != null) {
                        Modifier.clickable(role = Role.Button) { onNavigate(index) }
                    } else {
                        Modifier
                    },
                )
                PrismIcon(
                    icon = PrismIcons.ChevronRight,
                    contentDescription = null,
                    size = 18.dp,
                    tint = colors.labelTertiary,
                )
            }
        }
    }
}
