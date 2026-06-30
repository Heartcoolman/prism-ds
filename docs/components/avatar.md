# Avatar

Circular avatar showing centered initials on a neutral fill, with an optional success presence dot bottom-right. There is no network image loading here — the initials fallback is the only rendering; use Coil/`AsyncImage` at the call site for real photos. Use `PrismAvatarGroup` to stack several avatars with a "+N" overflow chip.


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=avatar" loading="lazy" title="avatar demo"></iframe>
</div>

## Import

```kotlin
import io.github.heartcoolman.prism.ui.PrismAvatar
import io.github.heartcoolman.prism.ui.PrismAvatarGroup
```

## Basic usage

```kotlin
PrismAvatar(name = "Jane Doe", online = true)
```

## Sizes

```kotlin
PrismAvatar(name = "Al", size = PrismAvatarSize.Small)
PrismAvatar(name = "Bo", size = PrismAvatarSize.Medium)
PrismAvatar(name = "Cy", size = PrismAvatarSize.Large)
```

## Group

`PrismAvatarGroup` overlaps avatars left-to-right; beyond `max`, the remainder collapses into a trailing "+N" chip.

```kotlin
PrismAvatarGroup(names = listOf("Al", "Bo", "Cy", "Di"), max = 3)
```

## API

### PrismAvatar

| Parameter | Type | Default | Description |
|---|---|---|---|
| `name` | `String` | `""` | Display name; first 1-2 characters become the uppercased initials. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the avatar box. |
| `size` | `PrismAvatarSize` | `PrismAvatarSize.Medium` | Diameter preset (small 28 / medium 40 / large 56). |
| `online` | `Boolean` | `false` | Shows a success presence dot bottom-right. |

### PrismAvatarGroup

| Parameter | Type | Default | Description |
|---|---|---|---|
| `names` | `List<String>` | — | Names to stack, overlapping left-to-right. |
| `modifier` | `Modifier` | `Modifier` | Modifier applied to the group layout. |
| `max` | `Int?` | `null` | Show the first N avatars, then a "+N" overflow chip; null shows all. |
| `size` | `PrismAvatarSize` | `PrismAvatarSize.Medium` | Diameter preset applied to every avatar. |

### PrismAvatarSize

| Value | Diameter |
|---|---|
| `Small` | 28dp |
| `Medium` | 40dp |
| `Large` | 56dp |
