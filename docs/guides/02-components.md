# Components

Each entry maps to a real component in the library. Compose these; don't reinvent.

## Buttons & controls — `Button`

Pill-shaped; hierarchy is expressed by fill strength. One filled (primary) button per area. Minimum hit area 44×44.

- **Anatomy** — container radius 980 (pill), icon 18, label 15/500; height 44, padding-x 22, gap 8.
- **Variants** — `filled` (primary) · `tinted` · `gray` (secondary) · `bordered` · `plain` (text).
- **Sizes** — small 28 · medium 44 · large 50.
- **States** — default · hover (−8% lightness) · pressed (scale .97) · disabled (opacity .35).
- **When** — the primary button is the page's single most important action; secondary actions use gray or plain.

## Forms & inputs — `TextField`, `Textarea`, `SearchField`, `Checkbox`, `Radio`, `Switch`, `Select`, `Slider`, `Stepper`, `SegmentedControl`

Field height 44, radius 10, blue focus ring on focus. Label above, help text below; errors use a red border **plus** a message — never color alone.

- **Focus** — focus ring contrast ≥ 3:1.
- **Error** — red border + explanatory text (e.g. "请输入有效的邮箱地址。").
- **Search** — borderless, filled style with a leading magnifier.
- **Checkbox / Radio / Switch** — 20px custom controls; switch track on = accent.
- **Stepper / Select / Slider** — touch targets ≥ 44; slider thumb 28 with shadow.

## Navigation — `NavBar`, `TabBar`, `Breadcrumb`, `Tabs`, `Menu`, `PageControl`

The nav bar carries title and primary action; the tab bar carries top-level switching. Current location must be clearly visible; a back path is always reachable.

- **NavBar** — sticky, translucent material, hairline separator; centered title, leading back, trailing action; large-title variant.
- **TabBar** — bottom tabs, icon + footnote label, selected = accent; mark the current tab with `aria-selected`.
- **Breadcrumb** — path with chevron separators; last item is current.
- **Menu** — context menu; destructive items in red; separators between groups.

## Cards & lists — `Card`, `List` / `ListRow`, `Disclosure`

Cards layer above the background with rounded corners (18) and a very light shadow. List rows share a height, align consistently, and use a trailing chevron to signal entry.

- **Card** — radius 18, shadow `0 1px 3px / 0 8px 24px` at very low opacity; optional 16:9 media, eyebrow, title, description, footer.
- **List row** — min-height 44, padding 14 18; leading slot, title + subtitle, trailing value/chevron.
- **Disclosure** — summary row + expandable region; chevron rotates on open.

## Modals & sheets — `Modal`, `Sheet`

Use a modal when the user must focus on a decision; use a bottom sheet for transient actions. A translucent scrim sits behind; the sheet has a grab handle hinting pull-to-dismiss.

- ✓ **DO** — Provide a clear way to close (button, scrim tap, pull-down); keep a modal focused on a single task.
- ✕ **DON'T** — No modal-on-modal; no complex multi-step flows inside a modal; never trap the user with no way out.

## Overlays — `Popover`, `Tooltip`

Popovers carry lightweight content related to an element; tooltips give a brief text-only hint. Both point an arrow at the trigger and dismiss on outside tap. Popovers flip direction to fit the screen; tooltips are non-interactive, shown on hover or long-press.

## Tabs & disclosure — `Tabs`, `Disclosure`

Underline tabs switch same-level content; disclosure panels expand secondary information on demand. The current tab is clearly highlighted; the disclosure chevron rotates with state. Tabs support `role=tab` + arrow-key navigation.

## Pickers — `DatePicker`

Calendars use a month grid; time and limited options use a wheel. The selected value is an accent-filled dot; today is marked with an outline.

## Feedback — `Toast`, `Banner`, `Alert`, `Badge`, `ProgressBar`, `Spinner`, `Skeleton`

Choose by level of interruption: banner is lightest, toast is brief, dialog requires a decision. Destructive actions use red and a second confirmation.

- **Toast** — appears briefly and auto-dismisses; doesn't interrupt.
- **Banner** — inline status (info / success / warning / danger), tinted background.
- **Alert** — confirm dialog; destructive confirm in red.
- **Badge** — count or dot; **Progress / Spinner / Skeleton** for loading.

## Data display — `Table`, `Tag`, `Avatar`

Tables right-align numbers and left-align text with a consistent row height; tags filter and categorize; avatars fall back to initials when an image is missing.

- **Table** — header in footnote/secondary; numeric cells right-aligned with `font-variant-numeric: tabular-nums`.
- **Tag** — pill, selectable, removable.
- **Avatar** — image with initials fallback; `AvatarGroup` overlaps with a `+N` overflow.

## Data visualization — `ProgressRing`

Charts serve data, not decoration. Axes are restrained, gridlines faint, the accent lights only the key datum, numbers align with tabular figures. The ring uses `conic-gradient`, no SVG required.

## Page templates

Common pages have proven skeletons — reuse them so products stay predictable: **List** (title + scrollable rows), **Detail** (hero + actions), **Dashboard** (metric cards + charts), **Onboarding / Sign-in** (centered, single focus).
