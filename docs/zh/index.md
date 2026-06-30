---
layout: home

hero:
  name: Prism
  text: 面向 Compose Multiplatform 与 React 的设计系统
  tagline: 46 个 token 驱动组件——默认 Apple 风格,可换成你的品牌,全部源自单一真源。
  image:
    src: /logo.svg
    alt: Prism
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/install
    - theme: alt
      text: 组件
      link: /zh/components/
    - theme: alt
      text: GitHub
      link: https://github.com/Heartcoolman/prism-ds

features:
  - icon: 🎨
    title: Token 驱动
    details: 单一真源同时生成 CSS 变量与 Kotlin token 数据类。颜色、字阶、间距、动效在 Web 与 App 之间永不漂移。
  - icon: 🧩
    title: Material 3 底座
    details: PrismTheme 把 Prism token 映射成 Material 3 ColorScheme，再通过 CompositionLocal 叠加 Prism 专有 token。
  - icon: 📦
    title: 46 个组件
    details: 操作、输入、导航、浮层、列表、图表、玻璃——全套,且经核验忠实于 React 原版。
  - icon: 🌐
    title: 跨平台
    details: Android(minSdk 31)、iOS、桌面共用一份 commonMain；Web 端保留 React 以获得像素级 CSS。
  - icon: 🌗
    title: 可主题化
    details: 内置 Apple 风格默认值,可切换中性预设,或注入你自己的品牌——明暗双色。
  - icon: ♿
    title: 无障碍
    details: Material 3 自带语义,外加每个自绘组件手写的 Modifier.semantics。
---
