---
layout: home

hero:
  name: Prism
  text: A design system for Compose Multiplatform & React
  tagline: 46 token-driven components — Apple-inspired by default, themeable to your brand, from one source of truth.
  image:
    src: /logo.svg
    alt: Prism
  actions:
    - theme: brand
      text: Get Started
      link: /install
    - theme: alt
      text: Components
      link: /components/
    - theme: alt
      text: GitHub
      link: https://github.com/Heartcoolman/prism-ds

features:
  - icon: 🎨
    title: Token-driven
    details: One source of truth generates both CSS variables and Kotlin token classes. Color, type, spacing and motion never drift between web and app.
  - icon: 🧩
    title: Material 3 base
    details: PrismTheme maps Prism tokens onto a Material 3 ColorScheme, then layers Prism-only tokens via CompositionLocal.
  - icon: 📦
    title: 46 components
    details: Actions, inputs, navigation, overlays, lists, charts and glass — the full set, verified faithful to the React originals.
  - icon: 🌐
    title: Multiplatform
    details: Android (minSdk 31), iOS and Desktop from one commonMain; the web stays on React for pixel-perfect CSS.
  - icon: 🌗
    title: Themeable
    details: Ship the Apple-inspired default, switch to the neutral preset, or inject your own brand — light and dark.
  - icon: ♿
    title: Accessible
    details: Material 3 semantics plus hand-written Modifier.semantics on every custom-drawn component.
---
