# Disclosure

An accordion whose summary row toggles a content region below it. The trailing chevron rotates 90deg and the region animates its height. Works uncontrolled (`defaultOpen`) or controlled (`open` + `onToggle`). Use it to progressively reveal secondary detail.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=disclosure" loading="lazy" title="disclosure demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismDisclosure
```

## Basic usage

Uncontrolled — the component tracks its own open state.

```kotlin
PrismDisclosure(title = "Details") {
    Text("Collapsible content.")
}
```

## Default open

Start expanded with `defaultOpen` while remaining uncontrolled.

```kotlin
PrismDisclosure(title = "Details", defaultOpen = true) {
    Text("Visible on first render.")
}
```

## Controlled

Drive the open state yourself with `open` + `onToggle`.

```kotlin
var open by remember { mutableStateOf(false) }

PrismDisclosure(
    title = "Details",
    open = open,
    onToggle = { open = it },
) {
    Text("State owned by the caller.")
}
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `title` | `String` | — | Summary row label shown beside the chevron. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the root column. |
| `defaultOpen` | `Boolean` | `false` | Initial open state for uncontrolled usage. |
| `open` | `Boolean?` | `null` | Controlled open state; pair with `onToggle`. |
| `onToggle` | `((Boolean) -> Unit)?` | `null` | Called with the next open state when the summary is activated. |
| `content` | `@Composable ColumnScope.() -> Unit` | — | Revealed content rendered below the summary when open. |
