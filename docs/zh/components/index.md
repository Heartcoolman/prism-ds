# 组件

全部 **46** 个组件，忠实于 React 原版并经过对照验证。大多数位于 `prism-ui`；图表在 `prism-charts`，玻璃在 `prism-glass`，图标在 `prism-icons`。桌面端 [`sample`](https://github.com/Heartcoolman/prism-ds/tree/main/prism-compose/sample) 实例化了每一个组件。

组件在适合的地方构建于 Material 3 基础之上，并完全由 [`PrismTheme`](/zh/styling) 令牌进行样式设置。交互式和自定义绘制的组件携带 `Modifier.semantics { }` 以支持屏幕阅读器。

## 操作与反馈

| 组件 | API | 说明 |
|---|---|---|
| [Button](./button) | `PrismButton` | 4 个变体 × 色调 × 3 种尺寸，前置/后置图标 |
| [Tag](./tag) | `PrismTag` | 色调胶囊；`selected` 边框环；可用的移除（×） |
| [Badge](./badge) | `PrismBadge` | 计数/圆点，`max`，浮于 `content` 之上 |
| [Banner](./banner) | `PrismBanner` | 着色、色调图标、操作 + 关闭 |
| [Toast](./toast) | `PrismToast` | neutral/success/error 变体 + 自动图标 |
| [Spinner](./spinner) | `PrismSpinner` | `CircularProgressIndicator`；`label` / `showLabel` |
| [ProgressBar](./progressbar) | `PrismProgressBar` | `LinearProgressIndicator`；色调；确定/不确定 |
| [Skeleton](./skeleton) | `PrismSkeleton` | text / rect / circle 变体，`lines` |
| [PageControl](./pagecontrol) | `PrismPageControl` | 圆点指示器；设置 `onChange` 后可点按 |
| [StateView](./stateview) | `PrismStateView` | empty/error：图标 + 标题 + 描述 + 操作 |

## 输入与表单

| 组件 | API | 说明 |
|---|---|---|
| [TextField](./textfield) | `PrismTextField` | `OutlinedTextField` + 标签 / 帮助 / 错误 |
| [Textarea](./textarea) | `PrismTextarea` | 多行输入 |
| [SearchField](./searchfield) | `PrismSearchField` | 搜索图标 + 条件清除 |
| [Select](./select) | `PrismSelect` | `ExposedDropdownMenuBox`（泛型 `<T>`） |
| [Switch](./switch) | `PrismSwitch` | 令牌样式的 Material 3 `Switch` |
| [Checkbox](./checkbox) | `PrismCheckbox` | `TriStateCheckbox` |
| [Radio](./radio) | `PrismRadio` / `PrismRadioGroup` | `RadioButton` + `selectableGroup` |
| [Slider](./slider) | `PrismSlider` | 可选标签 + 数值显示 |
| [Stepper](./stepper) | `PrismStepper` | −/＋ 带 min/max/step 边界 |
| [DatePicker](./datepicker) | `PrismDatePicker` | 42 格月历网格，纯 Kotlin 日期运算 |
| [WheelPicker](./wheelpicker) | `PrismWheelPicker` | 吸附惯性滚轮；单列或多列 |

## 导航

| 组件 | API | 说明 |
|---|---|---|
| [Tabs](./tabs) | `PrismTabs` | 2px 强调色下划线 |
| [SegmentedControl](./segmentedcontrol) | `PrismSegmentedControl` | 逐段背景切换 |
| [TabBar](./tabbar) | `PrismTabBar` | 半透明材质之上的 `NavigationBar` |
| [NavBar](./navbar) | `PrismNavBar` | 3 槽位顶栏 + 大标题、返回按钮 |
| [Breadcrumb](./breadcrumb) | `PrismBreadcrumb` | 可点击路径 + 尖角分隔符 |

## 覆盖层与展开

| 组件 | API | 说明 |
|---|---|---|
| [Modal](./modal) | `PrismModal` | 居中 `Dialog` + 遮罩 |
| [Alert](./alert) | `PrismAlert` | `AlertDialog`；破坏性 / 堆叠 |
| [Sheet](./sheet) | `PrismSheet` | 滑入式底部 sheet + 遮罩 |
| [Popover](./popover) | `PrismPopover` | `Popup`，4 种位置，点击外部/Esc 关闭 |
| [Tooltip](./tooltip) | `PrismTooltip` | 由悬停/聚焦/按压驱动的气泡 |
| [Menu](./menu) | `PrismMenu` | `DropdownMenu`；项、danger、分隔符 |
| [Disclosure](./disclosure) | `PrismDisclosure` | 带动画的手风琴 + 旋转尖角 |

## 容器与内容

| 组件 | API | 说明 |
|---|---|---|
| [Card](./card) | `PrismCard` | 媒体槽位 + eyebrow/标题/描述/页脚 |
| [List](./list) | `PrismList` / `PrismListRow` | 前置/标题/副标题/后置/尖角 |
| [Table](./table) | `PrismTable` | 右对齐数字、细线行 |
| [Grid](./grid) | `PrismGrid` | 响应式列（泛型 `<T>`） |
| [Avatar](./avatar) | `PrismAvatar` / `PrismAvatarGroup` | 首字母 + 在线圆点；重叠 "+N" |
| [Image](./image) | `PrismImage` | 宽高比盒子 + 渐变遮罩 + 占位符 |

## 图表

| 组件 | API | 说明 |
|---|---|---|
| [BarChart](./barchart) | `PrismBarChart` | 比例柱状，单一强调色 |
| [LineChart](./linechart) | `PrismLineChart` | `Canvas` 折线 + 区域渐变 |
| [ProgressRing](./progressring) | `PrismProgressRing` | `drawArc` 环 + 中心标签 |

## 玻璃

| 组件 | API | 说明 |
|---|---|---|
| [Material](./material) | `PrismMaterial` | 磨砂表面，4 种厚度，渐进式 |
| [LiquidGlass](./liquidglass) | `PrismLiquidGlass` | 漂浮的半透明胶囊 |

::: info 玻璃保真度
`prism-glass` 提供了一个无依赖的半透明近似实现，可在每个目标平台上编译。实时背景模糊（Android 12+ 上的 Haze / `RenderEffect`，其他平台上的 Skia 着色器）可在同一 API 背后接入。像素级忠实的 Apple 原生玻璃在设计上仅限 Web。
:::

## 基础

| 组件 | API | 说明 |
|---|---|---|
| [Icon](./icon) | `PrismIcon` / `PrismIcons` | 46 个图标集，运行时 `strokeWidth` |
| [ThemeProvider](./themeprovider) | `PrismTheme` | 参见[主题](/zh/styling) |
