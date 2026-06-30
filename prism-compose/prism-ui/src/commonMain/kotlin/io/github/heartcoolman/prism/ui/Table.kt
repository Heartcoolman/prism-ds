package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

enum class PrismCellAlign { Left, Right }

/** A table column definition. [numeric] right-aligns cells and uses tabular figures. */
data class PrismTableColumn(
    val key: String,
    val header: String,
    val align: PrismCellAlign? = null,
    val numeric: Boolean = false,
)

/**
 * Data table. Footnote-weight headings over subhead body rows with hairline
 * separators. Numeric columns align right with tabular figures. Columns share
 * width equally; each cell value is looked up in the row map by column key.
 */
@Composable
fun PrismTable(
    columns: List<PrismTableColumn>,
    rows: List<Map<String, String>>,
    modifier: Modifier = Modifier,
    caption: String? = null,
) {
    val colors = PrismTheme.colors
    val spacing = PrismTheme.spacing

    fun PrismTableColumn.resolvedAlign(): TextAlign =
        if ((align ?: if (numeric) PrismCellAlign.Right else PrismCellAlign.Left) == PrismCellAlign.Right) {
            TextAlign.End
        } else {
            TextAlign.Start
        }

    Column(modifier = modifier.fillMaxWidth()) {
        if (caption != null) {
            Text(
                text = caption,
                modifier = Modifier.padding(horizontal = spacing.s4, vertical = spacing.s2),
                style = PrismTheme.typography.footnote,
                color = colors.labelSecondary,
            )
        }
        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = spacing.s4, vertical = spacing.s3)) {
            columns.forEach { col ->
                Text(
                    text = col.header,
                    modifier = Modifier.weight(1f),
                    style = PrismTheme.typography.footnote.copy(fontWeight = FontWeight.SemiBold),
                    color = colors.labelSecondary,
                    textAlign = col.resolvedAlign(),
                )
            }
        }
        HorizontalDivider(thickness = 1.dp, color = colors.separator)
        rows.forEach { row ->
            Row(modifier = Modifier.fillMaxWidth().padding(horizontal = spacing.s4, vertical = spacing.s3)) {
                columns.forEach { col ->
                    val base = PrismTheme.typography.subhead
                    Text(
                        text = row[col.key] ?: "",
                        modifier = Modifier.weight(1f),
                        style = if (col.numeric) base.copy(fontFeatureSettings = "tnum") else base,
                        color = colors.labelPrimary,
                        textAlign = col.resolvedAlign(),
                    )
                }
            }
            HorizontalDivider(thickness = 1.dp, color = colors.separator)
        }
    }
}
