// ============================================================
// GENERATED from tokens/prism-tokens.json — do not edit by hand.
// Run: node tokens/build-tokens.mjs
// Single source of truth shared with the web CSS (COMPOSE-MIGRATION.md #6).
// ============================================================
package io.github.heartcoolman.prism.core.tokens

import androidx.compose.animation.core.CubicBezierEasing
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.em
import androidx.compose.ui.unit.sp

val lightPrismColors: PrismColors = PrismColors(
    accent = Color(0xFF0066CC),
    accentHover = Color(0xFF0058B3),
    accentPressed = Color(0xFF004A99),
    success = Color(0xFF1D8A4E),
    warning = Color(0xFFC2410C),
    danger = Color(0xFFC5283D),
    bg = Color(0xFFFFFFFF),
    bgElevated = Color(0xFFF5F5F7),
    bgSecondary = Color(0xFFF5F5F7),
    bgOverlay = Color(red = 0f, green = 0f, blue = 0f, alpha = 0.4f),
    labelPrimary = Color(0xFF1D1D1F),
    labelSecondary = Color(0xFF6E6E73),
    labelTertiary = Color(0xFF86868B),
    labelQuaternary = Color(0xFFAEAEB2),
    labelOnAccent = Color(0xFFFFFFFF),
    separator = Color(red = 0f, green = 0f, blue = 0f, alpha = 0.08f),
    separatorOpaque = Color(0xFFE8E8ED),
    fillSecondary = Color(0xFFF5F5F7),
    fillTertiary = Color(0xFFE8E8ED),
    fillQuaternary = Color(0xFFECECED),
    tintAccentBg = Color(0xFFE8EEFB),
    tintSuccessBg = Color(0xFFE6F4EC),
    tintWarningBg = Color(0xFFFDEEE6),
    tintDangerBg = Color(0xFFFBE9EC),
    materialBg = Color(red = 1f, green = 1f, blue = 1f, alpha = 0.72f),
    focusRing = Color(red = 0f, green = 0.4f, blue = 0.8f, alpha = 0.4f),
)

val darkPrismColors: PrismColors = PrismColors(
    accent = Color(0xFF3393FF),
    accentHover = Color(0xFF0058B3),
    accentPressed = Color(0xFF004A99),
    success = Color(0xFF1D8A4E),
    warning = Color(0xFFC2410C),
    danger = Color(0xFFC5283D),
    bg = Color(0xFF000000),
    bgElevated = Color(0xFF1C1C1E),
    bgSecondary = Color(0xFF1C1C1E),
    bgOverlay = Color(red = 0f, green = 0f, blue = 0f, alpha = 0.6f),
    labelPrimary = Color(0xFFF5F5F7),
    labelSecondary = Color(0xFFAEAEB2),
    labelTertiary = Color(0xFF8E8E93),
    labelQuaternary = Color(0xFF636366),
    labelOnAccent = Color(0xFFFFFFFF),
    separator = Color(red = 1f, green = 1f, blue = 1f, alpha = 0.12f),
    separatorOpaque = Color(0xFF2C2C2E),
    fillSecondary = Color(0xFF1C1C1E),
    fillTertiary = Color(0xFF2C2C2E),
    fillQuaternary = Color(0xFF3A3A3C),
    tintAccentBg = Color(red = 0.2f, green = 0.576471f, blue = 1f, alpha = 0.16f),
    tintSuccessBg = Color(red = 0.113725f, green = 0.541176f, blue = 0.305882f, alpha = 0.18f),
    tintWarningBg = Color(red = 0.760784f, green = 0.254902f, blue = 0.047059f, alpha = 0.2f),
    tintDangerBg = Color(red = 0.772549f, green = 0.156863f, blue = 0.239216f, alpha = 0.2f),
    materialBg = Color(red = 0.117647f, green = 0.117647f, blue = 0.12549f, alpha = 0.72f),
    focusRing = Color(red = 0.2f, green = 0.576471f, blue = 1f, alpha = 0.5f),
)

