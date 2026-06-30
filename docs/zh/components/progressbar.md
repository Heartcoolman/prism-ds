# ProgressBar

线性进度指示器。传入 `0..1` 范围的 `progress` 值表示确定进度填充，或保持 `null` 表示不确定的滑动段。`tone` 设置填充颜色，可被显式的 `color` 覆盖。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=progressbar" loading="lazy" title="progressbar demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.ui.PrismProgressBar
```

## 基本用法

```kotlin
PrismProgressBar(progress = 0.6f)
```

## 不确定进度

省略 `progress`（或传入 `null`）以获得不确定进度条。

```kotlin
PrismProgressBar()
```

## Tone

```kotlin
PrismProgressBar(progress = 0.4f, tone = PrismTone.Accent)
PrismProgressBar(progress = 0.8f, tone = PrismTone.Success)
PrismProgressBar(progress = 0.3f, tone = PrismTone.Danger)
```

## API

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | 布局/视觉 modifier（进度条会填满最大宽度）。 |
| `progress` | `Float?` | `null` | `null` → 不确定进度；否则为 `0..1` 的值（会被强制限定在该范围内）。 |
| `tone` | `PrismTone` | `PrismTone.Accent` | 语义填充颜色：`Accent`、`Success`、`Warning`、`Danger`、`Neutral`。 |
| `color` | `Color` | `tone.color()` | 填充颜色；覆盖从 `tone` 推导出的颜色。 |

### 枚举

```kotlin
enum class PrismTone { Accent, Success, Warning, Danger, Neutral }
```

所有组件都假定外层包裹着 `PrismTheme { }`。主题相关细节参见 [Styling](/zh/styling)。
