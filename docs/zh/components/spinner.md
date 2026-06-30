# Spinner

活动指示器——一个持续旋转的 accent 色圆环，表示不确定进度，提供三种尺寸。`label` 是无障碍状态文本；设置 `showLabel` 可将其渲染在圆环旁边（否则它只存在于语义信息中）。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=spinner" loading="lazy" title="spinner demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismSpinner
```

## 基本用法

```kotlin
PrismSpinner()
```

## 尺寸

```kotlin
PrismSpinner(size = PrismSpinnerSize.Sm)
PrismSpinner(size = PrismSpinnerSize.Md)
PrismSpinner(size = PrismSpinnerSize.Lg)
```

## 可见标签与自定义颜色

```kotlin
PrismSpinner(
    label = "Loading projects",
    showLabel = true,
    color = PrismTheme.colors.accent,
)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | 布局/视觉 modifier。 |
| `size` | `PrismSpinnerSize` | `PrismSpinnerSize.Md` | 圆环直径：`Sm`（16dp）、`Md`（24dp）、`Lg`（36dp）。 |
| `color` | `Color` | `PrismTheme.colors.accent` | 圆环颜色。 |
| `label` | `String` | `"加载中"` | 无障碍状态文本；当 `showLabel` 为 `true` 时也作为可见说明文字。 |
| `showLabel` | `Boolean` | `false` | 将标签渲染在圆环旁边，而非仅存于语义信息中。 |

### 枚举

```kotlin
enum class PrismSpinnerSize { Sm, Md, Lg }
```

所有组件都假定外层包裹着 `PrismTheme { }`。主题相关细节参见 [Styling](/zh/styling)。
