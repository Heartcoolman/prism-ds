# SearchField

A filled search input with a leading magnifier and a trailing clear button that appears only when a value is present. The input is borderless and transparent over a tertiary fill. Use it to filter or query a list.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismSearchField
```

## Basic usage

```kotlin
var query by remember { mutableStateOf("") }
PrismSearchField(
    value = query,
    onValueChange = { query = it },
    onClear = { query = "" },
)
```

## Placeholder and full width

The `placeholder` defaults to `"搜索"`. The clear button is shown automatically whenever `value` is non-empty and invokes `onClear` when pressed.

```kotlin
PrismSearchField(
    value = query,
    onValueChange = { query = it },
    placeholder = "Search library",
    onClear = { query = "" },
    fullWidth = true,
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `value` | `String` | — | Current query text. |
| `onValueChange` | `(String) -> Unit` | — | Called with the new value on each edit. |
| `modifier` | `Modifier` | `Modifier` | Layout modifier applied to the field row. |
| `placeholder` | `String` | `"搜索"` | Placeholder shown when the value is empty. |
| `onClear` | `(() -> Unit)?` | `null` | Invoked when the trailing clear button is pressed. |
| `enabled` | `Boolean` | `true` | Whether the field accepts input and the clear button is active. |
| `fullWidth` | `Boolean` | `false` | Stretch the field to fill the container width. |
