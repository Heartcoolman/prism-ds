package io.github.heartcoolman.prism.sample

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.core.tokens.PrismColorScheme
import io.github.heartcoolman.prism.core.tokens.appleBrand
import io.github.heartcoolman.prism.core.tokens.neutralBrand
import io.github.heartcoolman.prism.ui.PrismButton
import io.github.heartcoolman.prism.ui.PrismButtonVariant

/** Desktop sample / visual QA harness — the App-side replacement for Storybook (§7). */
fun main() = application {
    Window(onCloseRequest = ::exitApplication, title = "Prism · Compose") {
        var dark by remember { mutableStateOf(false) }
        var neutral by remember { mutableStateOf(false) }
        PrismTheme(
            colorScheme = if (dark) PrismColorScheme.Dark else PrismColorScheme.Light,
            brand = if (neutral) neutralBrand else appleBrand,
        ) {
            App(
                dark = dark,
                neutral = neutral,
                onToggleDark = { dark = !dark },
                onToggleBrand = { neutral = !neutral },
            )
        }
    }
}

@Composable
private fun App(
    dark: Boolean,
    neutral: Boolean,
    onToggleDark: () -> Unit,
    onToggleBrand: () -> Unit,
) {
    Column(modifier = Modifier.fillMaxSize()) {
        Row(
            modifier = Modifier.padding(
                horizontal = PrismTheme.spacing.s5,
                vertical = PrismTheme.spacing.s4,
            ),
            horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2),
        ) {
            PrismButton(onClick = onToggleDark, variant = PrismButtonVariant.Filled) {
                Text(if (dark) "Light" else "Dark")
            }
            PrismButton(onClick = onToggleBrand, variant = PrismButtonVariant.Tinted) {
                Text(if (neutral) "Apple brand" else "Neutral brand")
            }
        }
        // Gallery() owns its own vertical scroll — give it the remaining space.
        Box(modifier = Modifier.fillMaxSize()) {
            Gallery()
        }
    }
}
