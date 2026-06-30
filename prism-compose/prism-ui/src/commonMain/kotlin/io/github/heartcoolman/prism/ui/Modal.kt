package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.ProvideTextStyle
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import io.github.heartcoolman.prism.core.PrismTheme

/**
 * Modal — centered dialog card over a dimmed scrim. Closes on back/Escape and on
 * scrim click (when `dismissOnScrim`). Maps to a foundation Dialog; the card is a
 * token-styled Surface (radius.modal, elevation.level4). Actions get a [RowScope]
 * so callers can `Modifier.weight(1f)` each button to fill the row.
 */
@Composable
fun PrismModal(
    open: Boolean,
    onClose: () -> Unit,
    modifier: Modifier = Modifier,
    title: String? = null,
    dismissOnScrim: Boolean = true,
    actions: (@Composable RowScope.() -> Unit)? = null,
    content: (@Composable () -> Unit)? = null,
) {
    if (!open) return
    val colors = PrismTheme.colors
    val typography = PrismTheme.typography
    Dialog(
        onDismissRequest = onClose,
        properties = DialogProperties(
            dismissOnBackPress = true,
            dismissOnClickOutside = dismissOnScrim,
        ),
    ) {
        Surface(
            modifier = modifier.widthIn(max = 360.dp),
            shape = RoundedCornerShape(PrismTheme.radius.modal),
            color = colors.bg,
            contentColor = colors.labelPrimary,
            shadowElevation = PrismTheme.elevation.level4,
        ) {
            Column(
                modifier = Modifier.fillMaxWidth().padding(PrismTheme.spacing.s5),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2),
            ) {
                title?.let {
                    Text(
                        text = it,
                        modifier = Modifier.fillMaxWidth(),
                        style = typography.headline,
                        color = colors.labelPrimary,
                        textAlign = TextAlign.Center,
                    )
                }
                content?.let {
                    ProvideTextStyle(typography.subhead) {
                        CompositionLocalProvider(LocalContentColor provides colors.labelSecondary) { it() }
                    }
                }
                actions?.let {
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(top = PrismTheme.spacing.s3),
                        horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2),
                        content = it,
                    )
                }
            }
        }
    }
}
