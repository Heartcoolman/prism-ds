package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import io.github.heartcoolman.prism.core.PrismTheme

/**
 * Alert — centered confirmation dialog for a single decision. Maps to Material3
 * AlertDialog: title, optional message, cancel + confirm actions. The confirm
 * action turns `danger`-colored when [destructive]; [stacked] lays the two
 * actions vertically (cancel above confirm) instead of side by side.
 */
@Composable
fun PrismAlert(
    open: Boolean,
    onClose: () -> Unit,
    title: String,
    modifier: Modifier = Modifier,
    message: String? = null,
    confirmLabel: String = "确认",
    cancelLabel: String = "取消",
    destructive: Boolean = false,
    stacked: Boolean = false,
    onConfirm: () -> Unit = {},
) {
    if (!open) return
    val colors = PrismTheme.colors
    val confirmColor = if (destructive) colors.danger else colors.accent

    val cancel: @Composable () -> Unit = {
        PrismAlertActionButton(text = cancelLabel, color = colors.accent, bold = false, onClick = onClose)
    }
    val confirm: @Composable () -> Unit = {
        PrismAlertActionButton(text = confirmLabel, color = confirmColor, bold = true, onClick = onConfirm)
    }

    AlertDialog(
        onDismissRequest = onClose,
        modifier = modifier,
        confirmButton = {
            if (stacked) {
                Column(
                    modifier = Modifier.fillMaxWidth(),
                    verticalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s1),
                ) {
                    cancel()
                    confirm()
                }
            } else {
                confirm()
            }
        },
        dismissButton = if (stacked) null else cancel,
        title = {
            Text(
                text = title,
                modifier = Modifier.fillMaxWidth(),
                style = PrismTheme.typography.headline,
                color = colors.labelPrimary,
                textAlign = TextAlign.Center,
            )
        },
        text = message?.let {
            {
                Text(
                    text = it,
                    modifier = Modifier.fillMaxWidth(),
                    style = PrismTheme.typography.footnote,
                    color = colors.labelSecondary,
                    textAlign = TextAlign.Center,
                )
            }
        },
        shape = RoundedCornerShape(PrismTheme.radius.modal),
        containerColor = colors.bg,
        titleContentColor = colors.labelPrimary,
        textContentColor = colors.labelSecondary,
    )
}

/** A single alert action: a token-colored text button; confirm is semibold. */
@Composable
private fun PrismAlertActionButton(
    text: String,
    color: Color,
    bold: Boolean,
    onClick: () -> Unit,
) {
    TextButton(
        onClick = onClick,
        colors = ButtonDefaults.textButtonColors(contentColor = color),
    ) {
        Text(
            text = text,
            style = PrismTheme.typography.body,
            fontWeight = if (bold) FontWeight.SemiBold else null,
        )
    }
}
