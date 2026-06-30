# Components

All **46** components, faithful to the React originals and verified against them. Most live in `prism-ui`; charts in `prism-charts`, glass in `prism-glass`, icons in `prism-icons`. The desktop [`sample`](https://github.com/Heartcoolman/prism-ds/tree/main/prism-compose/sample) instantiates every one.

Components build on a Material 3 base where it fits and are styled entirely from [`PrismTheme`](/styling) tokens. Interactive and custom-drawn components carry `Modifier.semantics { }` for screen readers.

## Actions & feedback

| Component | API | Notes |
|---|---|---|
| [Button](./button) | `PrismButton` | 4 variants × tone × 3 sizes, leading/trailing icon |
| [Tag](./tag) | `PrismTag` | tone pill; `selected` ring; working remove (×) |
| [Badge](./badge) | `PrismBadge` | count/dot, `max`, floats over `content` |
| [Banner](./banner) | `PrismBanner` | tinted, tone icon, action + close |
| [Toast](./toast) | `PrismToast` | neutral/success/error variants + auto icon |
| [Spinner](./spinner) | `PrismSpinner` | `CircularProgressIndicator`; `label` / `showLabel` |
| [ProgressBar](./progressbar) | `PrismProgressBar` | `LinearProgressIndicator`; tone; determinate/indeterminate |
| [Skeleton](./skeleton) | `PrismSkeleton` | text / rect / circle variants, `lines` |
| [PageControl](./pagecontrol) | `PrismPageControl` | dot indicator; tappable when `onChange` set |
| [StateView](./stateview) | `PrismStateView` | empty/error: icon + title + description + action |

## Inputs & forms

| Component | API | Notes |
|---|---|---|
| [TextField](./textfield) | `PrismTextField` | `OutlinedTextField` + label / help / error |
| [Textarea](./textarea) | `PrismTextarea` | multi-line input |
| [SearchField](./searchfield) | `PrismSearchField` | search icon + conditional clear |
| [Select](./select) | `PrismSelect` | `ExposedDropdownMenuBox` (generic `<T>`) |
| [Switch](./switch) | `PrismSwitch` | token-styled Material 3 `Switch` |
| [Checkbox](./checkbox) | `PrismCheckbox` | `TriStateCheckbox` |
| [Radio](./radio) | `PrismRadio` / `PrismRadioGroup` | `RadioButton` + `selectableGroup` |
| [Slider](./slider) | `PrismSlider` | optional label + value readout |
| [Stepper](./stepper) | `PrismStepper` | −/＋ with min/max/step bounds |
| [DatePicker](./datepicker) | `PrismDatePicker` | 42-cell month grid, pure-Kotlin date math |
| [WheelPicker](./wheelpicker) | `PrismWheelPicker` | snap-fling drum; single- or multi-column |

## Navigation

| Component | API | Notes |
|---|---|---|
| [Tabs](./tabs) | `PrismTabs` | 2px accent underline |
| [SegmentedControl](./segmentedcontrol) | `PrismSegmentedControl` | per-segment background toggle |
| [TabBar](./tabbar) | `PrismTabBar` | `NavigationBar` over a translucent material |
| [NavBar](./navbar) | `PrismNavBar` | 3-slot top bar + large-title, back button |
| [Breadcrumb](./breadcrumb) | `PrismBreadcrumb` | clickable trail + chevron separators |

## Overlays & disclosure

| Component | API | Notes |
|---|---|---|
| [Modal](./modal) | `PrismModal` | centered `Dialog` + scrim |
| [Alert](./alert) | `PrismAlert` | `AlertDialog`; destructive / stacked |
| [Sheet](./sheet) | `PrismSheet` | slide-in bottom sheet + scrim |
| [Popover](./popover) | `PrismPopover` | `Popup`, 4 placements, outside/Esc dismiss |
| [Tooltip](./tooltip) | `PrismTooltip` | hover/focus/press driven bubble |
| [Menu](./menu) | `PrismMenu` | `DropdownMenu`; items, danger, separators |
| [Disclosure](./disclosure) | `PrismDisclosure` | animated accordion + rotating chevron |

## Containers & content

| Component | API | Notes |
|---|---|---|
| [Card](./card) | `PrismCard` | media slot + eyebrow/title/description/footer |
| [List](./list) | `PrismList` / `PrismListRow` | leading/title/subtitle/trailing/chevron |
| [Table](./table) | `PrismTable` | right-aligned numerics, hairline rows |
| [Grid](./grid) | `PrismGrid` | responsive columns (generic `<T>`) |
| [Avatar](./avatar) | `PrismAvatar` / `PrismAvatarGroup` | initials + presence dot; overlap "+N" |
| [Image](./image) | `PrismImage` | aspect-ratio box + gradient scrim + placeholder |

## Charts

| Component | API | Notes |
|---|---|---|
| [BarChart](./barchart) | `PrismBarChart` | proportional bars, one accent |
| [LineChart](./linechart) | `PrismLineChart` | `Canvas` polyline + area gradient |
| [ProgressRing](./progressring) | `PrismProgressRing` | `drawArc` ring + center label |

## Glass

| Component | API | Notes |
|---|---|---|
| [Material](./material) | `PrismMaterial` | frosted surface, 4 thicknesses, progressive |
| [LiquidGlass](./liquidglass) | `PrismLiquidGlass` | floating translucent capsule |

::: info Glass fidelity
`prism-glass` ships a dependency-free translucent approximation that compiles on every target. Live backdrop blur (Haze / `RenderEffect` on Android 12+, Skia shader elsewhere) plugs in behind the same API. Pixel-faithful Apple-native glass is web-only by design.
:::

## Foundation

| Component | API | Notes |
|---|---|---|
| [Icon](./icon) | `PrismIcon` / `PrismIcons` | 46-icon set, runtime `strokeWidth` |
| [ThemeProvider](./themeprovider) | `PrismTheme` | see [Theming](/styling) |
