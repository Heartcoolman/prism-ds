# prism-compose

Kotlin / Compose Multiplatform port of the **Prism** design system — the App-side
track of the hybrid strategy in [`../docs/COMPOSE-MIGRATION.md`](../docs/COMPOSE-MIGRATION.md).
Web stays on `@prism-ds/react`; this covers Android / iOS / Desktop and shares ONE
token source with the web so the two libraries cannot drift.

## Status — full component migration, cross-verified

All **46 components** ported and compiling, on **two targets verified here**
(Desktop/JVM + Android). ~4.8k lines of Kotlin.

| Area | Status |
|------|--------|
| Single token source → CSS **and** Kotlin (decision #6) | ✅ generated; CSS value-identical to `src/styles/tokens.css` (107 tokens, auto-checked) |
| Theme layer `PrismTheme` (Material3 base + 8 CompositionLocals, light/dark, apple/neutral brand) | ✅ + 9 token tests |
| Icons — 46-icon set, SVG→ImageVector, runtime strokeWidth | ✅ + 4 tests |
| **46 components** (prism-ui 41 · prism-charts 3 · prism-glass 2) | ✅ all compile; all 46 instantiated in `sample/Gallery.kt` |
| Accessibility — Material3 built-ins + `semantics{}` on custom-drawn components | ✅ (liveRegion / role / state / contentDescription) |
| Targets — Desktop (JVM) + **Android (minSdk 31)** | ✅ both compile |
| iOS target | ⏳ declared; needs Xcode / macOS CI to link |
| Maven Central publish · screenshot/pixel-parity regression · on-device TalkBack/VoiceOver | ⏳ external infra (see migration doc §7–9) |

## Module layout (plan §2)

```
tokens/prism-tokens.json     single source of truth → build-tokens.mjs → CSS + PrismGeneratedTokens.kt
prism-core/                  token data classes + CompositionLocals + PrismTheme (token→Material3 ColorScheme)
prism-icons/                 Icon set (icons.ts → build-icons.mjs → PrismIconPaths.kt) + PrismIcon
prism-charts/                BarChart / LineChart / ProgressRing (Canvas)
prism-glass/                 Material / LiquidGlass (translucent approximation; Haze/RenderEffect plugs in here)
prism-ui/                    the 41 standard components (Material3 base + tokens + semantics)
sample/                      runnable desktop showcase — Gallery.kt instantiates all 46 (Storybook replacement, §7)
```

Token/icon **values** are generated; the **schemas** (data classes, component APIs)
are hand-written. Change a color → edit `prism-tokens.json` + re-run the generator;
never hand-edit two files.

## Build & verify

JDK 17+ (`JAVA_HOME`), Node 18+. Android SDK for the Android target (`local.properties` → `sdk.dir`).

```bash
./verify.sh                 # token parity + icon regen + desktop compile/tests + android compile (the full gate)
./gradlew :prism-core:desktopTest :prism-icons:desktopTest
./gradlew :sample:run       # launch the desktop gallery
```

## Honest scope notes

- **Glass** (`prism-glass`) ships the dependency-free translucent-material tier that
  compiles on every target. True backdrop blur (Haze / `RenderEffect`, Android 12+;
  Skia shader elsewhere) plugs in behind the same API. Per §5 the App-side glass is an
  *approximation* of Apple-native glass by design — pixel-faithful glass is web-only.
- **Avatar/Image** render initials/placeholder (no Coil network loading wired).
- Pixel-parity vs the browser, Maven publishing, and on-device screen-reader testing
  are the plan's remaining phases — they need external CI/infra, not more code here.
