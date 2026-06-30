package io.github.heartcoolman.prism.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.core.PrismTheme

/**
 * One bottom-tab descriptor. `icon` is a composable slot — pass e.g.
 * `{ PrismIcon(PrismIcons.Home, contentDescription = null, size = 24.dp) }`.
 */
data class PrismTabBarItem(
    val key: String,
    val label: String,
    val icon: @Composable () -> Unit,
)

/**
 * TabBar — bottom navigation over Material3 NavigationBar. Translucent
 * `materialBg` background with a hairline top separator; the selected tab uses
 * the accent color, the rest are tertiary (no highlight pill). Controlled.
 */
@Composable
fun PrismTabBar(
    items: List<PrismTabBarItem>,
    value: String,
    onChange: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    val colors = PrismTheme.colors
    Column(modifier = modifier.fillMaxWidth()) {
        Box(
            Modifier
                .fillMaxWidth()
                .height(1.dp)
                .background(colors.separator),
        )
        NavigationBar(
            containerColor = colors.materialBg,
            contentColor = colors.labelTertiary,
            tonalElevation = 0.dp,
        ) {
            items.forEach { item ->
                val selected = item.key == value
                NavigationBarItem(
                    selected = selected,
                    onClick = { onChange(item.key) },
                    icon = item.icon,
                    label = { Text(item.label, style = PrismTheme.typography.footnote, maxLines = 1) },
                    alwaysShowLabel = true,
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = colors.accent,
                        selectedTextColor = colors.accent,
                        unselectedIconColor = colors.labelTertiary,
                        unselectedTextColor = colors.labelTertiary,
                        indicatorColor = Color.Transparent,
                    ),
                )
            }
        }
    }
}
