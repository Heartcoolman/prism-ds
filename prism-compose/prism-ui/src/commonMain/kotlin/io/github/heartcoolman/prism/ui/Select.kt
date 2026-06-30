@file:OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)

package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.MenuAnchorType
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import io.github.heartcoolman.prism.core.PrismTheme

/**
 * Select — labeled dropdown over a list of options. Label sits above; help or
 * error text below. Maps to Material3 ExposedDropdownMenuBox with a read-only
 * anchor + a rotating trailing chevron, styled from Prism tokens.
 */
@Composable
fun <T> PrismSelect(
    value: T,
    onValueChange: (T) -> Unit,
    options: List<T>,
    modifier: Modifier = Modifier,
    label: String? = null,
    placeholder: String? = null,
    helpText: String? = null,
    error: String? = null,
    enabled: Boolean = true,
    fullWidth: Boolean = false,
    optionLabel: (T) -> String = { it.toString() },
) {
    val colors = PrismTheme.colors
    val hasError = !error.isNullOrEmpty()
    val message = if (hasError) error else helpText
    val widthMod = if (fullWidth) Modifier.fillMaxWidth() else Modifier
    var expanded by remember { mutableStateOf(false) }
    val selectedText = optionLabel(value)

    Column(
        modifier = modifier.then(widthMod),
        verticalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s1),
    ) {
        if (label != null) {
            Text(label, style = PrismTheme.typography.subhead, color = colors.labelSecondary)
        }
        ExposedDropdownMenuBox(
            expanded = expanded,
            onExpandedChange = { if (enabled) expanded = it },
            modifier = widthMod,
        ) {
            OutlinedTextField(
                value = selectedText,
                onValueChange = {},
                readOnly = true,
                enabled = enabled,
                singleLine = true,
                isError = hasError,
                modifier = widthMod.menuAnchor(MenuAnchorType.PrimaryNotEditable, enabled),
                textStyle = PrismTheme.typography.body,
                placeholder = placeholder?.let { text ->
                    { Text(text, style = PrismTheme.typography.body, color = colors.labelTertiary) }
                },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
                shape = RoundedCornerShape(PrismTheme.radius.input),
                colors = prismInputColors(),
            )
            ExposedDropdownMenu(
                expanded = expanded,
                onDismissRequest = { expanded = false },
            ) {
                options.forEach { option ->
                    DropdownMenuItem(
                        text = {
                            Text(
                                optionLabel(option),
                                style = PrismTheme.typography.body,
                                color = colors.labelPrimary,
                            )
                        },
                        onClick = {
                            onValueChange(option)
                            expanded = false
                        },
                    )
                }
            }
        }
        if (message != null) {
            Text(
                message,
                style = PrismTheme.typography.footnote,
                color = if (hasError) colors.danger else colors.labelTertiary,
            )
        }
    }
}
