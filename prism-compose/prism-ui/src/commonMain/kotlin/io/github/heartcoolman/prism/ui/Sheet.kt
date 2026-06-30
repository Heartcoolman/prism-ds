package io.github.heartcoolman.prism.ui

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

/**
 * Bottom sheet. A scrim dims the page while a panel slides up from the bottom
 * with a grab handle, optional title, and scrollable content. Static (no drag).
 * Place at the end of a root Box so it overlays; renders nothing when closed.
 * Closes on scrim click unless [dismissOnScrim] is false. Escape/back is host-driven.
 */
@Composable
fun PrismSheet(
    open: Boolean,
    modifier: Modifier = Modifier,
    onClose: () -> Unit = {},
    title: String? = null,
    dismissOnScrim: Boolean = true,
    content: @Composable ColumnScope.() -> Unit,
) {
    val colors = PrismTheme.colors
    val spacing = PrismTheme.spacing
    val motion = PrismTheme.motion

    Box(modifier = modifier.fillMaxSize()) {
        AnimatedVisibility(
            visible = open,
            modifier = Modifier.fillMaxSize(),
            enter = fadeIn(tween(motion.durEnter, easing = motion.easeEnter)),
            exit = fadeOut(tween(motion.durExit, easing = motion.easeExit)),
        ) {
            val scrim = Modifier
                .fillMaxSize()
                .background(colors.bgOverlay)
            Box(
                modifier = if (dismissOnScrim) {
                    scrim.clickable(
                        interactionSource = remember { MutableInteractionSource() },
                        indication = null,
                        onClick = onClose,
                    )
                } else {
                    scrim
                },
            )
        }
        AnimatedVisibility(
            visible = open,
            modifier = Modifier.align(Alignment.BottomCenter),
            enter = slideInVertically(
                animationSpec = tween(motion.durEmphasized, easing = motion.easeEmphasized),
                initialOffsetY = { it },
            ),
            exit = slideOutVertically(
                animationSpec = tween(motion.durExit, easing = motion.easeExit),
                targetOffsetY = { it },
            ),
        ) {
            Surface(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(
                    topStart = PrismTheme.radius.sheet,
                    topEnd = PrismTheme.radius.sheet,
                ),
                color = colors.bg,
                contentColor = colors.labelPrimary,
                shadowElevation = PrismTheme.elevation.level4,
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .verticalScroll(rememberScrollState())
                        .padding(spacing.s5),
                ) {
                    Box(
                        modifier = Modifier
                            .align(Alignment.CenterHorizontally)
                            .padding(bottom = spacing.s4)
                            .size(width = 36.dp, height = 5.dp)
                            .clip(RoundedCornerShape(PrismTheme.radius.pill))
                            .background(colors.separatorOpaque),
                    )
                    if (title != null) {
                        Text(
                            text = title,
                            modifier = Modifier.padding(bottom = spacing.s4),
                            style = PrismTheme.typography.headline,
                            color = colors.labelPrimary,
                        )
                    }
                    content()
                }
            }
        }
    }
}
