package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.icons.PrismIcon
import io.github.heartcoolman.prism.icons.PrismIcons

/**
 * Compact pill for labels, filters, and tokens. `tone` sets the color (Neutral
 * = gray default); `selected` raises an accent ring; `onClick` makes the pill a
 * button; `onRemove` appends a working trailing × control (its click does not
 * trigger the pill's onClick).
 */
@Composable
fun PrismTag(
    label: String,
    modifier: Modifier = Modifier,
    tone: PrismTone = PrismTone.Neutral,
    selected: Boolean = false,
    onClick: (() -> Unit)? = null,
    onRemove: (() -> Unit)? = null,
) {
    val colors = PrismTheme.colors
    val shape = RoundedCornerShape(PrismTheme.radius.pill)
    val bg: Color
    val fg: Color
    var border: BorderStroke? = null
    if (selected) {
        bg = colors.tintAccentBg
        fg = colors.accent
        border = BorderStroke(1.dp, colors.accent)
    } else {
        bg = tone.tintBg()
        fg = tone.color()
    }

    var m = modifier.clip(shape).background(bg)
    if (border != null) m = m.border(border, shape)
    if (onClick != null) m = m.clickable(role = Role.Button, onClick = onClick)
    m = m.padding(horizontal = PrismTheme.spacing.s3, vertical = PrismTheme.spacing.s1)

    Row(
        modifier = m,
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s1),
    ) {
        Text(label, style = PrismTheme.typography.footnote, color = fg)
        if (onRemove != null) {
            PrismIcon(
                icon = PrismIcons.Close,
                contentDescription = "移除",
                modifier = Modifier.clickable(role = Role.Button, onClick = onRemove),
                size = 14.dp,
                tint = fg,
            )
        }
    }
}
