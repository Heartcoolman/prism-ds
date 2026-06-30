# 快速开始

## 环境要求

| | 版本 |
|---|---|
| Kotlin | 2.1.0 |
| Compose Multiplatform | 1.7.3 |
| Gradle | 8.9+ |
| Android `minSdk` | 31（Android 12 — 硬件背景模糊） |
| JDK | 17+ |

目标平台：`android` · `ios` · `desktop (jvm)`。Web 是独立的 React 包 [`@prism-ds/react`](https://github.com/Heartcoolman/prism-ds)。

## 添加依赖

::: warning 预发布
Prism Compose 尚未发布到 Maven Central。目前请从源码引入这些模块——克隆仓库并将其作为 included build 添加，或将 `prism-compose/` 模块复制到你的项目中。下面的坐标是计划发布的形式。
:::

::: code-group

```kotlin [Gradle (planned)]
// build.gradle.kts
dependencies {
    implementation("io.github.heartcoolman.prism:prism-core:0.1.0")
    implementation("io.github.heartcoolman.prism:prism-ui:0.1.0")
    implementation("io.github.heartcoolman.prism:prism-icons:0.1.0")
    // optional:
    implementation("io.github.heartcoolman.prism:prism-charts:0.1.0")
    implementation("io.github.heartcoolman.prism:prism-glass:0.1.0")
}
```

```kotlin [From source (today)]
// settings.gradle.kts
includeBuild("path/to/prism-ds/prism-compose")
// then depend on the modules by their project coordinates
```

:::

## 包裹你的应用

将 `PrismTheme` 放在根部。它提供令牌的 `CompositionLocal` 以及 Material 3 基础，并默认跟随系统的浅色/深色设置。

```kotlin
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.core.tokens.appleBrand

@Composable
fun App() {
    PrismTheme(brand = appleBrand) {       // or neutralBrand, or your own
        Home()
    }
}
```

## 使用组件

```kotlin
import io.github.heartcoolman.prism.ui.*

@Composable
fun Home() {
    Column(
        verticalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s3),
        modifier = Modifier.padding(PrismTheme.spacing.s5),
    ) {
        PrismButton(onClick = { /* … */ }, variant = PrismButtonVariant.Filled) {
            Text("Get started")
        }

        PrismTextField(
            value = name,
            onValueChange = { name = it },
            label = "Name",
        )

        PrismTag("Selected", selected = true, onClick = {})
    }
}
```

## 运行示例

仓库附带一个桌面画廊，实例化了每一个组件：

```bash
cd prism-compose
./gradlew :sample:run
```

或运行完整的交叉验证关卡（令牌一致性 + 桌面编译/测试 + Android 编译）：

```bash
./verify.sh
```
