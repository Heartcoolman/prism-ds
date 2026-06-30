# prism-compose

[English](./README.md) · **简体中文**

**Prism** 设计系统的 Kotlin / Compose Multiplatform 移植——混合策略中的 App 端轨道,
详见 [`../docs/COMPOSE-MIGRATION.md`](../docs/COMPOSE-MIGRATION.md)。Web 端继续用
`@prism-ds/react`;本模块覆盖 Android / iOS / 桌面,并与 Web 端**共享同一份 token 源**,
确保两套库不会漂移。

## 状态 —— 组件全量迁移完成,已交叉验证

全部 **46 个组件** 移植并编译通过,在**本机验证了两个 target**(桌面/JVM + Android),约 4.8k 行 Kotlin。

| 范围 | 状态 |
|------|------|
| 单一 token 源 → 同时生成 CSS **与** Kotlin(决策 #6) | ✅ 已生成;CSS 与 `src/styles/tokens.css` 值级一致(107 个 token,自动校验) |
| 主题层 `PrismTheme`(Material3 底座 + 8 个 CompositionLocal,明暗,apple/neutral 品牌) | ✅ + 9 个 token 测试 |
| 图标 —— 46 个图标集,SVG→ImageVector,运行时 strokeWidth | ✅ + 4 个测试 |
| **46 个组件**(prism-ui 41 · prism-charts 3 · prism-glass 2) | ✅ 全部编译;46 个全在 `sample/Gallery.kt` 实例化 |
| 无障碍 —— Material3 内建 + 自绘组件手写 `semantics{}` | ✅(liveRegion / role / state / contentDescription) |
| Target —— 桌面(JVM)+ **Android(minSdk 31)** | ✅ 两者均编译 |
| iOS target | ⏳ 已声明;链接需 Xcode / macOS CI |
| Maven Central 发布 · 截图/像素回归 · 真机 TalkBack/VoiceOver | ⏳ 外部基建(见迁移文档 §7–9) |

## 模块结构(计划 §2)

```
tokens/prism-tokens.json     唯一真源 → build-tokens.mjs → CSS + PrismGeneratedTokens.kt
prism-core/                  token 数据类 + CompositionLocal + PrismTheme(token→Material3 ColorScheme)
prism-icons/                 图标集(icons.ts → build-icons.mjs → PrismIconPaths.kt)+ PrismIcon
prism-charts/                BarChart / LineChart / ProgressRing(Canvas)
prism-glass/                 Material / LiquidGlass(半透明近似;Haze/RenderEffect 在此接入)
prism-ui/                    41 个标准组件(Material3 底座 + token + semantics)
sample/                      可运行的桌面示例 —— Gallery.kt 实例化全部 46 个(替代 Storybook,§7)
```

token / 图标的**取值**是生成的;**结构**(数据类、组件 API)是手写的。改一个颜色 →
编辑 `prism-tokens.json` 再跑生成器;绝不手敲两份。

## 构建与验证

JDK 17+(`JAVA_HOME`)、Node 18+。Android target 需 Android SDK(`local.properties` → `sdk.dir`)。

```bash
./verify.sh                 # token 比对 + 图标重生成 + 桌面编译/测试 + android 编译(完整闸门)
./gradlew :prism-core:desktopTest :prism-icons:desktopTest
./gradlew :sample:run       # 启动桌面示例
```

## 诚实的范围说明

- **玻璃**(`prism-glass`)提供无依赖的半透明材质层,在每个 target 上都能编译。真正的
  背景模糊(Haze / `RenderEffect`,Android 12+;其他端 Skia shader)在同一 API 背后接入。
  按 §5,App 端玻璃在设计上就是对苹果原生玻璃的**近似**——像素级保真的玻璃仅 Web 端可得。
- **Avatar/Image** 渲染首字母/占位图(未接 Coil 网络加载)。
- 与浏览器的像素对齐、Maven 发布、真机读屏测试是计划剩余阶段——需要外部 CI/基建,
  而非这里再加代码。
