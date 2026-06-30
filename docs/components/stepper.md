# Stepper

A segmented [−] value [+] control for adjusting an integer by a fixed step within optional bounds. Each button disables at its bound. Use it for small, precise quantities (counts, copies) where a slider would be imprecise.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=stepper" loading="lazy" title="stepper demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismStepper
```

## Basic usage

```kotlin
var value by remember { mutableStateOf(0) }

PrismStepper(
    value = value,
    onValueChange = { value = it },
)
```

## Bounds and step

`min`/`max` clamp the value; the decrement button disables at `min` and the increment button at `max`. `step` sets the amount per press.

```kotlin
var value by remember { mutableStateOf(2) }

PrismStepper(
    value = value,
    onValueChange = { value = it },
    min = 0,
    max = 10,
    step = 2,
)
```

## Disabled

```kotlin
PrismStepper(
    value = 3,
    onValueChange = {},
    enabled = false,
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `value` | `Int` | — | Current value (controlled). |
| `onValueChange` | `(Int) -> Unit` | — | Fired with the next value, already clamped to `min`/`max`. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the surface. |
| `min` | `Int` | `Int.MIN_VALUE` | Lower bound; decrement disables here. |
| `max` | `Int` | `Int.MAX_VALUE` | Upper bound; increment disables here. |
| `step` | `Int` | `1` | Amount added/removed per press. |
| `enabled` | `Boolean` | `true` | Disables both controls and dims the surface. |

> Assumes an enclosing `PrismTheme { }`. The surface uses `PrismTheme.colors.fillTertiary`; active icons use `PrismTheme.colors.accent`.
