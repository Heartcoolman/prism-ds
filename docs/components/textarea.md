# Textarea

A labeled multiline text input. It shares the label / help / error chrome of [TextField](/components/textfield); the control is sized by `minLines`. Use it for longer free-form text such as comments or bios.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismTextarea
```

## Basic usage

```kotlin
var bio by remember { mutableStateOf("") }
PrismTextarea(
    value = bio,
    onValueChange = { bio = it },
    label = "Bio",
    placeholder = "Tell us about yourself…",
    minLines = 3,
)
```

## States

A non-empty `error` styles the border and message in danger and replaces `helpText`. `enabled = false` renders the disabled style. `fullWidth` stretches the control to the container width.

```kotlin
// Error
PrismTextarea(
    value = bio,
    onValueChange = { bio = it },
    label = "Notes",
    error = "This field is required.",
)

// Disabled, full width
PrismTextarea(
    value = bio,
    onValueChange = { bio = it },
    label = "Locked",
    enabled = false,
    fullWidth = true,
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `value` | `String` | — | Current text value. |
| `onValueChange` | `(String) -> Unit` | — | Called with the new value on each edit. |
| `modifier` | `Modifier` | `Modifier` | Layout modifier applied to the column. |
| `label` | `String?` | `null` | Label rendered above the field. |
| `placeholder` | `String?` | `null` | Placeholder shown when the value is empty. |
| `helpText` | `String?` | `null` | Supporting text shown below when not in error. |
| `error` | `String?` | `null` | Error message; non-empty switches the field to its error state and replaces `helpText`. |
| `enabled` | `Boolean` | `true` | Whether the field accepts input. |
| `minLines` | `Int` | `4` | Minimum number of visible text lines. |
| `maxLines` | `Int` | `Int.MAX_VALUE` | Maximum number of visible text lines. |
| `fullWidth` | `Boolean` | `false` | Stretch the field to fill the container width. |
