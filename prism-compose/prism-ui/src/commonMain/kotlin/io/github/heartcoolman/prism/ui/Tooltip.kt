package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.focusable
import androidx.compose.foundation.hoverable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.interaction.collectIsHoveredAsState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.IntRect
import androidx.compose.ui.unit.IntSize
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Popup
import androidx.compose.ui.window.PopupPositionProvider
import androidx.compose.ui.window.PopupProperties
import io.github.heartcoolman.prism.core.PrismTheme

enum class PrismTooltipPlacement { Top, Bottom, Left, Right }

/**
 * Tooltip — small dark bubble revealed while the trigger is hovered or focused.
 * [open] force-shows it (stories/screenshots). The bubble is a non-focusable
 * Popup so it never steals input; inverted colors (labelPrimary on bg).
 */
@Composable
fun PrismTooltip(
    label: String,
    modifier: Modifier = Modifier,
    placement: PrismTooltipPlacement = PrismTooltipPlacement.Top,
    open: Boolean = false,
    content: @Composable () -> Unit,
) {
    val interaction = remember { MutableInteractionSource() }
    val hovered by interaction.collectIsHoveredAsState()
    val focused by interaction.collectIsFocusedAsState()
    val visible = open || hovered || focused

    Box(
        modifier = modifier
            .hoverable(interaction)
            .focusable(interactionSource = interaction),
    ) {
        content()
        if (visible) {
            val gap = with(LocalDensity.current) { PrismTheme.spacing.s2.roundToPx() }
            Popup(
                popupPositionProvider = remember(placement, gap) { PrismTooltipPositionProvider(placement, gap) },
                properties = PopupProperties(focusable = false),
            ) {
                Surface(
                    shape = RoundedCornerShape(PrismTheme.radius.sm),
                    color = PrismTheme.colors.labelPrimary,
                    contentColor = PrismTheme.colors.bg,
                    shadowElevation = PrismTheme.elevation.level2,
                ) {
                    Text(
                        text = label,
                        modifier = Modifier
                            .widthIn(max = 240.dp)
                            .padding(horizontal = PrismTheme.spacing.s2, vertical = PrismTheme.spacing.s1),
                        style = PrismTheme.typography.footnote,
                    )
                }
            }
        }
    }
}

/** Positions the bubble on one side of the trigger, cross-axis centered, [gap]px away. */
private class PrismTooltipPositionProvider(
    private val placement: PrismTooltipPlacement,
    private val gap: Int,
) : PopupPositionProvider {
    override fun calculatePosition(
        anchorBounds: IntRect,
        windowSize: IntSize,
        layoutDirection: LayoutDirection,
        popupContentSize: IntSize,
    ): IntOffset {
        val cx = anchorBounds.left + (anchorBounds.width - popupContentSize.width) / 2
        val cy = anchorBounds.top + (anchorBounds.height - popupContentSize.height) / 2
        return when (placement) {
            PrismTooltipPlacement.Top -> IntOffset(cx, anchorBounds.top - popupContentSize.height - gap)
            PrismTooltipPlacement.Bottom -> IntOffset(cx, anchorBounds.bottom + gap)
            PrismTooltipPlacement.Left -> IntOffset(anchorBounds.left - popupContentSize.width - gap, cy)
            PrismTooltipPlacement.Right -> IntOffset(anchorBounds.right + gap, cy)
        }
    }
}
