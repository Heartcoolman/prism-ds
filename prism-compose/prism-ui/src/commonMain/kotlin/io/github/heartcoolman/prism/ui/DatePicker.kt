package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.selected
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.icons.PrismIcon
import io.github.heartcoolman.prism.icons.PrismIcons

private val WEEKDAYS = listOf("日", "一", "二", "三", "四", "五", "六")

/** Calendar date. `month` is 1-12. */
data class PrismDate(val year: Int, val month: Int, val day: Int)

private fun isLeapYear(y: Int): Boolean = (y % 4 == 0 && y % 100 != 0) || y % 400 == 0

private fun daysInMonth(year: Int, month: Int): Int = when (month) {
    1, 3, 5, 7, 8, 10, 12 -> 31
    4, 6, 9, 11 -> 30
    2 -> if (isLeapYear(year)) 29 else 28
    else -> 30
}

/** Sakamoto's algorithm — 0 = Sunday … 6 = Saturday. `month` is 1-12. */
private fun dayOfWeek(year: Int, month: Int, day: Int): Int {
    val t = intArrayOf(0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4)
    val y = if (month < 3) year - 1 else year
    return (y + y / 4 - y / 100 + y / 400 + t[month - 1] + day).mod(7)
}

/** Resolve a day number (may be <=0 or > month length) into a concrete date. */
private fun cellDate(year: Int, month: Int, day: Int): PrismDate {
    var y = year
    var m = month
    var d = day
    while (d < 1) {
        m -= 1
        if (m < 1) { m = 12; y -= 1 }
        d += daysInMonth(y, m)
    }
    while (d > daysInMonth(y, m)) {
        d -= daysInMonth(y, m)
        m += 1
        if (m > 12) { m = 1; y += 1 }
    }
    return PrismDate(y, m, d)
}

/**
 * DatePicker — self-contained 42-cell month grid built with pure Kotlin date
 * math (leap year + Sakamoto day-of-week), no date library. The displayed month
 * is internal, seeded from `defaultMonth`, then `value`, then `today`. Pass
 * `today` to highlight the current day (no system clock is read here).
 */
@Composable
fun PrismDatePicker(
    modifier: Modifier = Modifier,
    value: PrismDate? = null,
    onChange: (PrismDate) -> Unit = {},
    defaultMonth: PrismDate? = null,
    today: PrismDate? = null,
) {
    val colors = PrismTheme.colors
    val spacing = PrismTheme.spacing
    val seed = defaultMonth ?: value ?: today ?: PrismDate(2025, 1, 1)
    var displayed by remember { mutableStateOf(PrismDate(seed.year, seed.month, 1)) }

    val year = displayed.year
    val month = displayed.month
    val firstWeekday = dayOfWeek(year, month, 1)
    val label = "$year 年 $month 月"

    fun goTo(delta: Int) {
        var m = month + delta
        var y = year
        while (m < 1) { m += 12; y -= 1 }
        while (m > 12) { m -= 12; y += 1 }
        displayed = PrismDate(y, m, 1)
    }

    Surface(
        modifier = modifier,
        shape = RoundedCornerShape(PrismTheme.radius.card),
        color = colors.bgElevated,
        contentColor = colors.labelPrimary,
        shadowElevation = PrismTheme.elevation.card,
    ) {
        Column(
            modifier = Modifier.padding(spacing.s3),
            verticalArrangement = Arrangement.spacedBy(spacing.s2),
        ) {
            // Header: month nav + title.
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                NavButton(PrismIcons.ChevronLeft, "上个月") { goTo(-1) }
                Text(
                    text = label,
                    modifier = Modifier.weight(1f),
                    style = PrismTheme.typography.headline,
                    color = colors.labelPrimary,
                    textAlign = TextAlign.Center,
                )
                NavButton(PrismIcons.ChevronRight, "下个月") { goTo(1) }
            }

            // Weekday labels.
            Row(horizontalArrangement = Arrangement.spacedBy(spacing.s1)) {
                WEEKDAYS.forEach { w ->
                    Box(
                        modifier = Modifier.size(width = 36.dp, height = 24.dp),
                        contentAlignment = Alignment.Center,
                    ) {
                        Text(w, style = PrismTheme.typography.footnote, color = colors.labelTertiary)
                    }
                }
            }

            // 6 weeks × 7 days.
            Column(verticalArrangement = Arrangement.spacedBy(spacing.s1)) {
                for (week in 0 until 6) {
                    Row(horizontalArrangement = Arrangement.spacedBy(spacing.s1)) {
                        for (dow in 0 until 7) {
                            val date = cellDate(year, month, week * 7 + dow - firstWeekday + 1)
                            val outside = date.month != month || date.year != year
                            val isSelected = value == date
                            val isToday = today != null && today == date && !isSelected
                            DayCell(
                                day = date.day,
                                outside = outside,
                                selected = isSelected,
                                today = isToday,
                                onClick = { onChange(date) },
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun NavButton(icon: ImageVector, label: String, onClick: () -> Unit) {
    Box(
        modifier = Modifier
            .size(36.dp)
            .clip(CircleShape)
            .clickable(onClick = onClick)
            .semantics {
                role = Role.Button
                contentDescription = label
            },
        contentAlignment = Alignment.Center,
    ) {
        PrismIcon(icon, contentDescription = null, size = 18.dp, tint = PrismTheme.colors.accent)
    }
}

@Composable
private fun DayCell(
    day: Int,
    outside: Boolean,
    selected: Boolean,
    today: Boolean,
    onClick: () -> Unit,
) {
    val colors = PrismTheme.colors
    val textColor = when {
        selected -> Color.White
        outside -> colors.labelQuaternary
        else -> colors.labelPrimary
    }
    Box(
        modifier = Modifier
            .size(36.dp)
            .clip(CircleShape)
            .background(if (selected) colors.accent else Color.Transparent)
            .then(if (today) Modifier.border(1.dp, colors.accent, CircleShape) else Modifier)
            .clickable(onClick = onClick)
            .semantics { this.selected = selected },
        contentAlignment = Alignment.Center,
    ) {
        Text(text = day.toString(), style = PrismTheme.typography.subhead, color = textColor)
    }
}
