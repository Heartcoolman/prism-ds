# Breadcrumb

Breadcrumb trail showing the path to the current page — a row of crumbs separated by chevrons. Non-last crumbs are accent-colored and clickable when `onNavigate` is set; the last crumb is the current page.

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismBreadcrumb
import io.github.heartcoolman.prism.ui.PrismBreadcrumbItem
```

## Basic usage

```kotlin
PrismBreadcrumb(
    items = listOf(
        PrismBreadcrumbItem("Home"),
        PrismBreadcrumbItem("Library"),
        PrismBreadcrumbItem("Item"),
    ),
    onNavigate = { index -> /* navigate to items[index] */ },
)
```

## Static trail

Omit `onNavigate` to render the crumbs as plain text (non-clickable).

```kotlin
PrismBreadcrumb(
    items = listOf(
        PrismBreadcrumbItem("Home"),
        PrismBreadcrumbItem("Settings"),
    ),
)
```

## API

| Parameter | Type | Default | Description |
|---|---|---|---|
| `items` | `List<PrismBreadcrumbItem>` | — | Ordered trail from root to current page; the last item is the current page. |
| `modifier` | `Modifier` | `Modifier` | Layout modifier for the row. |
| `onNavigate` | `((Int) -> Unit)?` | `null` | When set, non-last crumbs become clickable and report the tapped index. |

### PrismBreadcrumbItem

| Field | Type | Description |
|---|---|---|
| `label` | `String` | Visible label for the crumb. |
