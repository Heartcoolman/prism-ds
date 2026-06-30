package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.icons.PrismIcon
import io.github.heartcoolman.prism.icons.PrismIcons

private fun PrismTone.defaultBannerIcon(): ImageVector = when (this) {
    PrismTone.Success -> PrismIcons.Check
    PrismTone.Warning -> PrismIcons.Warning
    PrismTone.Danger -> PrismIcons.Warning
    else -> PrismIcons.Info
}

/**
 * Inline status banner. Tinted background + tone-colored leading icon carry the
 * tone; pairs a bold title with a quieter message, plus optional action and a
 * close (×). Danger announces assertively.
 */
@Composable
fun PrismBanner(
    title: String,
    modifier: Modifier = Modifier,
    message: String? = null,
    tone: PrismTone = PrismTone.Accent,
    icon: ImageVector? = null,
    onClose: (() -> Unit)? = null,
    action: (@Composable RowScope.() -> Unit)? = null,
) {
    val live = if (tone == PrismTone.Danger) LiveRegionMode.Assertive else LiveRegionMode.Polite
    Row(
        modifier = modifier
            .fillMaxWidth()
            .semantics { liveRegion = live }
            .clip(RoundedCornerShape(PrismTheme.radius.card))
            .background(tone.tintBg())
            .padding(PrismTheme.spacing.s4),
        horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s3),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        PrismIcon(
            icon = icon ?: tone.defaultBannerIcon(),
            contentDescription = null,
            tint = tone.color(),
        )
        Column(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s1),
        ) {
            Text(title, style = PrismTheme.typography.headline, color = tone.color())
            if (message != null) {
                Text(message, style = PrismTheme.typography.subhead, color = PrismTheme.colors.labelSecondary)
            }
        }
        action?.invoke(this)
        if (onClose != null) {
            PrismIcon(
                icon = PrismIcons.Close,
                contentDescription = "关闭",
                modifier = Modifier.clickable(onClick = onClose),
                tint = PrismTheme.colors.labelSecondary,
            )
        }
    }
}
