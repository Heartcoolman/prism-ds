package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
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

enum class PrismPopoverPlacement { Top, Bottom, Left, Right }

/**
 * Popover — floating card anchored to a trigger on one of four sides. The
 * [anchor] stays in flow; the card floats in a focusable Popup so an outside
 * click or Escape calls [onClose]. Arrow is omitted (Compose Popup is detached).
 */
@Composable
fun PrismPopover(
    open: Boolean,
    onClose: () -> Unit,
    content: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    placement: PrismPopoverPlacement = PrismPopoverPlacement.Bottom,
    anchor: @Composable () -> Unit,
) {
    Box(modifier = modifier) {
        anchor()
        if (open) {
            val gap = with(LocalDensity.current) { PrismTheme.spacing.s2.roundToPx() }
            Popup(
                popupPositionProvider = remember(placement, gap) { PrismAnchoredPositionProvider(placement, gap) },
                onDismissRequest = onClose,
                properties = PopupProperties(focusable = true),
            ) {
                Surface(
                    shape = RoundedCornerShape(PrismTheme.radius.card),
                    color = PrismTheme.colors.bgElevated,
                    contentColor = PrismTheme.colors.labelPrimary,
                    shadowElevation = PrismTheme.elevation.level3,
                ) {
                    Box(modifier = Modifier.widthIn(min = 160.dp).padding(PrismTheme.spacing.s2)) { content() }
                }
            }
        }
    }
}

/** Positions popup content on one side of the anchor, cross-axis centered, [gap]px away. */
internal class PrismAnchoredPositionProvider(
    private val placement: PrismPopoverPlacement,
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
            PrismPopoverPlacement.Bottom -> IntOffset(cx, anchorBounds.bottom + gap)
            PrismPopoverPlacement.Top -> IntOffset(cx, anchorBounds.top - popupContentSize.height - gap)
            PrismPopoverPlacement.Left -> IntOffset(anchorBounds.left - popupContentSize.width - gap, cy)
            PrismPopoverPlacement.Right -> IntOffset(anchorBounds.right + gap, cy)
        }
    }
}
