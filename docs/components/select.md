# Select

A labeled dropdown over a list of options. The label sits above; help or error text sits below. The read-only anchor shows the selected option and a rotating chevron. Use it to pick one value from a small, known set.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=select" loading="lazy" title="select demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismSelect
```

## Basic usage

```kotlin
var fruit by remember { mutableStateOf("Apple") }
PrismSelect(
    value = fruit,
    onValueChange = { fruit = it },
    options = listOf("Apple", "Banana", "Cherry"),
    label = "Fruit",
)
```

## Typed options

`PrismSelect` is generic over `T`. Provide `optionLabel` to map each option to its display string; it defaults to `toString()`.

```kotlin
data class Country(val code: String, val name: String)

var country by remember { mutableStateOf(Country("US", "United States")) }
PrismSelect(
    value = country,
    onValueChange = { country = it },
    options = listOf(
        Country("US", "United States"),
        Country("JP", "Japan"),
    ),
    label = "Country",
    optionLabel = { it.name },
)
```

## Error state

A non-empty `error` switches the border and message to danger and replaces `helpText`.

```kotlin
PrismSelect(
    value = fruit,
    onValueChange = { fruit = it },
    options = listOf("Apple", "Banana"),
    label = "Fruit",
    error = "Please choose a fruit.",
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `value` | `T` | — | Currently selected option. |
| `onValueChange` | `(T) -> Unit` | — | Called with the chosen option. |
| `options` | `List<T>` | — | Options shown in the dropdown menu. |
| `modifier` | `Modifier` | `Modifier` | Layout modifier applied to the column. |
| `label` | `String?` | `null` | Label rendered above the control. |
| `placeholder` | `String?` | `null` | Placeholder shown in the anchor when applicable. |
| `helpText` | `String?` | `null` | Supporting text shown below when not in error. |
| `error` | `String?` | `null` | Error message; non-empty switches the field to its error state and replaces `helpText`. |
| `enabled` | `Boolean` | `true` | Whether the dropdown can be opened. |
| `fullWidth` | `Boolean` | `false` | Stretch the control to fill the container width. |
| `optionLabel` | `(T) -> String` | `{ it.toString() }` | Maps an option to its display string. |
