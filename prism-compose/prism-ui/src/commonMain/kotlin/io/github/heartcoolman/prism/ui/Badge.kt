package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

/**
 * Count / dot badge. Standalone, or wrapping `content` to float at its top-right
 * corner (e.g. over an icon). `max` caps the count to `${max}+`.
 */
@Composable
fun PrismBadge(
    modifier: Modifier = Modifier,
    count: Int? = null,
    dot: Boolean = false,
    max: Int = 99,
    tone: PrismTone = PrismTone.Danger,
    content: (@Composable () -> Unit)? = null,
) {
    if (content == null) {
        BadgeMark(modifier, count, dot, max, tone)
        return
    }
    Box(modifier) {
        content()
        BadgeMark(
            modifier = Modifier
                .align(Alignment.TopEnd)
                .offset(x = 4.dp, y = (-4).dp),
            count = count,
            dot = dot,
            max = max,
            tone = tone,
        )
    }
}

@Composable
private fun BadgeMark(modifier: Modifier, count: Int?, dot: Boolean, max: Int, tone: PrismTone) {
    val bg = tone.color()
    if (dot || count == null) {
        Box(modifier.size(8.dp).clip(CircleShape).background(bg))
        return
    }
    val text = if (count > max) "$max+" else count.toString()
    Box(
        modifier = modifier
            .semantics { contentDescription = "$count 条未读" }
            .defaultMinSize(minWidth = 18.dp, minHeight = 18.dp)
            .clip(CircleShape)
            .background(bg)
            .padding(horizontal = PrismTheme.spacing.s1),
        contentAlignment = Alignment.Center,
    ) {
        Text(text, style = PrismTheme.typography.footnote, color = PrismTheme.colors.labelOnAccent)
    }
}
