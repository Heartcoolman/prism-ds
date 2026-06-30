package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextFieldColors
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.VisualTransformation
import io.github.heartcoolman.prism.core.PrismTheme

/**
 * TextField — labeled single-line input. Label sits above (subhead/secondary);
 * help or error text sits below (footnote). Maps to Material3 OutlinedTextField
 * styled from Prism tokens; `error` switches the border + message to danger.
 */
@Composable
fun PrismTextField(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    label: String? = null,
    placeholder: String? = null,
    helpText: String? = null,
    error: String? = null,
    leadingIcon: (@Composable () -> Unit)? = null,
    enabled: Boolean = true,
    singleLine: Boolean = true,
    fullWidth: Boolean = false,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    visualTransformation: VisualTransformation = VisualTransformation.None,
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
        verticalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s1),
    ) {
        if (label != null) {
            Text(label, style = PrismTheme.typography.subhead, color = colors.labelSecondary)
        }
        OutlinedTextField(
            value = value,
            onValueChange = onValueChange,
            modifier = widthMod,
            enabled = enabled,
            singleLine = singleLine,
            isError = hasError,
            textStyle = PrismTheme.typography.body,
            placeholder = placeholderSlot,
            leadingIcon = leadingIcon,
            keyboardOptions = keyboardOptions,
            visualTransformation = visualTransformation,
            shape = RoundedCornerShape(PrismTheme.radius.input),
            colors = prismInputColors(),
        )
        if (message != null) {
            Text(
                message,
                style = PrismTheme.typography.footnote,
                color = if (hasError) colors.danger else colors.labelTertiary,
            )
        }
    }
}

/** Shared OutlinedTextField token colors for the text-input family. */
@Composable
internal fun prismInputColors(): TextFieldColors {
    val c = PrismTheme.colors
    return OutlinedTextFieldDefaults.colors(
        focusedTextColor = c.labelPrimary,
        unfocusedTextColor = c.labelPrimary,
        disabledTextColor = c.labelTertiary,
        cursorColor = c.accent,
        focusedBorderColor = c.accent,
        unfocusedBorderColor = c.separatorOpaque,
        disabledBorderColor = c.separator,
        errorBorderColor = c.danger,
        focusedContainerColor = c.bg,
        unfocusedContainerColor = c.bg,
        disabledContainerColor = c.bg,
        errorContainerColor = c.bg,
        focusedPlaceholderColor = c.labelTertiary,
        unfocusedPlaceholderColor = c.labelTertiary,
    )
}
