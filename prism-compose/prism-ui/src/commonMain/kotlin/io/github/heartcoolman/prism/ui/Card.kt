package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

/**
 * Content card. A neutral surface with a top media slot (placeholder when
 * omitted), an eyebrow/title/description text block, free-form body, and an
 * optional footer. `interactive`/`onClick` give a clickable, lifted card.
 */
@Composable
fun PrismCard(
    modifier: Modifier = Modifier,
    media: (@Composable () -> Unit)? = null,
    eyebrow: String? = null,
    title: String? = null,
    description: String? = null,
    footer: (@Composable () -> Unit)? = null,
    interactive: Boolean = false,
    onClick: (() -> Unit)? = null,
    content: @Composable ColumnScope.() -> Unit = {},
) {
    val colors = PrismTheme.colors
    val shape = RoundedCornerShape(PrismTheme.radius.card)
    val elevation = if (interactive || onClick != null) PrismTheme.elevation.level2 else PrismTheme.elevation.card

    val body: @Composable () -> Unit = {
        Column {
            // Top media slot (placeholder when omitted), 16:9.
            if (media != null) {
                Column(Modifier.fillMaxWidth().aspectRatio(16f / 9f)) { media() }
            } else {
                Row(Modifier.fillMaxWidth().aspectRatio(16f / 9f).background(colors.fillTertiary)) {}
            }
            Column(
                modifier = Modifier.padding(PrismTheme.spacing.s4),
                verticalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2),
            ) {
                eyebrow?.let { PrismCardEyebrow(it) }
                title?.let { PrismCardTitle(it) }
                description?.let { PrismCardDescription(it) }
                content()
                footer?.let {
                    Row(
                        modifier = Modifier.padding(top = PrismTheme.spacing.s1),
                        horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2),
                    ) { it() }
                }
            }
        }
    }

    if (onClick != null) {
        Surface(
            onClick = onClick,
            modifier = modifier,
            shape = shape,
            color = colors.bgElevated,
            contentColor = colors.labelPrimary,
            border = BorderStroke(1.dp, colors.separator),
            shadowElevation = elevation,
            content = body,
        )
    } else {
        Surface(
            modifier = modifier,
            shape = shape,
            color = colors.bgElevated,
            contentColor = colors.labelPrimary,
            border = BorderStroke(1.dp, colors.separator),
            shadowElevation = elevation,
            content = body,
        )
    }
}

/** Eyebrow label (small, tertiary). */
@Composable
fun PrismCardEyebrow(text: String) =
    Text(text, style = PrismTheme.typography.footnote, color = PrismTheme.colors.labelTertiary)

/** Card title. */
@Composable
fun PrismCardTitle(text: String) =
    Text(text, style = PrismTheme.typography.title2, color = PrismTheme.colors.labelPrimary)

/** Secondary description text. */
@Composable
fun PrismCardDescription(text: String) =
    Text(text, style = PrismTheme.typography.subhead, color = PrismTheme.colors.labelSecondary)
