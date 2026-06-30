package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.icons.PrismIcon
import io.github.heartcoolman.prism.icons.PrismIcons

enum class PrismToastVariant { Neutral, Success, Error }

/**
 * Floating feedback card. Presentation only (no auto-dismiss timer). A
 * variant-colored leading icon is resolved automatically (or overridden via
 * `icon`). Renders nothing when `open` is false.
 */
@Composable
fun PrismToast(
    text: String,
    modifier: Modifier = Modifier,
    variant: PrismToastVariant = PrismToastVariant.Neutral,
    open: Boolean = true,
    icon: ImageVector? = null,
) {
    if (!open) return

    val resolved: ImageVector? = icon ?: when (variant) {
        PrismToastVariant.Success -> PrismIcons.Check
        PrismToastVariant.Error -> PrismIcons.Warning
        PrismToastVariant.Neutral -> null
    }
    val iconTint: Color = when (variant) {
        PrismToastVariant.Success -> PrismTheme.colors.success
        PrismToastVariant.Error -> PrismTheme.colors.danger
        PrismToastVariant.Neutral -> PrismTheme.colors.labelSecondary
    }

    Surface(
        modifier = modifier.semantics { liveRegion = LiveRegionMode.Polite },
        shape = RoundedCornerShape(PrismTheme.radius.pill),
        color = PrismTheme.colors.bgElevated,
        contentColor = PrismTheme.colors.labelPrimary,
        shadowElevation = PrismTheme.elevation.level3,
    ) {
        Row(
            modifier = Modifier.padding(
                horizontal = PrismTheme.spacing.s4,
                vertical = PrismTheme.spacing.s3,
            ),
            horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            if (resolved != null) {
                PrismIcon(resolved, contentDescription = null, size = 18.dp, tint = iconTint)
            }
            Text(text, style = PrismTheme.typography.subhead)
        }
    }
}
