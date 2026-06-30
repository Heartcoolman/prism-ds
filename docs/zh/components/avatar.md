# Avatar

圆形头像，在中性填充上居中显示首字母缩写，右下角可选带一个表示在线状态的 success 圆点。此处不进行网络图片加载——首字母缩写回退是唯一的渲染方式；如需真实照片，请在调用处使用 Coil/`AsyncImage`。使用 `PrismAvatarGroup` 可将多个头像堆叠，并带一个 "+N" 溢出 chip。


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

`PrismAvatarGroup` 将头像从左到右重叠排列；超过 `max` 的部分会折叠成尾部的 "+N" chip。

```kotlin
PrismAvatarGroup(names = listOf("Al", "Bo", "Cy", "Di"), max = 3)
```

## API

### PrismAvatar

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `name` | `String` | `""` | 显示名称；前 1-2 个字符会转为大写作为首字母缩写。 |
| `modifier` | `Modifier` | `Modifier` | 应用于头像框的 Modifier。 |
| `size` | `PrismAvatarSize` | `PrismAvatarSize.Medium` | 直径预设（small 28 / medium 40 / large 56）。 |
| `online` | `Boolean` | `false` | 在右下角显示一个表示在线状态的 success 圆点。 |

### PrismAvatarGroup

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `names` | `List<String>` | — | 要堆叠的名称，从左到右重叠排列。 |
| `modifier` | `Modifier` | `Modifier` | 应用于分组布局的 Modifier。 |
| `max` | `Int?` | `null` | 显示前 N 个头像，再加一个 "+N" 溢出 chip；为 null 时全部显示。 |
| `size` | `PrismAvatarSize` | `PrismAvatarSize.Medium` | 应用于每个头像的直径预设。 |

### PrismAvatarSize

| 值 | 直径 |
|---|---|
| `Small` | 28dp |
| `Medium` | 40dp |
| `Large` | 56dp |
