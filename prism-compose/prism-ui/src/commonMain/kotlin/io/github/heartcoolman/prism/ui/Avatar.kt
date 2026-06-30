package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.Layout
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

enum class PrismAvatarSize { Small, Medium, Large }

/** Diameter per size (small 28 / medium 40 / large 56). */
private fun avatarDiameter(size: PrismAvatarSize): Dp = when (size) {
    PrismAvatarSize.Small -> 28.dp
    PrismAvatarSize.Medium -> 40.dp
    PrismAvatarSize.Large -> 56.dp
}

@Composable
private fun avatarTextStyle(size: PrismAvatarSize): TextStyle = when (size) {
    PrismAvatarSize.Small -> PrismTheme.typography.footnote
    PrismAvatarSize.Medium -> PrismTheme.typography.subhead
    PrismAvatarSize.Large -> PrismTheme.typography.headline
}

/** First 1-2 characters of a name, uppercased. */
private fun initialsOf(name: String): String = name.trim().take(2).uppercase()

/**
 * Avatar — circular, centered initials on a neutral fill, optional success
 * presence dot bottom-right. No network image loading (use Coil at the call
 * site for real photos); the initials fallback is the only rendering here.
 */
@Composable
fun PrismAvatar(
    name: String = "",
    modifier: Modifier = Modifier,
    size: PrismAvatarSize = PrismAvatarSize.Medium,
    online: Boolean = false,
) {
    val colors = PrismTheme.colors
    val diameter = avatarDiameter(size)
    Box(
        modifier = modifier
            .size(diameter)
            .background(colors.fillTertiary, CircleShape)
            .semantics {
                role = Role.Image
                if (name.isNotEmpty()) contentDescription = name
            },
        contentAlignment = Alignment.Center,
    ) {
        Text(
            text = initialsOf(name),
            style = avatarTextStyle(size).copy(fontWeight = FontWeight.SemiBold),
            color = colors.labelSecondary,
        )
        if (online) {
            val dot = diameter * 0.28f
            Box(
                modifier = Modifier
                    .align(Alignment.BottomEnd)
                    .size(dot + 4.dp)
                    .background(colors.bg, CircleShape),
                contentAlignment = Alignment.Center,
            ) {
                Box(Modifier.size(dot).background(colors.success, CircleShape))
            }
        }
    }
}

/** Avatar wrapped in a background-colored ring, used inside [PrismAvatarGroup]. */
@Composable
private fun RingWrap(content: @Composable () -> Unit) {
    Box(
        modifier = Modifier
            .background(PrismTheme.colors.bg, CircleShape)
            .padding(2.dp),
    ) { content() }
}

/** Trailing "+N" overflow chip rendered like a neutral avatar. */
@Composable
private fun OverflowAvatar(text: String, size: PrismAvatarSize) {
    val colors = PrismTheme.colors
    Box(
        modifier = Modifier
            .size(avatarDiameter(size))
            .background(colors.fillTertiary, CircleShape),
        contentAlignment = Alignment.Center,
    ) {
        Text(text = text, style = avatarTextStyle(size), color = colors.labelSecondary)
    }
}

/**
 * AvatarGroup — overlapping left-to-right stack. Beyond [max], the remainder
 * collapses into a trailing "+N" chip. A custom [Layout] places each item with
 * a negative overlap (Row spacing cannot be negative).
 */
@Composable
fun PrismAvatarGroup(
    names: List<String>,
    modifier: Modifier = Modifier,
    max: Int? = null,
    size: PrismAvatarSize = PrismAvatarSize.Medium,
) {
    val limit = if (max != null && max < names.size) max else names.size
    val shown = names.take(limit)
    val overflow = names.size - shown.size
    val diameter = avatarDiameter(size)

    Layout(
        modifier = modifier,
        content = {
            shown.forEach { name -> RingWrap { PrismAvatar(name = name, size = size) } }
            if (overflow > 0) RingWrap { OverflowAvatar("+$overflow", size) }
        },
    ) { measurables, constraints ->
        val childConstraints = constraints.copy(minWidth = 0, minHeight = 0)
        val placeables = measurables.map { it.measure(childConstraints) }
        if (placeables.isEmpty()) {
            layout(0, 0) {}
        } else {
            val overlapPx = (diameter * 0.32f).roundToPx()
            val h = placeables.maxOf { it.height }
            val w = placeables.sumOf { it.width } - overlapPx * (placeables.size - 1)
            layout(w.coerceAtLeast(0), h) {
                var x = 0
                placeables.forEach { p ->
                    p.placeRelative(x, (h - p.height) / 2)
                    x += p.width - overlapPx
                }
            }
        }
    }
}
