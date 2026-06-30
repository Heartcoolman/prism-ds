package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

enum class PrismButtonVariant { Filled, Tinted, Plain, Outline }
enum class PrismButtonSize { Sm, Md, Lg }

/**
 * Button — 4 variants × tone × 3 sizes, optional leading/trailing icon.
 * Maps to Material3 Surface(onClick) styled entirely from Prism tokens.
 */
@Composable
fun PrismButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    variant: PrismButtonVariant = PrismButtonVariant.Filled,
    tone: PrismTone = PrismTone.Accent,
    size: PrismButtonSize = PrismButtonSize.Md,
    enabled: Boolean = true,
    leadingIcon: (@Composable () -> Unit)? = null,
    trailingIcon: (@Composable () -> Unit)? = null,
    content: @Composable () -> Unit,
) {
    val colors = PrismTheme.colors
    val spacing = PrismTheme.spacing
    val dims = PrismTheme.dimensions
    val toneColor = tone.color()

    val height = when (size) {
        PrismButtonSize.Sm -> dims.controlHeightSm
        PrismButtonSize.Md -> dims.controlHeightMd
        PrismButtonSize.Lg -> dims.controlHeightLg
    }
    val hPad = when (size) {
        PrismButtonSize.Sm -> spacing.s3
        PrismButtonSize.Md -> spacing.s4
        PrismButtonSize.Lg -> spacing.s5
    }
    val textStyle = if (size == PrismButtonSize.Sm) PrismTheme.typography.subhead else PrismTheme.typography.headline

    val container: Color
    val fg: Color
    var border: BorderStroke? = null
    when (variant) {
        PrismButtonVariant.Filled -> { container = toneColor; fg = colors.labelOnAccent }
        PrismButtonVariant.Tinted -> { container = tone.tintBg(); fg = toneColor }
        PrismButtonVariant.Plain -> { container = Color.Transparent; fg = toneColor }
        PrismButtonVariant.Outline -> {
            container = Color.Transparent; fg = toneColor
            border = BorderStroke(1.dp, colors.separatorOpaque)
        }
    }

    Surface(
        onClick = onClick,
        modifier = modifier.then(if (enabled) Modifier else Modifier.alpha(0.4f)),
        enabled = enabled,
        shape = RoundedCornerShape(PrismTheme.radius.pill),
        color = container,
        contentColor = fg,
        border = border,
    ) {
        Row(
            modifier = Modifier
                .defaultMinSize(minHeight = height)
                .height(height)
                .padding(horizontal = hPad),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(spacing.s1, Alignment.CenterHorizontally),
        ) {
            leadingIcon?.invoke()
            androidx.compose.material3.ProvideTextStyle(textStyle) { content() }
            trailingIcon?.invoke()
        }
    }
}
