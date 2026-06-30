package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import io.github.heartcoolman.prism.core.PrismTheme

/**
 * Textarea — multiline labeled input. Same label/help/error chrome as
 * [PrismTextField]; the control is a multiline OutlinedTextField sized by
 * `minLines`. `error` styles the border + message in danger and replaces help.
 */
@Composable
fun PrismTextarea(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    label: String? = null,
    placeholder: String? = null,
    helpText: String? = null,
    error: String? = null,
    enabled: Boolean = true,
    minLines: Int = 4,
    maxLines: Int = Int.MAX_VALUE,
    fullWidth: Boolean = false,
) {
    val colors = PrismTheme.colors
    val hasError = !error.isNullOrEmpty()
    val message = if (hasError) error else helpText
    val widthMod = if (fullWidth) Modifier.fillMaxWidth() else Modifier
    val placeholderSlot: (@Composable () -> Unit)? = placeholder?.let { text ->
        { Text(text, style = PrismTheme.typography.body, color = colors.labelTertiary) }
    }

    Column(
        modifier = modifier.then(widthMod),
        verticalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2),
    ) {
        if (label != null) {
            Text(label, style = PrismTheme.typography.subhead, color = colors.labelSecondary)
        }
        OutlinedTextField(
            value = value,
            onValueChange = onValueChange,
            modifier = widthMod,
            enabled = enabled,
            singleLine = false,
            minLines = minLines,
            maxLines = maxLines,
            isError = hasError,
            textStyle = PrismTheme.typography.body,
            placeholder = placeholderSlot,
            shape = RoundedCornerShape(PrismTheme.radius.input),
            colors = prismInputColors(),
        )
        if (message != null) {
            Text(
                message,
                style = PrismTheme.typography.footnote,
                color = if (hasError) colors.danger else colors.labelSecondary,
            )
        }
    }
}