val prismTypography: PrismTypography = PrismTypography(
    largeTitle = TextStyle(fontFamily = FontFamily.Default, fontWeight = FontWeight(700), fontSize = 34.sp, lineHeight = 37.4.sp, letterSpacing = -0.02.em),
    title1 = TextStyle(fontFamily = FontFamily.Default, fontWeight = FontWeight(640), fontSize = 28.sp, lineHeight = 32.2.sp, letterSpacing = -0.015.em),
    title2 = TextStyle(fontFamily = FontFamily.Default, fontWeight = FontWeight(600), fontSize = 22.sp, lineHeight = 26.4.sp),
    headline = TextStyle(fontFamily = FontFamily.Default, fontWeight = FontWeight(600), fontSize = 17.sp, lineHeight = 22.1.sp),
    body = TextStyle(fontFamily = FontFamily.Default, fontWeight = FontWeight(400), fontSize = 17.sp, lineHeight = 25.5.sp),
    subhead = TextStyle(fontFamily = FontFamily.Default, fontWeight = FontWeight(400), fontSize = 15.sp, lineHeight = 21.75.sp),
    footnote = TextStyle(fontFamily = FontFamily.Default, fontWeight = FontWeight(400), fontSize = 13.sp, lineHeight = 18.2.sp),
)

val prismSpacing: PrismSpacing = PrismSpacing(
    s1 = 4.dp,
    s2 = 8.dp,
    s3 = 12.dp,
    s4 = 16.dp,
    s5 = 24.dp,
    s6 = 32.dp,
    s7 = 64.dp,
)

val prismRadius: PrismRadius = PrismRadius(
    pill = 980.dp,
    card = 18.dp,
    modal = 20.dp,
    sheet = 20.dp,
    input = 10.dp,
    inner = 10.dp,
    image = 14.dp,
    sm = 6.dp,
)

val prismElevation: PrismElevation = PrismElevation(
    level1 = 1.dp,
    level2 = 4.dp,
    level3 = 12.dp,
    level4 = 24.dp,
    card = 2.dp,
)

val prismMotion: PrismMotion = PrismMotion(
    easeStandard = CubicBezierEasing(0.4f, 0f, 0.2f, 1f),
    easeEnter = CubicBezierEasing(0f, 0f, 0.2f, 1f),
    easeExit = CubicBezierEasing(0.4f, 0f, 1f, 1f),
    easeEmphasized = CubicBezierEasing(0.2f, 0f, 0f, 1f),
    durStandard = 300,
    durEnter = 250,
    durExit = 200,
    durEmphasized = 500,
)

val prismDimensions: PrismDimensions = PrismDimensions(
    sizeTouch = 44.dp,
    controlHeightSm = 28.dp,
    controlHeightMd = 44.dp,
    controlHeightLg = 50.dp,
    focusRingWidth = 3.dp,
)

val prismMaterials: PrismMaterials = PrismMaterials(
    blurThin = 16.dp,
    blurRegular = 24.dp,
    blurThick = 40.dp,
)

val appleBrand: PrismBrand = PrismBrand(
    accent = Color(0xFF0066CC),
    accentHover = Color(0xFF0058B3),
    accentPressed = Color(0xFF004A99),
    success = Color(0xFF1D8A4E),
    warning = Color(0xFFC2410C),
    danger = Color(0xFFC5283D),
    radiusPill = 980.dp,
    radiusCard = 18.dp,
    radiusModal = 20.dp,
    radiusInput = 10.dp,
    radiusImage = 14.dp,
    radiusSm = 6.dp,
)

val neutralBrand: PrismBrand = PrismBrand(
    accent = Color(0xFF4F46E5),
    accentHover = Color(0xFF4338CA),
    accentPressed = Color(0xFF3730A3),
    success = Color(0xFF15803D),
    warning = Color(0xFFB45309),
    danger = Color(0xFFB91C1C),
    radiusPill = 8.dp,
    radiusCard = 12.dp,
    radiusModal = 14.dp,
    radiusInput = 8.dp,
    radiusImage = 10.dp,
    radiusSm = 4.dp,
)
