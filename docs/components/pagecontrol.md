# PageControl

A row of page dots where the active page is highlighted as a wider accent pill. Use it to indicate position within a paged carousel or onboarding flow. Supply `onChange` to make the dots tappable.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismPageControl
```

## Basic usage

```kotlin
PrismPageControl(count = 4, activeIndex = 1)
```

## Interactive

When `onChange` is provided each dot becomes a tappable tab that reports the chosen index; otherwise the row is purely decorative.

```kotlin
var page by remember { mutableStateOf(0) }
PrismPageControl(
    count = 5,
    activeIndex = page,
    onChange = { page = it },
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `count` | `Int` | — | Total number of pages (dots). |
| `activeIndex` | `Int` | — | Zero-based index of the current page. |
| `modifier` | `Modifier` | `Modifier` | Layout modifier applied to the dot row. |
| `onChange` | `((Int) -> Unit)?` | `null` | When supplied, dots become tappable and report the chosen index. |
