# List

A grouped list container: a clipped, card-radius column of `PrismListRow`s. Rows draw their own hairline separators and carry a leading slot, title (+ optional subtitle), trailing slot, and an optional disclosure chevron. Use it for settings, detail rows, and navigable items.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=list" loading="lazy" title="list demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismList
import io.github.heartcoolman.prism.ui.PrismListRow
```

## Basic usage

Drop `PrismListRow` children into a `PrismList`. Set `showDivider = false` on the last row to drop its hairline.

```kotlin
PrismList {
    PrismListRow(
        title = "Row one",
        subtitle = "Subtitle",
        leading = { PrismIcon(PrismIcons.Star, contentDescription = null, size = 20.dp) },
        chevron = true,
        onClick = {},
    )
    PrismListRow(title = "Row two", trailing = { Text("Detail") }, showDivider = false)
}
```

## Inset

Set `inset = true` to add horizontal margin around the grouped container.

```kotlin
PrismList(inset = true) {
    PrismListRow(title = "Wi-Fi", trailing = { Text("On") }, showDivider = false)
}
```

## API

### PrismList

| Parameter | Type | Default | Description |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the container column. |
| `inset` | `Boolean` | `false` | Add horizontal margin around the group. |
| `content` | `@Composable ColumnScope.() -> Unit` | — | The `PrismListRow`s to lay out. |

### PrismListRow

| Parameter | Type | Default | Description |
|---|---|---|---|
| `title` | `String` | — | Primary text. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the row column. |
| `subtitle` | `String?` | `null` | Secondary text below the title. |
| `leading` | `(@Composable () -> Unit)?` | `null` | Leading slot — icon or avatar. |
| `trailing` | `(@Composable () -> Unit)?` | `null` | Trailing slot — value text or control. |
| `chevron` | `Boolean` | `false` | Show a trailing disclosure chevron. |
| `onClick` | `(() -> Unit)?` | `null` | Makes the row interactive (`role = Button`) when set. |
| `showDivider` | `Boolean` | `true` | Draw a bottom hairline; set `false` on the last row. |
