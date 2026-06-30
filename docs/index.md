# Prism

**A themeable, Apple-inspired design system — for Compose Multiplatform _and_ React.**

Prism is a dual-track UI library that shares one design language across platforms:

- **`prism-compose`** — 46 components for **Android · iOS · Desktop** (Kotlin / Compose Multiplatform), built on a Material 3 base with a token-driven `PrismTheme`.
- **`@prism-ds/react`** — the same 46 components for the **web** (React + TypeScript), styled with CSS custom-property tokens.

Both tracks are generated from a **single token source**, so colors, type, spacing, motion and brand never drift between web and app.

[Get started](install.md){ .md-button .md-button--primary }
[Components](components.md){ .md-button }
[View on GitHub](https://github.com/Heartcoolman/prism-ds){ .md-button }

---

<div class="grid cards" markdown>

-   :material-palette: __Token-driven__

    ---

    Primitive → semantic → component tokens. One source of truth emits both CSS variables and Kotlin data classes.

-   :material-material-design: __Material 3 base__

    ---

    `PrismTheme` maps Prism tokens onto a Material 3 `ColorScheme`, then layers Prism-only tokens via `CompositionLocal`.

-   :material-cards: __46 components__

    ---

    Buttons, inputs, navigation, overlays, lists, charts, glass — the full set, faithful to the React originals.

-   :material-cellphone-link: __Multiplatform__

    ---

    Android (minSdk 31), iOS and Desktop from one `commonMain`; the web stays on React for pixel-perfect CSS.

-   :material-brush-variant: __Themeable__

    ---

    Ship the Apple-inspired default, switch to the neutral preset, or inject your own brand — light & dark.

-   :material-blur: __Glass material__

    ---

    A risk-isolated `prism-glass` module for translucent materials; the production backdrop-blur path plugs in behind one API.

</div>

---

## Quick taste

```kotlin
PrismTheme(brand = appleBrand) {
    Column(verticalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s3)) {
        PrismButton(onClick = { /* … */ }) { Text("Continue") }

        PrismCard(
            eyebrow = "DESIGN SYSTEM",
            title = "Prism for Compose",
            description = "Token-faithful components on a Material 3 base.",
        )

        PrismProgressBar(progress = 0.6f)
    }
}
```

Every component reads its colors, type, spacing and shape from `PrismTheme`, so a single brand or scheme change re-skins the whole UI.

---

!!! note "Status"
    The Compose library compiles and is verified on **Desktop (JVM)** and **Android** targets; iOS is declared and builds from the same `commonMain` (links on a macOS/Xcode runner). Maven Central publishing and per-platform CI are tracked in the [Compose migration plan](COMPOSE-MIGRATION.md).
