package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.icons.PrismIcon
import io.github.heartcoolman.prism.icons.PrismIcons

/**
 * SearchField — filled search input with a leading magnifier and a trailing
 * clear button shown only when a value is present. Borderless transparent
 * input over a tertiary fill; the clear button sits in a quaternary circle.
 */
@Composable
fun PrismSearchField(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    placeholder: String = "搜索",
    onClear: (() -> Unit)? = null,
    enabled: Boolean = true,
    fullWidth: Boolean = false,
) {
    val colors = PrismTheme.colors
    val spacing = PrismTheme.spacing
    val hasValue = value.isNotEmpty()
    val widthMod = if (fullWidth) Modifier.fillMaxWidth() else Modifier

    Row(
        modifier = modifier
            .then(widthMod)
            .height(36.dp)
            .clip(RoundedCornerShape(PrismTheme.radius.input))
            .background(colors.fillTertiary)
            .padding(horizontal = spacing.s3),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(spacing.s2),
    ) {
        PrismIcon(
            PrismIcons.Search,
            contentDescription = null,
            size = 18.dp,
            tint = colors.labelTertiary,
        )
        BasicTextField(
            value = value,
            onValueChange = onValueChange,
            modifier = Modifier
                .weight(1f)
                .semantics { contentDescription = placeholder },
            enabled = enabled,
            singleLine = true,
            textStyle = PrismTheme.typography.body.copy(color = colors.labelPrimary),
            keyboardOptions = KeyboardOptions.Default,
            cursorBrush = SolidColor(colors.accent),
            decorationBox = { innerTextField ->
                Box(contentAlignment = Alignment.CenterStart) {
                    if (value.isEmpty()) {
                        Text(
                            placeholder,
                            style = PrismTheme.typography.body,
                            color = colors.labelTertiary,
                        )
                    }
                    innerTextField()
                }
            },
        )
        if (hasValue) {
            Box(
                modifier = Modifier
                    .size(20.dp)
                    .clip(CircleShape)
                    .background(colors.fillQuaternary)
                    .clickable(enabled = enabled) { onClear?.invoke() }
                    .semantics {
                        role = Role.Button
                        contentDescription = "清除"
                    },
                contentAlignment = Alignment.Center,
            ) {
                PrismIcon(
                    PrismIcons.Close,
                    contentDescription = null,
                    size = 14.dp,
                    tint = colors.labelSecondary,
                )
            }
        }
    }
}
