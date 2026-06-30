# Image

固定宽高比的媒体框，带圆角、可选的底部渐变遮罩（用于叠加文字）以及左下角的内容插槽。此处不涉及网络加载——用一个柔和的占位图标代替照片；真实图片请在调用处使用 Coil/`AsyncImage`。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=image" loading="lazy" title="image demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismImage
```

## 基本用法

```kotlin
PrismImage(ratio = PrismImageRatio.R16x9)
```

## 叠加标题

设置 `overlay = true` 以添加底部渐变遮罩；`content` 插槽固定在左下角，并在遮罩开启时切换为白色文字。

```kotlin
PrismImage(overlay = true) {
    Text("Caption")
}
```

## 宽高比

```kotlin
PrismImage(ratio = PrismImageRatio.R1x1)
PrismImage(ratio = PrismImageRatio.R4x3)
PrismImage(ratio = PrismImageRatio.R3x4)
```

## API

### PrismImage

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | 应用于媒体框的 Modifier。 |
| `ratio` | `PrismImageRatio` | `PrismImageRatio.R16x9` | 框的固定宽高比。 |
| `radius` | `Dp` | `PrismTheme.radius.image` | 圆角半径。 |
| `overlay` | `Boolean` | `false` | 底部渐变遮罩，用于保持叠加文字的可读性。 |
| `content` | `(@Composable () -> Unit)?` | `null` | 叠加内容（例如标题），固定在左下角。 |

### PrismImageRatio

| 取值 | 比例 |
|---|---|
| `R16x9` | 16:9 |
| `R4x3` | 4:3 |
| `R1x1` | 1:1 |
| `R3x4` | 3:4 |
