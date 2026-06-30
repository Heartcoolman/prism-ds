import { defineConfig } from 'vitepress'

// Build the components sidebar for a locale (p = path prefix: '' for en, '/zh' for zh).
function componentsSidebar(p, zh) {
  const c = (text, slug) => ({ text, link: `${p}/components/${slug}` })
  const t = (en, cn) => (zh ? cn : en)
  return [
    { text: t('Overview', '总览'), link: `${p}/components/` },
    {
      text: t('Actions & Feedback', '操作与反馈'), collapsed: false,
      items: [
        c('Button', 'button'), c('Tag', 'tag'), c('Badge', 'badge'), c('Banner', 'banner'),
        c('Toast', 'toast'), c('Spinner', 'spinner'), c('ProgressBar', 'progressbar'),
        c('Skeleton', 'skeleton'), c('PageControl', 'pagecontrol'), c('StateView', 'stateview'),
      ],
    },
    {
      text: t('Inputs & Forms', '输入与表单'), collapsed: false,
      items: [
        c('TextField', 'textfield'), c('Textarea', 'textarea'), c('SearchField', 'searchfield'),
        c('Select', 'select'), c('Switch', 'switch'), c('Checkbox', 'checkbox'), c('Radio', 'radio'),
        c('Slider', 'slider'), c('Stepper', 'stepper'), c('DatePicker', 'datepicker'), c('WheelPicker', 'wheelpicker'),
      ],
    },
    {
      text: t('Navigation', '导航'), collapsed: false,
      items: [
        c('Tabs', 'tabs'), c('SegmentedControl', 'segmentedcontrol'), c('TabBar', 'tabbar'),
        c('NavBar', 'navbar'), c('Breadcrumb', 'breadcrumb'),
      ],
    },
    {
      text: t('Overlays & Disclosure', '浮层与展开'), collapsed: false,
      items: [
        c('Modal', 'modal'), c('Alert', 'alert'), c('Sheet', 'sheet'), c('Popover', 'popover'),
        c('Tooltip', 'tooltip'), c('Menu', 'menu'), c('Disclosure', 'disclosure'),
      ],
    },
    {
      text: t('Containers & Content', '容器与内容'), collapsed: false,
      items: [
        c('Card', 'card'), c('List', 'list'), c('Table', 'table'), c('Grid', 'grid'),
        c('Avatar', 'avatar'), c('Image', 'image'),
      ],
    },
    { text: t('Charts', '图表'), collapsed: false, items: [c('BarChart', 'barchart'), c('LineChart', 'linechart'), c('ProgressRing', 'progressring')] },
    { text: t('Glass', '玻璃'), collapsed: false, items: [c('Material', 'material'), c('LiquidGlass', 'liquidglass')] },
    { text: t('Foundation', '基础'), collapsed: false, items: [c('Icon', 'icon'), c('ThemeProvider', 'themeprovider')] },
  ]
}

function guidesSidebar(p, zh) {
  const t = (en, cn) => (zh ? cn : en)
  return [{
    text: t('Design Guide', '设计指南'),
    items: [
      { text: t('Foundations', '基础规范'), link: `${p}/guides/00-foundations` },
      { text: t('Materials & Motion', '材质与动效'), link: `${p}/guides/01-materials-motion` },
      { text: t('Components', '组件'), link: `${p}/guides/02-components` },
      { text: t('Interaction & States', '交互与状态'), link: `${p}/guides/03-interaction-states` },
      { text: t('Accessibility', '无障碍'), link: `${p}/guides/04-accessibility` },
      { text: t('Brand & Platforms', '品牌与平台'), link: `${p}/guides/05-content-platforms-governance` },
    ],
  }]
}

function rootSidebar(p, zh) {
  const t = (en, cn) => (zh ? cn : en)
  return [
    {
      text: t('Introduction', '简介'),
      items: [
        { text: t('Get Started', '快速开始'), link: `${p}/install` },
        { text: t('Theming', '主题'), link: `${p}/styling` },
        { text: t('Components', '组件'), link: `${p}/components/` },
      ],
    },
    {
      text: t('Architecture', '架构'),
      items: [
        { text: t('Compose migration plan', 'Compose 迁移计划'), link: `${p}/COMPOSE-MIGRATION` },
        { text: t('CSS theming (web)', 'CSS 主题(Web)'), link: `${p}/THEMING` },
      ],
    },
  ]
}

function nav(p, zh) {
  const t = (en, cn) => (zh ? cn : en)
  return [
    { text: t('Get Started', '快速开始'), link: `${p}/install` },
    { text: t('Theming', '主题'), link: `${p}/styling` },
    { text: t('Components', '组件'), link: `${p}/components/` },
    { text: t('Guide', '指南'), link: `${p}/guides/00-foundations` },
    { text: 'Demo', link: '/demo/', target: '_blank' },
  ]
}

function sidebar(p, zh) {
  return {
    [`${p}/components/`]: componentsSidebar(p, zh),
    [`${p}/guides/`]: guidesSidebar(p, zh),
    [`${p}/`]: rootSidebar(p, zh),
  }
}

export default defineConfig({
  title: 'Prism',
  description: 'A themeable, Apple-inspired design system for Compose Multiplatform and React.',
  base: '/prism-ds/',
  cleanUrls: true,
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/prism-ds/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#0066cc' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [{ icon: 'github', link: 'https://github.com/Heartcoolman/prism-ds' }],
    search: { provider: 'local' },
    outline: [2, 3],
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: nav('', false),
        sidebar: sidebar('', false),
        footer: { message: 'Released under the MIT License.', copyright: 'Prism Design System' },
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: nav('/zh', true),
        sidebar: sidebar('/zh', true),
        outlineTitle: '本页目录',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色',
        darkModeSwitchTitle: '切换到深色',
        langMenuLabel: '切换语言',
        docFooter: { prev: '上一页', next: '下一页' },
        footer: { message: '基于 MIT 许可发布。', copyright: 'Prism 设计系统' },
      },
    },
  },
})
