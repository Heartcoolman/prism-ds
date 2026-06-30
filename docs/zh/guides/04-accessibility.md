# 无障碍

无障碍是基线，而非附加项。需满足对比度、点击区域、动态字体（Dynamic Type）以及清晰的焦点指示。

## 对比度

- 正文文字最低 **4.5:1**；大号文字 **3:1**。
- ✓ 通过 — 可读文字约 7:1。✕ 不通过 — 灰底上的浅灰文字约 1.6:1。

## 点击区域

- 最小触摸目标 **44×44 pt**。指针目标可缩小至约 28；触摸环境绝不依赖悬停。

## 动态字体（Dynamic Type）

布局随字号增大而重新排布（按钮换行，图标与文字纵向堆叠）——文字绝不被截断或裁切。使用相对单位，避免固定高度的容器。

| 正文字号 | px |
|---|---|
| 小 | 14 |
| 默认 | 17 |
| 大 | 23 |
| 无障碍 XL | 31+ |

## 焦点与动效

- **焦点环（Focus ring）** — 键盘焦点必须清晰可见：偏移 2px，对比度 ≥ 3:1。代码中：`:focus-visible { outline: 3px solid rgba(0,102,204,.4); outline-offset: 2px; }`（令牌 `--focus-ring`）。
- **减弱动效（Reduced motion）** — 尊重用户的偏好：

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

每个组件都通过三项检查：**对比度、键盘、屏幕阅读器。**
