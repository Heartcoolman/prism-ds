# Material

一种半透明的磨砂玻璃表面，浮于内容之上并让其透出——分层呈现，绝不完全不透明。用于浮动的界面外框（chrome），例如导航栏、弹出框和底部抽屉。


<div class="prism-demo">
  <iframe class="prism-demo-frame" src="/prism-ds/embed/?id=material" loading="lazy" title="material demo"></iframe>
</div>

## 导入

```kotlin
import io.github.heartcoolman.prism.glass.PrismMaterial
import io.github.heartcoolman.prism.glass.MaterialThickness
```

## 基本用法

```kotlin
PrismMaterial(thickness = MaterialThickness.Regular) {
    Text("Material", modifier = Modifier.padding(PrismTheme.spacing.s4))
}
```

## 厚度

材质的半透明度随高度（elevation）增加而加厚（导航栏 < 弹出框 < 抽屉）。

```kotlin
PrismMaterial(thickness = MaterialThickness.UltraThin) {
    Text("Nav bar", modifier = Modifier.padding(PrismTheme.spacing.s4))
}

PrismMaterial(thickness = MaterialThickness.Thick) {
    Text("Bottom sheet", modifier = Modifier.padding(PrismTheme.spacing.s4))
}
```

## 形状与渐进边缘

传入 `shape` 以裁剪表面，并设置 `progressive = true` 让材质沿底部边缘渐变为透明（适用于让内容溶解消失、而非以硬边线收尾的栏）。

```kotlin
PrismMaterial(
    shape = RoundedCornerShape(PrismTheme.radius.card),
    progressive = true,
) {
    Text("Dissolving bar", modifier = Modifier.padding(PrismTheme.spacing.s4))
}
```

## Modifier 形式

当你不需要一个包裹用的 `Box` 时，同样的表面也可以通过 `Modifier` 扩展使用：

```kotlin
Box(Modifier.prismMaterial(thickness = MaterialThickness.Thin)) {
    Text("Chrome")
}
```

## API

### `PrismMaterial`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `modifier` | `Modifier` | `Modifier` | 应用于表面 `Box` 的 Modifier。 |
| `thickness` | `MaterialThickness` | `MaterialThickness.Regular` | 模糊/半透明层级；随高度增加而加厚。 |
| `shape` | `Shape` | `RectangleShape` | 用于裁剪并描边表面的形状。 |
| `progressive` | `Boolean` | `false` | 让材质沿底部边缘渐变为透明。 |
| `content` | `@Composable BoxScope.() -> Unit` | — | 渲染在材质之上的内容。 |

### `MaterialThickness`

| 取值 | 说明 |
|---|---|
| `UltraThin` | 最轻的半透明度（alpha 系数 0.70）。 |
| `Thin` | 轻度半透明（alpha 系数 0.85）。 |
| `Regular` | 默认半透明度（alpha 系数 1.00）。 |
| `Thick` | 最重的半透明度（alpha 系数 1.15）。 |

> 假定外层包裹了 `PrismTheme { }`；颜色读取自 `PrismTheme.colors.materialBg` 和 `PrismTheme.colors.separator`。
