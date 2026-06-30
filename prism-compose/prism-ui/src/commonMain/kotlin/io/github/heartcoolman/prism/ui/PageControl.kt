package io.github.heartcoolman.prism.ui

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

/**
 * Page dots indicator. The active page is a wider accent pill (animated). When
 * `onChange` is supplied the dots become tappable (role=tab); otherwise the row
 * is purely decorative.
 */
@Composable
fun PrismPageControl(
    count: Int,
    activeIndex: Int,
    modifier: Modifier = Modifier,
    onChange: ((Int) -> Unit)? = null,
) {
    Row(
        modifier = modifier.semantics { stateDescription = "第 ${activeIndex + 1} 页，共 $count 页" },
        horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s1),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        for (i in 0 until count) {
            val active = i == activeIndex
            val w by animateDpAsState(
                targetValue = if (active) 18.dp else 7.dp,
                animationSpec = tween(PrismTheme.motion.durStandard),
                label = "dot-width",
            )
            val color by animateColorAsState(
                targetValue = if (active) PrismTheme.colors.accent else PrismTheme.colors.labelQuaternary,
                animationSpec = tween(PrismTheme.motion.durStandard),
                label = "dot-color",
            )
            val dot = Modifier
                .height(7.dp)
                .width(w)
                .clip(RoundedCornerShape(PrismTheme.radius.pill))
                .background(color)

            if (onChange != null) {
                Box(
                    modifier = Modifier
                        .size(width = 22.dp, height = 22.dp)
                        .clickable(role = Role.Tab, onClickLabel = "第 ${i + 1} 页") { onChange(i) },
                    contentAlignment = Alignment.Center,
                ) { Box(dot) }
            } else {
                Box(dot)
            }
        }
    }
}
