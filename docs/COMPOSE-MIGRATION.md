# Prism → Kotlin / Compose Multiplatform 迁移计划

> 目标路线 **A:Compose Multiplatform(CMP)**,设计语言参考 [`compose-miuix-ui/miuix`](https://github.com/compose-miuix-ui/miuix)(注:架构上**不**照搬 miuix 的"完全自绘脱离 Material",见 §2)。
> 结论先行:**技术可行,但这是从零重写、不是重构**——React/TS + DOM 代码零运行时复用;幸存的是设计 token 与组件规范。
> 证据基线:CMP/ miuix / 关键论断均经联网调研 + 对抗式核验(详见文末来源)。日期基准 2026-06-30。

> **本文为 v2(2026-06-30 对抗审查后修订版)**。40 条红队批评经反向核验,26 条确认成立,已据此修正以下要点:
> ① 删除不实的"不降级"承诺——**玻璃仅 Web(CSS)像素级保真,App 端为 Skia 近似(用户已接受)**;
> ② 消除 Material3 自相矛盾——**改为 Material3 底座 + PrismTheme 包装**,放弃"完全脱离 Material";
> ③ 工期由 65–105 重报为 **140–230 人天**(补测试/无障碍/CI/Maven/对齐迭代 + 首次系数);
> ④ 补 **Compose 端无障碍**(每组件需手写 `semantics{}`)与**双轨 ~2× 维护税**;
> ⑤ 修正 **minSdk 33→31**(硬件模糊自 API 31 起就有)及多处映射错误(Sheet/SegmentedControl/Select/Icon/Tag)。

> **适用条件(红队战略提醒)**:本计划只在**确有 App 端消费者**时才划算——这是一次 7–11.5 人月、面向零既有用户的重写;参照 miuix 为 ~2 年、~10 人、1086 commit 仍停 v0.9。若暂无消费者,**最低成本的可交付物是单独发布 KMP 设计 token 包**(见 §9 注),把 46 组件全量重写推后到有需求时。

> **实施进展(2026-06-30,全量落地并交叉验证)**:整份组件迁移已完成,代码在 [`../prism-compose/`](../prism-compose/),~4.8k 行 Kotlin,**Desktop 与 Android 双 target 均编译通过**:
> - **决策 #6 单一 token 源**:`tokens/prism-tokens.json` → `build-tokens.mjs` 同源生成 CSS 与 Kotlin;生成 CSS 与生产 `src/styles/tokens.css` **值级一致(107 token,自动校验)**。
> - **§8 阶段 0–1**:KMP + Compose 1.7.3 / Kotlin 2.1.0,6 模块 `prism-core`/`prism-icons`/`prism-charts`/`prism-glass`/`prism-ui`/`sample`;`PrismTheme`(Material3 底座 + 8 个 `CompositionLocal` + token→M3 ColorScheme 映射)+ 明暗 + apple/neutral 品牌;**9 token 测试全绿**。
> - **§8 阶段 2–4 组件(46/46)**:全部 46 个组件移植完成(prism-ui 41 + prism-charts 3 + prism-glass 2),含 Moderate(TextField/Select/Modal/Menu/Popover/Tooltip/DatePicker/Sheet…)与 Hard(LineChart/WheelPicker);**全部在 `sample/Gallery.kt` 实例化并编译通过**。
> - **§5 阶段 5 图标**:`Icon/icons.ts` → `build-icons.mjs` 生成 46 图标(`addPathNodes`,运行时 `strokeWidth` 保留);**4 图标测试全绿**。
> - **§5 阶段 6 玻璃**:`prism-glass` 独立模块,无依赖半透明材质近似(Haze/RenderEffect 真模糊按同一 API 接入位预留)。
> - **§6 阶段 7 无障碍**:Material3 内建语义 + 自绘件手写 `semantics{}`(liveRegion/role/state/contentDescription)。
> - **§2 平台**:追加 **Android target(minSdk 31,AGP 8.7.3)** 并编译通过;iOS target 已声明,需 Xcode/macOS CI 链接。
> - **对抗式保真核验**:7 agent 逐组件对照 React 源审计 → 初版 36 faithful / 10 partial / 0 stub;按发现修复 10 个(含 **Tag.onRemove 死控件 bug**、Skeleton 变体、Badge 浮标、Banner 图标+关闭、Card 媒体槽、PageControl 可点、Toast 变体、WheelPicker 多列、Spinner label、ProgressBar tone)→ 复审 **46/46 faithful、0 partial**。
> - 一键校验:`prism-compose/verify.sh`(token parity + 图标 regen + Desktop 编译/测试 + Android 编译)。
> **仍属外部基建、非代码**(本环境不可建):iOS 真机链接、Maven Central 上架(命名空间+GPG)、截图/像素回归基线、真机 TalkBack/VoiceOver 测试——对应阶段 0b/0c/8/9 与 §7。

---

## 1. 为什么是"重写"而非"重构"

| 维度 | 现状 Prism | 目标 CMP | 是否复用 |
|------|-----------|----------|----------|
| 语言 | TypeScript | Kotlin | ✗ |
| 渲染 | 浏览器 DOM + CSS | Skia canvas(无 DOM/CSS) | ✗ |
| 组件实现(46×`.tsx`) | JSX/forwardRef/ARIA | `@Composable` + `Modifier` | ✗ 几乎零复用 |
| 样式(~34×`.css`) | CSS 类 + `backdrop-filter` 等 | `Modifier`/`drawBehind`/`Canvas` | ✗ |
| **设计 token 值** | `tokens.css` 变量 | Kotlin `@Immutable` 数据类 | ✓ **值可搬** |
| **组件规范/视觉行为** | 规范文档 + 现有行为 | 作为重写依据 | ✓ |

**幸存的只有"设计规范本身"**:token 值、组件清单、交互/视觉行为。这一判断已对抗核验为 **SUPPORTED(高置信)**。

---

## 2. 目标模块结构

模块拆分参考 miuix(`miuix-ui`/`-core`/`-icons`/`-blur` 等)。Prism 对应:

```
prism-compose/                      # Gradle 根(KMP + Compose plugin)
├── prism-core/                     # 主题层:token 数据类、PrismTheme(含 Material3 映射)、CompositionLocals、共享 Modifier
├── prism-ui/                       # 41 个标准组件(依赖 core + Material3)
├── prism-icons/                    # Icon 集 → ImageVector 资源(需自建 SVG→ImageVector 转换步骤)
├── prism-charts/                   # BarChart / LineChart(Canvas 绘制;可选独立)
├── prism-glass/                    # LiquidGlass / Material / 毛玻璃背景(依赖 Haze,平台分级)★风险隔离
└── sample/                         # 可运行示例 app + @Preview(替代 Storybook)
    ├── androidApp / iosApp / desktopApp   # Web 不在 Compose 范围,由现有 React demo 承担
```

- **目标平台(混合方案)**:Compose 只覆盖 **App 三端 = Android / iOS / Desktop(JVM),均 Stable**;**Web 端不进 Compose,继续用现有 `@prism-ds/react`**。四端总覆盖 = React(web)+ Compose(App×3)。
- **Android `minSdk 31`(Android 12)** ✏️v2 修正:硬件背景模糊(`RenderEffect.createBlurEffect`)**自 API 31 起即可用**,Haze 官方确认 Android 12/12L 能真模糊。原"33 才有真模糊"不实。31/32 上"渐进/分级模糊"略受限,可接受;若要最干净的渐进模糊与失效粒度再考虑 33。
- **架构立场 ✏️v2 修正:采用 Material3 作底座 + `PrismTheme` 包装层**,而非 miuix 式"完全自绘脱离 Material"。理由:§4 中约 20 个组件本就映射到 Material3 控件;完全自绘需用 foundation 原语重搭这些控件,工期翻倍(正是 miuix 历时 ~2 年的原因)。代价:视觉/纯净度略让步于完全自绘,需用 `PrismTheme` 把 Material3 的 `ColorScheme/Typography/Shapes` 映射到 Prism token 并叠加 Prism 自有 `CompositionLocal`。(完全自绘仍是可选项,见 §8 备注,工期上浮 ~50–80%。)
- **发布**:每模块标准 KMP 多 target artifact → Maven Central(`vanniktech` 插件)。⚠️注意 **2025 年 Sonatype 已迁移到新 Central Portal**,首次需命名空间验证 + GPG 签名;坐标拟 `io.github.heartcoolman.prism:prism-ui:<ver>`(需先验证该 `io.github.heartcoolman` 命名空间归属)。
- **`prism-glass` 单独成模块**:唯一有平台保真度差异、且依赖第三方 blur 库的部分——隔离后其余模块保持纯净(miuix 同样拆 `miuix-blur`)。

---

## 3. 主题 / Token 层移植(最省心、几乎原样幸存)

`tokens.css` 的 **primitive → semantic → component** 三层 + 明暗 + 品牌注入,**正好是 CMP 官方推荐的自定义设计系统范式**。核验结论:架构完全成立且 API stable(`CompositionLocal`/`staticCompositionLocalOf`/`@Immutable` 自 Compose 1.0 起稳定)。

> ✏️v2:因 §2 采用 Material3 底座,`PrismTheme` 需**同时**做两件事:(a) 把 Prism token 映射成 Material3 的 `lightColorScheme/darkColorScheme`/`Typography`/`Shapes` 喂给内部 `MaterialTheme`,供 Material3 控件取色;(b) 额外 provide Prism 自有的 `CompositionLocal`(Material3 覆盖不到的 token,如材质/玻璃/动效/品牌强调色)。下方骨架是 (b) 部分;(a) 是 `MaterialTheme(colorScheme = prismColors.toMaterial3(), …){ … }` 的薄包装。

| Web 概念 | Compose 等价 |
|----------|-------------|
| `:root` 上的 `--token` 变量库 | 不可变数据类 `PrismColors`/`PrismTypography`/`PrismSpacing`/`PrismRadius`/`PrismElevation`/`PrismMotion`/`PrismDimensions`,各经 `staticCompositionLocalOf` 暴露 |
| primitive 层(`--gray-*`,`--blue-600`,"少用") | `internal object PrismPalette { val Blue600 = Color(0xFF0066CC); … }` |
| semantic 层 `var()` 别名(`--color-accent: var(--blue-600)`) | 构造期即时解析的字段:`PrismColors(accent = PrismPalette.Blue600, …)` |
| component 层(`--control-h-sm/md/lg`,`--size-touch`) | `PrismDimensions` 数据类 / 各组件 `Defaults` 对象 |
| `ThemeProvider`(套 token 的 wrapper div) | `@Composable fun PrismTheme(colorScheme, brand, content)` 包 `CompositionLocalProvider{…}` |
| `@media (prefers-color-scheme: dark)` | `isSystemInDarkTheme()` |
| `[data-theme="dark"\|"light"]` 显式覆盖 | `PrismTheme(colorScheme = …)` 参数,默认随系统 |
| 明暗 token 集(仅颜色不同,间距/圆角/字阶/动效共享) | `lightPrismColors`/`darkPrismColors` + **共享单份** `PrismSpacing/Radius/Typography/Motion` |
| 运行时品牌注入(`ThemeProvider` 的 `theme` 部分覆盖) | `fun PrismBrand.applyTo(base): merged`,逐字段 `null` 合并 + `data class copy()` |
| `themeToVars()` + `VAR_MAP` | 纯映射/合并函数(同上 `applyTo`) |
| `presets.ts`(`apple`/`neutral`) | `applePrismBrand` / `neutralPrismBrand`(或完整 `applePrismColors`/`neutralPrismColors`) |
| 字体简写 token(`--text-body: 400 17px/1.5 family`) | `TextStyle(fontWeight=W400, fontSize=17.sp, lineHeight=25.5.sp, letterSpacing=…, fontFamily=…)` |
| 标量 token(`--s-*`/`--radius-*`/`--shadow-*`/`--ease-*`/`--dur-*`) | `Dp`(间距/圆角)、`Modifier.shadow`、`CubicBezierEasing`(缓动)、`Int ms`/`Duration` |

**目标骨架(示意):**

```kotlin
@Immutable data class PrismColors(val accent: Color, val accentHover: Color, /* … */ val bg: Color, val labelPrimary: Color)
@Immutable data class PrismTypography(val title1: TextStyle, /* … */ val body: TextStyle, val caption: TextStyle)
// + PrismSpacing / PrismRadius / PrismElevation / PrismMotion / PrismDimensions

val LocalPrismColors = staticCompositionLocalOf<PrismColors> { error("PrismTheme missing") }
// + 其余 Local*

object PrismTheme {
    val colors: PrismColors @Composable @ReadOnlyComposable get() = LocalPrismColors.current
    val typography: PrismTypography @Composable @ReadOnlyComposable get() = LocalPrismTypography.current
    // …
}

@Composable fun PrismTheme(
    colorScheme: PrismColorScheme = if (isSystemInDarkTheme()) PrismColorScheme.Dark else PrismColorScheme.Light,
    brand: PrismBrand = PrismBrand.Apple,           // apple(默认) / neutral / 自定义
    content: @Composable () -> Unit,
) {
    val colors = brand.resolveColors(colorScheme)   // = themeToVars 的语义合并
    CompositionLocalProvider(
        LocalPrismColors provides colors,
        LocalPrismTypography provides PrismType,     // 明暗共享
        /* … */
    ) { ProvideTextStyle(PrismType.body, content) }
}
```

> 注意 `global.css` 的工具类(`.stack`/`.text-title-1`/`.prism-root` 等)**不属于 token 模型**:间距/布局类 → `Modifier` 扩展;文字类 → 复用 `TextStyle`;`.prism-root` 的字体/底色基线 → `PrismTheme` 的 content wrapper。

---

## 4. 组件逐个映射(全 46)

难度:**T** trivial(18)· **M** moderate(24)· **H** hard(2)· **N** 无直接等价(2)。 ✏️v2:Sheet 由 Hard 降为 Moderate(见 §4.2)。

### 4.1 Trivial(18)— 1:1 映射,成本=token+视觉,非逻辑

| 组件 | Compose 目标 | 要点 |
|------|-------------|------|
| Button | `Button`/`Surface` + `Modifier` | 5 变体×3 色调×3 尺寸,前后置 icon |
| Card | `Surface`/`Card` + `Column` | media/eyebrow/title/desc/footer 槽 + hover-lift(→ `Modifier` 交互态) |
| Badge | `BadgedBox` / `Box` 叠层 | count/dot,可浮于锚点右上 |
| Tag | Material3 `FilterChip`/`InputChip`/`AssistChip` | ✏️v2:Material3 无单一 `Chip` 控件,按场景选;选中环 + 可选删除(x) |
| Banner | 染色 `Row` | 图标+标题/消息+动作+关闭 |
| Avatar | `Box`+`AsyncImage`(Coil) | 圆形+presence dot;AvatarGroup=重叠栈+「+K」溢出 |
| Image | `Box(aspectRatio)`+`AsyncImage` | 定比封面 + 渐变 scrim + 占位字形 |
| Spinner | `CircularProgressIndicator` | 旋转环,3 尺寸 |
| Skeleton | `Box` + shimmer/alpha 动画 | 脉冲占位 |
| ProgressBar | `LinearProgressIndicator` | 定值 + 不定值滑段 |
| Breadcrumb | `Row` + 可点 `Text` | chevron 分隔,末项为当前 |
| Grid | Compose 网格 | 响应式断点需 `BoxWithConstraints`/`WindowSizeClass` |
| Icon | `Icon()` + `ImageVector` | ✏️v2:**无内置 SVG→ImageVector 步骤,需自建**(脚本/Gradle 任务);且 React 版 stroked 图标的**运行时 `strokeWidth` prop 烘焙后丢失**——若要保留需改用运行时绘制或参数化 vector |
| Table | `Column` of `Row` | 数字右对齐/等宽数字 + 发丝线;无排序/虚拟化 |
| List | `Column`/`LazyColumn` | List + ListRow(leading/title/subtitle/trailing/chevron) |
| StateView | 居中 `Column` | icon 圈+标题+描述+动作;复用 Icon/Spinner |
| Toast | `Row` 浮层卡 | 纯展示,无自动消失计时 |
| PageControl | `Row` of dots | active=更宽 accent 药丸 |

### 4.2 Moderate(23)— 有状态/交互,Compose 标准件

| 组件 | Compose 目标 | 要点 |
|------|-------------|------|
| Switch | `Switch`(自定义样式) | 药丸轨道+滑块 |
| Checkbox | `TriStateCheckbox` | checked/indeterminate/disabled |
| Radio | `RadioButton` + `selectableGroup` | 含受控 RadioGroup |
| TextField | `OutlinedTextField`(+supportingText) | label+leading icon+help/error+focus 环 |
| Textarea | 多行 `TextField` | 可调高 + label/help/error |
| SearchField | `BasicTextField`+decorationBox | 放大镜 + 条件清除(x) |
| Select | `ExposedDropdownMenuBox`(Material3) | ✏️v2:这是**行为变更**——原生 `<select>` 自带系统选择器/键盘/无障碍,Compose 版是自绘下拉,需手动补齐这些;非"近等价" |
| Slider | `Slider` | 可选 label + 数值读出 |
| Stepper | `Row` of `IconButton` + 状态 | min/max/step + 到界禁用 |
| SegmentedControl | 自定义 `Row` of 可选段 | ✏️v2:源码**无滑动动画指示器**,是每段独立切背景;工作量比原描述低 |
| Tabs | `TabRow`/`Tab` | 2px accent 下划线 + 左右键导航 |
| TabBar | `NavigationBar`(Material3) | ★毛玻璃底:Android 12+ 经 Haze 真模糊,iOS/桌面 Skia 近似(见 §5) |
| NavBar | `TopAppBar`(Material3) | 三栏 + large-title;★毛玻璃底同 TabBar |
| Menu | `DropdownMenu`/`DropdownMenuItem` | 图标/danger/分隔;受控开合 |
| Modal | `Dialog` | 居中 + 暗 scrim;Dialog 自带 portal |
| Alert | `AlertDialog` | cancel/confirm(destructive/stacked 变体) |
| Popover | `Popup` + 自定义 `PopupPositionProvider` | 4 向箭头 + 外点/Esc 关闭(箭头需手绘) |
| Tooltip | `TooltipBox` / interactionSource 驱动 | 触屏无 hover,需改交互模型 |
| Disclosure | `animateContentSize` + 旋转状态 | 受控/非受控手风琴 |
| ProgressRing | `Canvas` `drawArc`(stroke cap)+中心文字 | 替代 conic-gradient |
| BarChart | 加权 `Box` + `fillMaxHeight(fraction)` | 比例高度条,无轴;数据归一化 |
| DatePicker | 42 格月历(`kotlinx-datetime`) | 月翻页 + today/selected/outside 态(moderate 上限) |
| Sheet | `AnimatedVisibility` 滑入 + scrim | ✏️v2 由 Hard 降此:**忠实 1:1 = 静态滑入(源码即如此,无拖拽)**;拖拽消失/吸附是增强项(届时才需 `anchoredDraggable`,且 `ModalBottomSheet` 属 Material3) |
| ThemeProvider | `CompositionLocalProvider`(见 §3) | 非视觉件;底层 token 系统是独立的非平凡移植 |

### 4.3 Hard(2)— 真正的 Compose 工程

| 组件 | Compose 目标 | 工作量来源 |
|------|-------------|-----------|
| LineChart | `Canvas` `Path` 绘制 + linear-gradient `Brush` | 无 SVG;折线+面积渐变+端点,需自行缩放到视口 |
| WheelPicker | scroll-snap/fling `LazyColumn` + 逐项 `graphicsLayer` 淡出 | React 版显式静态(切片+点选,无物理);**真滚轮需手势/惯性工程**(首次跨端手势物理,易超估) |

### 4.4 No-direct-equivalent(2)— 核心硬伤,见 §5

| 组件 | 问题 |
|------|------|
| LiquidGlass | 依赖 `backdrop-filter` blur+saturate+brightness **实时折射背后内容** + 高光边;Compose 无一等公民背景模糊 |
| Material | 4 档厚度 backdrop blur+saturate + **progressive 渐变模糊遮罩**;实时背景模糊与渐进模糊均无一等等价 |

---

## 5. 关键风险:毛玻璃(产品识别度所在)

**这是迁移的真正卡点,且恰是 Prism 的招牌。** 已对抗核验为 **SUPPORTED**(关键论断 #3)。

> **✏️v2 诚实重述(核心)**:玻璃**只有 Web(CSS)是像素级保真**;**Compose App 三端都做不到与苹果原生一致**,只能近似——这是物理上限,用户已接受(2026-06-30)。具体:
> - **Android 12+(minSdk 31)**:经 Haze 走 `RenderEffect` 硬件模糊,效果最好(31/32 渐进模糊略限,33+ 最干净);
> - **iOS**:**降级最明显且不可解**——CMP 把 Compose 内容经 Skia 画到 `CAMetalLayer`、**不走 UIKit**,故 Haze **无法调用苹果原生 `UIVisualEffectView` / iOS 26 Liquid Glass**,只能 Skia shader 近似,且无法模糊其下的原生/系统视图;
> - **Desktop**:Skia shader 近似。
>
> 因 **minSdk 31 + Web 留给 React**,下表 Android ≤11 一档已不在范围,`prism-glass` 无需 RenderScript/scrim 回退;Android 12/12L 仍需 Haze 的失效 workaround。下表保留作背景。

- **CSS 行为是"实时背景采样"**:`backdrop-filter: blur()` 持续重采样元素**背后**已渲染像素(浏览器自 ~2024-09 Baseline 全面支持)。
- **Compose 无一等等价**:`Modifier.blur` 只模糊**组件自身**内容,且 **Android API 31+** 才有,以下静默 no-op;CMP 核心**无** `backdropBlur()`。
- **唯一可行解 = 第三方库**:[Haze](https://chrisbanes.github.io/haze)(Chris Banes)/ [Cloudy](https://github.com/skydoves/Cloudy)。底层都是 `GraphicsLayer.record` 捕获背景 → `RenderEffect.createBlurEffect`(Android)/ Skia runtime shader(其他端)→ 平移重绘到前景下。
- **平台分级(Haze 官方平台文档)**:

| 平台/版本 | 背景模糊能力 |
|-----------|-------------|
| Android 13+(SDK 33+) | 最佳,runtime-shader,稳定 |
| Android 12 / 12L(31–32) | 需 workaround;Haze 1.6 起靠 ViewTreeObserver 预绘失效 hack,过度失效削弱 Compose 分相 |
| Android ≤11(≤30) | **无真模糊**,退化为 scrim(半透明色);实验性 RenderScript 路径慢一帧、丢帧、可能移除 |
| iOS / Desktop / Web(Skia) | runtime shader **近似**,非像素级还原 Apple `UIBlurEffect` / Liquid Glass |

- **附加难点**:`saturate()+brightness()` 调色需 `ColorMatrix` 组进 `RenderEffect` 链(Android-only);Material 的 **progressive 渐变模糊**比简单 alpha 遮罩更难;且 Haze 只能模糊**同窗口内 Compose 绘制内容**,无法捕获系统栏/原生视图。
- **性能成本 ✏️v2 补**:全局实时背景模糊有真实 GPU/帧时与电量开销(实测约 +1.25× 帧时,大面积/高半径更重);常用缓解手段 `inputScale` 降采样本身又是一层保真度损失。玻璃应**节制使用**,不宜铺满。
- **决策(已修正)**:`prism-glass` 为独立模块,各端走各自最强路径——Android 12+ 真模糊,iOS/桌面 Skia 近似;`NavBar`/`TabBar` 默认开启模糊、不可用时回落半透明填充。**明确告知用户:App 端玻璃是"优秀但非苹果原生"的近似,iOS 上与系统原生玻璃并列时差异最易察觉。** 这是路线 A 用 Compose 做 iOS 的固有代价,非调参可消除。

---

## 6. 横切关注点

| 关注点 | Web 机制 | Compose 处理 |
|--------|---------|-------------|
| 动画(量最大) | CSS transition/keyframes 隐式触发 | **每个属性显式接** `animate*AsState`/`InfiniteTransition`/`AnimatedVisibility`——无能力缺口,但改写量最高(~34 个 CSS 文件) |
| 浮层(Modal/Menu/Popover/Tooltip/Sheet) | DOM portal + 全局事件 | `Dialog`/`Popup`(自带跨窗口),`Escape`/外点 → `onDismissRequest`/`onPreviewKeyEvent` 逐处重接 |
| 焦点 | `:focus-visible` 自动区分键盘 | 无自动区分;从 `isFocused` 手动派生焦点环 |
| 全局键/点 | `document` 监听 | 无 app 级事件总线,按浮层局部化 |
| 图标 | SVG path 字符串 | 编译期转 `ImageVector`/矢量资源(机械) |
| 图表 | 内联 SVG | `Canvas` Path + `Brush`(LineChart/ProgressRing),加权 Box(BarChart) |
| 日期 | JS `Date` | `kotlinx-datetime` |
| 响应式 | CSS 媒体查询/容器查询 | `BoxWithConstraints` / `WindowSizeClass` |
| 无障碍(App 端 ✏️v2 改) | DOM 语义 + ARIA(自动) | **Compose 自绘无天生语义**:46 个组件**每个都要手写 `Modifier.semantics{}`**(role/state/label/heading 等)才能被 TalkBack/VoiceOver 读到——这是一笔独立的、原计划漏掉的工作量(并入 §8)。Material3 控件自带部分语义,可减负,但自定义件仍需补 |
| SEO(仅 Web 端) | DOM 语义 | 与 Compose 无关(web 由 React 承担,有 SEO) |

---

## 7. 工具链与发布

- **构建**:Gradle KMP(`org.jetbrains.kotlin.multiplatform` + Compose 插件),声明 `androidTarget`/`iosX64/Arm64/SimulatorArm64`/`jvm("desktop")`。✏️v2:**不含 `wasmJs`**(web 不在 Compose 范围)。
- **文档/预览**:Compose **无 Storybook**;用 `@Preview`(各组件)+ 可运行 `sample` app(每平台)做视觉 QA。
- **测试/视觉回归 ✏️v2 补**:需建跨端**截图回归**框架(如 Paparazzi/Roborazzi + sample app 基线图)对齐 React 原版——这是 §8 必须单列预算的一项。
- **发布**:Maven Central(新 Central Portal),`vanniktech` 插件,逐 target klib;消费方注意 Compose 编译器版本对齐。
- **`/design-sync` 链失效**:同步到 claude.ai/design 是 React/web 工具链,Compose 端不适用。

---

## 8. 分阶段计划与工作量估算 ✏️v2 重报

> **原 65–105 人天经红队核验低估约 2–2.5×**,主因是漏算测试基建、CI 矩阵、Maven 上架、无障碍、像素对齐迭代,且未加首次/单人系数。重报如下。单人工程师、首次跨端、面向"发布级库"。

| 阶段 | 内容 | 估算(人天) |
|------|------|------------|
| 0 脚手架 | KMP/Compose 工程、3 target | 2–3 |
| 0b CI 矩阵 | 三端 CI(iOS 需 macOS runner)、缓存、签名 | 3–5 |
| 0c Maven 上架 | 新 Central Portal 命名空间验证 + GPG + 首次发布管线 | 3–5 |
| 1 主题层 | `PrismTheme`(含 Material3 映射)+ 全套 token 数据类 + brand 合并 + apple/neutral 预设 | 4–6 |
| 2 Trivial×18 | 标准件 + 视觉对齐 | 12–18 |
| 3 Moderate×24 | 含 DatePicker/Popover/Select/Sheet 等上限件 | 30–48 |
| 4 Hard×2 | LineChart / WheelPicker(手势物理易超估) | 8–14 |
| 5 图标 | 自建 SVG→ImageVector 转换 + 全套图标转制 | 4–7 |
| 6 玻璃 ★ | `prism-glass` + Haze + 各端调优 + 性能加固 + NavBar/TabBar 接入 | 10–18 |
| 7 无障碍 | 46 组件 `semantics{}` + TalkBack/VoiceOver 实测 | 8–14 |
| 8 测试/视觉回归 | 截图回归框架 + 基线 + 单元/UI 测试 | 12–20 |
| 9 像素对齐迭代 | 与 React 原版逐组件视觉校准(Skia≠浏览器渲染) | 10–18 |
| 10 文档 | THEMING/README/API 移植 | 4–6 |
| 小计 | | ≈ 110–185 |
| **+ 首次/单人系数(×1.3–1.5)** | 新平台、无既有基线 | |
| **合计** | | **≈ 140–230 人天(约 7–11.5 人月),坏情况 250+** |

> **校准参照**:计划"对标"的 miuix 是 **~2 年、~10 贡献者、1086 commit、40 个 release** 的成果,且仍标 experimental(v0.9.x)——单人数月达到"发布级 + 像素对齐"是乐观假设。
>
> **若选完全自绘(脱离 Material3)**:§2/§4 中 ~20 个 Material3 组件改 foundation 重搭,总工期再上浮 **~50–80%**。

**建议落地顺序**:0/0b/0c → 1 →(先做 5–6 个 Trivial 打通端到端,验证 token+构建+发布)→ 2 → 3 → 4 →(玻璃 6、无障碍 7 各自单独排期)→ 5/8/9/10。**或**:先只交付阶段 1 的 token 包(见 §9 注),其余推后。

---

## 9. 决策(v2 修订 2026-06-30)

| # | 决策 | 结论 |
|---|------|------|
| 1 | 平台范围 | **混合方案**:Compose 覆盖 App 三端(Android/iOS/Desktop);**Web 留给现有 React**。四端总覆盖。 |
| 2 | 玻璃保真 ✏️ | **不再宣称"不降级"**。诚实表述:**Web(CSS)像素级保真;App 三端为 Skia 近似(已接受)**,Android 12+ 最好,iOS 降级最明显且不可解(见 §5)。 |
| 3 | Android 最低版本 ✏️ | **`minSdk 31`(Android 12)**——硬件模糊自 API 31 起即有,无需 33;放弃 Android ≤11。(若偏好最干净渐进模糊可用 33,代价是少覆盖 12/12L。) |
| 4 | 架构底座 ✏️ | **Material3 + `PrismTheme` 包装**(非 miuix 式完全自绘),以控工期;完全自绘为可选,工期上浮 ~50–80%。 |
| 5 | Web 与 Compose 关系 | **双轨并存**:`@prism-ds/react`(web)+ `prism-compose`(App)。 |
| 6 | token 真源 ✏️ | "共享 token"**不能靠手敲两套**(必漂移)。需建**单一 token 源**(如 DTCG JSON / Style Dictionary)**同时生成** CSS 变量与 Kotlin 数据类,否则 React 与 Compose 的视觉会随时间分叉。 |

> **✏️v2 维护成本提醒**:本方案产出**两套各 46 组件的库(React + Compose)、两条 QA 线**,§8 的 140–230 人天只是**一次性构建**;之后是**长期 ~2× 维护税**。决策 #6 的单一 token 源能缓解视觉漂移,但不消除双份组件实现/测试的成本。

> **✏️v2 战略注(最低成本替代)**:若 App 端消费者尚不明确,**建议先只交付 `prism-tokens` KMP 包**(决策 #6 的产物 + §8 阶段 1,约 4–6 人天),让 Kotlin 项目能用 Prism 配色/字阶/间距;46 组件全量 Compose 化推后到确有需求。这是把"唯一廉价且耐用的资产(token)"先变现、避免一次性押注 7–11.5 人月。

**待确认次要项**:Maven group `io.github.heartcoolman.prism`(需先验证命名空间归属)。

---

## 10. 来源(节选,均联网核验)

- JetBrains《Stability of supported platforms》— Android/iOS/Desktop Stable,Web Beta:https://www.jetbrains.com/help/kotlin-multiplatform-dev/supported-platforms.html
- CMP 1.8.0(iOS Stable):https://blog.jetbrains.com/kotlin/2025/05/compose-multiplatform-1-8-0-released-compose-multiplatform-for-ios-is-stable-and-production-ready/
- CMP 1.9.0(Web Beta):https://blog.jetbrains.com/kotlin/2025/09/compose-multiplatform-1-9-0-compose-for-web-beta/
- Google《Custom design systems in Compose》(2026-06-18 更新)
- miuix 仓库 / README / 文档:https://github.com/compose-miuix-ui/miuix ·https://compose-miuix-ui.github.io/miuix/
- Haze 平台文档:https://chrisbanes.github.io/haze/latest/blur/platforms/ ·Cloudy:https://github.com/skydoves/Cloudy
- MDN `backdrop-filter`:https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter ·Android `RenderEffect`:https://developer.android.com/reference/android/graphics/RenderEffect

---

_本计划为路线 A(CMP)。若改走路线 B(Kotlin/JS + kotlin-react,保留现有 web 设计与 CSS,仅 Kotlin 改写逻辑),组件与样式复用率高、但仅 Web 端、需另文。_
