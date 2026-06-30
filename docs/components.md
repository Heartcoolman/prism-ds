# Components

All **46** components, faithful to the React originals and verified against them. Most live in `prism-ui`; charts in `prism-charts`, glass in `prism-glass`, icons in `prism-icons`. The desktop [`sample`](https://github.com/Heartcoolman/prism-ds/tree/main/prism-compose/sample) instantiates every one.

Components are built on a Material 3 base where it fits and styled entirely from `PrismTheme` tokens. Interactive and custom-drawn components carry `Modifier.semantics { }` for screen readers.

## Actions & feedback

| Component | API | Notes |
|---|---|---|
| Button | `PrismButton` | 4 variants × tone × 3 sizes, leading/trailing icon |
| Tag | `PrismTag` | tone pill; `selected` ring; working remove (×) |
| Badge | `PrismBadge` | count/dot, `max`, floats over `content` |
| Banner | `PrismBanner` | tinted, tone icon, action + close; danger announces assertively |
| Toast | `PrismToast` | neutral/success/error variants + auto icon; `open` |
| Spinner | `PrismSpinner` | `CircularProgressIndicator`; `label` / `showLabel` |
| ProgressBar | `PrismProgressBar` | `LinearProgressIndicator`; tone; determinate/indeterminate |
| Skeleton | `PrismSkeleton` | text / rect / circle variants, `lines` |
| PageControl | `PrismPageControl` | dot indicator; tappable when `onChange` set |
| StateView | `PrismStateView` | empty/error state: icon + title + description + action |

## Inputs & forms

| Component | API | Notes |
|---|---|---|
| TextField | `PrismTextField` | `OutlinedTextField` + label / help / error |
| Textarea | `PrismTextarea` | multi-line input |
| SearchField | `PrismSearchField` | search icon + conditional clear |
| Select | `PrismSelect` | `ExposedDropdownMenuBox` (generic `<T>`) |
| Switch | `PrismSwitch` | token-styled Material 3 `Switch` |
| Checkbox | `PrismCheckbox` | `TriStateCheckbox` (checked/indeterminate) |
| Radio | `PrismRadio` / `PrismRadioGroup` | `RadioButton` + `selectableGroup` |
| Slider | `PrismSlider` | optional label + value readout |
| Stepper | `PrismStepper` | −/＋ with min/max/step bounds |
| DatePicker | `PrismDatePicker` | 42-cell month grid, pure-Kotlin date math |
| WheelPicker | `PrismWheelPicker` | snap-fling drum; single- or multi-column |

## Navigation

| Component | API | Notes |
|---|---|---|
| Tabs | `PrismTabs` | 2px accent underline |
| SegmentedControl | `PrismSegmentedControl` | per-segment background toggle |
| TabBar | `PrismTabBar` | `NavigationBar` over a translucent material |
| NavBar | `PrismNavBar` | 3-slot top bar + large-title, back button |
| Breadcrumb | `PrismBreadcrumb` | clickable trail + chevron separators |

## Overlays & disclosure

| Component | API | Notes |
|---|---|---|
| Modal | `PrismModal` | centered `Dialog` + scrim |
| Alert | `PrismAlert` | `AlertDialog`; destructive / stacked |
| Sheet | `PrismSheet` | slide-in bottom sheet + scrim |
| Popover | `PrismPopover` | `Popup`, 4 placements, outside/Esc dismiss |
| Tooltip | `PrismTooltip` | hover/focus/press driven bubble |
| Menu | `PrismMenu` | `DropdownMenu`; items, danger, separators |
| Disclosure | `PrismDisclosure` | animated accordion + rotating chevron |

## Containers & content

| Component | API | Notes |
|---|---|---|
| Card | `PrismCard` | media slot + eyebrow/title/description/footer |
| List | `PrismList` / `PrismListRow` | leading/title/subtitle/trailing/chevron |
| Table | `PrismTable` | right-aligned numerics, hairline rows |
| Grid | `PrismGrid` | responsive columns (generic `<T>`) |
| Avatar | `PrismAvatar` / `PrismAvatarGroup` | initials + presence dot; overlap "+N" |
| Image | `PrismImage` | aspect-ratio box + gradient scrim + placeholder |

## Charts

| Component | API | Notes |
|---|---|---|
| BarChart | `PrismBarChart` | proportional bars, one accent |
| LineChart | `PrismLineChart` | `Canvas` polyline + area gradient |
| ProgressRing | `PrismProgressRing` | `drawArc` ring + center label |

## Glass

| Component | API | Notes |
|---|---|---|
| Material | `PrismMaterial` | frosted surface, 4 thicknesses, progressive |
| LiquidGlass | `PrismLiquidGlass` | floating translucent capsule |

!!! info "Glass fidelity"
    `prism-glass` ships a dependency-free translucent approximation that compiles on every target. Live backdrop blur (Haze / `RenderEffect` on Android 12+, Skia shader elsewhere) plugs in behind the same API. Pixel-faithful Apple-native glass is web-only by design.

## Foundation

| Component | API | Notes |
|---|---|---|
| Icon | `PrismIcon` / `PrismIcons` | 46-icon set, runtime `strokeWidth` |
| ThemeProvider | `PrismTheme` | see [Theming](styling.md) |
