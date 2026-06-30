package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

/**
 * Responsive layout grid. Without [columns] it adapts to the available width
 * (4 columns < 600dp, 8 < 1024dp, else 12). With [columns] it renders exactly
 * that many equal-width tracks. Items flow into rows; the last row is padded
 * with empty tracks so widths stay even. [gap] defaults to spacing.s5.
 */
@Composable
fun <T> PrismGrid(
    items: List<T>,
    modifier: Modifier = Modifier,
    columns: Int? = null,
    gap: Dp = Dp.Unspecified,
    itemContent: @Composable (T) -> Unit,
) {
    val realGap = if (gap == Dp.Unspecified) PrismTheme.spacing.s5 else gap
    BoxWithConstraints(modifier = modifier.fillMaxWidth()) {
        val cols = columns ?: when {
            maxWidth < 600.dp -> 4
            maxWidth < 1024.dp -> 8
            else -> 12
        }
        Column(verticalArrangement = Arrangement.spacedBy(realGap)) {
            items.chunked(cols).forEach { rowItems ->
                Row(horizontalArrangement = Arrangement.spacedBy(realGap)) {
                    rowItems.forEach { item ->
                        Box(modifier = Modifier.weight(1f)) { itemContent(item) }
                    }
                    repeat(cols - rowItems.size) {
                        Spacer(modifier = Modifier.weight(1f))
                    }
                }
            }
        }
    }
}
