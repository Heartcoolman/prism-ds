package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.snapping.rememberSnapFlingBehavior
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme
import kotlin.math.abs
import kotlin.math.roundToInt

/** One option in a wheel column — a display [label] decoupled from a stable [value]. */
data class PrismWheelOption(val label: String, val value: String)

/** A wheel column: ordered options + the currently selected value. */
data class PrismWheelColumn(val options: List<PrismWheelOption>, val value: String)

/**
 * WheelPicker (single column) — drum/wheel selector. A scrolling [LazyColumn]
 * with snap-to-center fling; the centered row is full-opacity while neighbours
 * fade and shrink. Settling on / tapping a row fires [onSelectedChange].
 */
@Composable
fun PrismWheelPicker(
    options: List<String>,
    selectedIndex: Int,
    onSelectedChange: (Int) -> Unit,
    modifier: Modifier = Modifier,
    visibleCount: Int = 5,
    itemHeight: Dp = 36.dp,
) {
    WheelColumnView(options, selectedIndex, onSelectedChange, modifier, visibleCount, itemHeight)
}

/**
 * WheelPicker (multi-column) — the React `columns` contract: one or more wheels
 * side by side (e.g. hour / minute / second). [onChange] reports `(columnIndex,
 * value)`.
 */
@Composable
fun PrismWheelPicker(
    columns: List<PrismWheelColumn>,
    onChange: (columnIndex: Int, value: String) -> Unit,
    modifier: Modifier = Modifier,
    visibleCount: Int = 5,
    itemHeight: Dp = 36.dp,
) {
    Row(modifier = modifier, horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2)) {
        columns.forEachIndexed { ci, col ->
            val labels = col.options.map { it.label }
            val sel = col.options.indexOfFirst { it.value == col.value }.coerceAtLeast(0)
            WheelColumnView(
                options = labels,
                selectedIndex = sel,
                onSelectedChange = { idx -> col.options.getOrNull(idx)?.let { onChange(ci, it.value) } },
                modifier = Modifier.weight(1f),
                visibleCount = visibleCount,
                itemHeight = itemHeight,
            )
        }
    }
}

@Composable
private fun WheelColumnView(
    options: List<String>,
    selectedIndex: Int,
    onSelectedChange: (Int) -> Unit,
    modifier: Modifier,
    visibleCount: Int,
    itemHeight: Dp,
) {
    val colors = PrismTheme.colors
    val spacing = PrismTheme.spacing
    val count = if (visibleCount % 2 == 0) visibleCount + 1 else visibleCount
    val half = count / 2

    val itemHeightPx = with(LocalDensity.current) { itemHeight.toPx() }
    val listState = rememberLazyListState()
    val snap = rememberSnapFlingBehavior(lazyListState = listState)

    val centerFraction by remember {
        derivedStateOf {
            val viewportCenter = count * itemHeightPx / 2f
            val visible = listState.layoutInfo.visibleItemsInfo
            if (visible.isEmpty()) {
                selectedIndex.toFloat()
            } else {
                val nearest = visible.minByOrNull { abs((it.offset + it.size / 2f) - viewportCenter) }!!
                nearest.index + (viewportCenter - (nearest.offset + nearest.size / 2f)) / nearest.size
            }
        }
    }

    LaunchedEffect(Unit) {
        if (selectedIndex in options.indices) listState.scrollToItem(selectedIndex)
    }
    LaunchedEffect(selectedIndex) {
        if (selectedIndex in options.indices && centerFraction.roundToInt() != selectedIndex) {
            listState.animateScrollToItem(selectedIndex)
        }
    }
    LaunchedEffect(listState.isScrollInProgress) {
        if (!listState.isScrollInProgress && options.isNotEmpty()) {
            val target = centerFraction.roundToInt().coerceIn(0, options.lastIndex)
            if (target != selectedIndex) onSelectedChange(target)
        }
    }

    Box(
        modifier = modifier
            .height(itemHeight * count)
            .semantics { stateDescription = options.getOrNull(selectedIndex) ?: "" },
        contentAlignment = Alignment.Center,
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = spacing.s1)
                .height(itemHeight)
                .clip(RoundedCornerShape(PrismTheme.radius.sm))
                .background(colors.fillTertiary),
        )
        LazyColumn(
            state = listState,
            flingBehavior = snap,
            contentPadding = PaddingValues(vertical = itemHeight * half),
        ) {
            items(count = options.size) { index ->
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(itemHeight)
                        .graphicsLayer {
                            val dist = abs(index - centerFraction)
                            alpha = (1f - dist * 0.38f).coerceIn(0.15f, 1f)
                            val s = (1f - dist * 0.08f).coerceIn(0.8f, 1f)
                            scaleX = s
                            scaleY = s
                        }
                        .clickable { onSelectedChange(index) }
                        .padding(horizontal = spacing.s2),
                    contentAlignment = Alignment.Center,
                ) {
                    Text(
                        text = options[index],
                        style = PrismTheme.typography.headline,
                        color = colors.labelPrimary,
                        maxLines = 1,
                    )
                }
            }
        }
    }
}
