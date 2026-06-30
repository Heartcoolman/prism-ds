package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.icons.PrismIcon
import io.github.heartcoolman.prism.icons.PrismIcons

/**
 * NavBar — sticky top bar over a translucent `materialBg` background with a
 * hairline bottom separator. Three slots (leading | centered title | trailing).
 * A default back button (chevron + label) is shown when `onBack` is set and no
 * `leading` slot is given. The `large` variant adds a left-aligned large-title
 * row below the bar.
 */
@Composable
fun PrismNavBar(
    modifier: Modifier = Modifier,
    title: String? = null,
    leading: (@Composable () -> Unit)? = null,
    trailing: (@Composable () -> Unit)? = null,
    onBack: (() -> Unit)? = null,
    backLabel: String = "返回",
    large: Boolean = false,
) {
    val colors = PrismTheme.colors
    Column(modifier = modifier.fillMaxWidth().background(colors.materialBg)) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .heightIn(min = PrismTheme.dimensions.sizeTouch)
                .padding(horizontal = PrismTheme.spacing.s3),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Box(modifier = Modifier.weight(1f), contentAlignment = Alignment.CenterStart) {
                when {
                    leading != null -> leading()
                    onBack != null -> PrismNavBarBack(label = backLabel, onClick = onBack)
                }
            }
            if (!large && title != null) {
                Text(
                    text = title,
                    style = PrismTheme.typography.headline,
                    color = colors.labelPrimary,
                    textAlign = TextAlign.Center,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
            }
            Box(modifier = Modifier.weight(1f), contentAlignment = Alignment.CenterEnd) {
                trailing?.invoke()
            }
        }
        if (large && title != null) {
            Text(
                text = title,
                style = PrismTheme.typography.largeTitle,
                color = colors.labelPrimary,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = PrismTheme.spacing.s3)
                    .padding(bottom = PrismTheme.spacing.s2),
            )
        }
        Box(Modifier.fillMaxWidth().height(1.dp).background(colors.separator))
    }
}

@Composable
private fun PrismNavBarBack(label: String, onClick: () -> Unit) {
    val colors = PrismTheme.colors
    Row(
        modifier = Modifier
            .clickable(role = Role.Button, onClickLabel = label, onClick = onClick)
            .heightIn(min = PrismTheme.dimensions.sizeTouch),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s1),
    ) {
        PrismIcon(
            icon = PrismIcons.ChevronLeft,
            contentDescription = null,
            size = 18.dp,
            tint = colors.accent,
        )
        Text(text = label, style = PrismTheme.typography.body, color = colors.accent, maxLines = 1)
    }
}
