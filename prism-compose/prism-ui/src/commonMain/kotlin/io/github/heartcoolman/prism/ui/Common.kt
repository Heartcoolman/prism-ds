package io.github.heartcoolman.prism.ui

import androidx.compose.runtime.Composable
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.ui.graphics.Color
import io.github.heartcoolman.prism.core.PrismTheme

/** Semantic tone shared by Button / Badge / Banner / Tag etc. */
enum class PrismTone { Accent, Success, Warning, Danger, Neutral }

@Composable
@ReadOnlyComposable
internal fun PrismTone.color(): Color = with(PrismTheme.colors) {
    when (this@color) {
        PrismTone.Accent -> accent
        PrismTone.Success -> success
        PrismTone.Warning -> warning
        PrismTone.Danger -> danger
        PrismTone.Neutral -> labelPrimary
    }
}

@Composable
@ReadOnlyComposable
internal fun PrismTone.tintBg(): Color = with(PrismTheme.colors) {
    when (this@tintBg) {
        PrismTone.Accent -> tintAccentBg
        PrismTone.Success -> tintSuccessBg
        PrismTone.Warning -> tintWarningBg
        PrismTone.Danger -> tintDangerBg
        PrismTone.Neutral -> fillSecondary
    }
}
