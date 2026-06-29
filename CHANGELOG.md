# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-06-29

Initial public release as **Prism** (`@prism-ds/react`) — a themeable React +
TypeScript design system generalized from an internal Apple-style component set.

### Added
- **Theme layer** (`src/theme`): a `Theme` type, `themeToVars()` helper, and two
  presets — `apple` (the Apple-inspired default) and `neutral` (brand-agnostic).
- `ThemeProvider` now accepts a `theme` prop to inject brand overrides as inline
  CSS variables, in addition to `colorScheme`.
- `docs/THEMING.md` theming guide; `LICENSE` (MIT).

### Changed
- **Renamed** the package `apple-style-ds` → `@prism-ds/react`.
- **Renamed** `AppleProvider` → `ThemeProvider`; its color-scheme prop `theme`
  → `colorScheme` (the `theme` prop is now the brand-override object).
- **Renamed** the CSS class prefix `ads-*` → `prism-*` (root: `.prism-root` /
  `[data-prism-root]`); UMD global `AppleDS` → `PrismDS`.
- Rebranded README, conventions, and guide titles; genericized demo content.
- Removed `private: true`; added open-source publish metadata (license,
  repository, keywords, `publishConfig.access: public`).

### Notes
- The default theme intentionally keeps the Apple-inspired values (SF Pro stack,
  blue accent, concentric radii); the design guides describe this default preset.
