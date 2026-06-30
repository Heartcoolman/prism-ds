# TextField

A labeled single-line text input. The label sits above the control; help or error text sits below. Use it for short, free-form values such as names, emails, or passwords.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismTextField
```

## Basic usage

```kotlin
var text by remember { mutableStateOf("") }
PrismTextField(
    value = text,
    onValueChange = { text = it },
    label = "Email",
    placeholder = "you@example.com",
)
```

## States

A non-empty `error` switches the border and message to danger and replaces `helpText`. `enabled = false` renders the disabled style.

```kotlin
// Help text below the field
PrismTextField(
    value = text,
    onValueChange = { text = it },
    label = "Username",
    helpText = "Pick a unique handle.",
)

// Error state
PrismTextField(
    value = text,
    onValueChange = { text = it },
    label = "Email",
    error = "Invalid email address.",
)

// Disabled
PrismTextField(
    value = text,
    onValueChange = { text = it },
    label = "Locked",
    enabled = false,
)
```

## Leading icon and password

```kotlin
PrismTextField(
    value = text,
    onValueChange = { text = it },
    label = "Password",
    leadingIcon = { PrismIcon(PrismIcons.Lock, contentDescription = null, size = 18.dp) },
    visualTransformation = PasswordVisualTransformation(),
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `value` | `String` | — | Current text value. |
| `onValueChange` | `(String) -> Unit` | — | Called with the new value on each edit. |
| `modifier` | `Modifier` | `Modifier` | Layout modifier applied to the column. |
| `label` | `String?` | `null` | Label rendered above the input. |
| `placeholder` | `String?` | `null` | Placeholder shown when the value is empty. |
| `helpText` | `String?` | `null` | Supporting text shown below when not in error. |
| `error` | `String?` | `null` | Error message; non-empty switches the field to its error state and replaces `helpText`. |
| `leadingIcon` | `(@Composable () -> Unit)?` | `null` | Glyph rendered inside the input, left-aligned. |
| `enabled` | `Boolean` | `true` | Whether the field accepts input. |
| `singleLine` | `Boolean` | `true` | Constrain the input to a single line. |
| `fullWidth` | `Boolean` | `false` | Stretch the field to fill the container width. |
| `keyboardOptions` | `KeyboardOptions` | `KeyboardOptions.Default` | Software keyboard configuration (type, IME action). |
| `visualTransformation` | `VisualTransformation` | `VisualTransformation.None` | Visual transform applied to the text, e.g. password masking. |
