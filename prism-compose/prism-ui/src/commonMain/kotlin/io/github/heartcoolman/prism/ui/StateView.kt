package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.icons.PrismIcon
import io.github.heartcoolman.prism.icons.PrismIcons

enum class PrismStateVariant { Empty, Loading, Error, Success }

/**
 * StateView — page-state pattern for empty / loading / error / success screens.
 * A centered column: icon circle, title, optional description, optional action.
 * `loading`/`success` announce politely, `error` assertively.
 */
@Composable
fun PrismStateView(
    title: String,
    modifier: Modifier = Modifier,
    variant: PrismStateVariant = PrismStateVariant.Empty,
    description: String? = null,
    icon: (@Composable () -> Unit)? = null,
    action: (@Composable () -> Unit)? = null,
) {
    val colors = PrismTheme.colors
    val spacing = PrismTheme.spacing
    val iconColor = when (variant) {
        PrismStateVariant.Error -> colors.danger
        PrismStateVariant.Success -> colors.success
        else -> colors.labelTertiary
    }

    Column(
        modifier = modifier
            .widthIn(max = 320.dp)
            .padding(spacing.s6)
            .semantics {
                when (variant) {
                    PrismStateVariant.Error -> liveRegion = LiveRegionMode.Assertive
                    PrismStateVariant.Loading, PrismStateVariant.Success ->
                        liveRegion = LiveRegionMode.Polite
                    else -> {}
                }
            },
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(spacing.s3),
    ) {
        Box(
            modifier = Modifier
                .size(64.dp)
                .clip(CircleShape)
                .background(colors.fillSecondary),
            contentAlignment = Alignment.Center,
        ) {
            when {
                icon != null -> icon()
                variant == PrismStateVariant.Loading -> PrismSpinner(size = PrismSpinnerSize.Lg)
                else -> {
                    val glyph = when (variant) {
                        PrismStateVariant.Error -> PrismIcons.Warning
                        PrismStateVariant.Success -> PrismIcons.Check
                        else -> PrismIcons.Folder
                    }
                    PrismIcon(glyph, contentDescription = null, size = 28.dp, tint = iconColor)
                }
            }
        }
        Text(
            text = title,
            style = PrismTheme.typography.headline,
            color = colors.labelPrimary,
            textAlign = TextAlign.Center,
        )
        if (description != null) {
            Text(
                text = description,
                style = PrismTheme.typography.subhead,
                color = colors.labelSecondary,
                textAlign = TextAlign.Center,
            )
        }
        if (action != null) {
            Box(modifier = Modifier.padding(top = spacing.s2)) { action() }
        }
    }
}
