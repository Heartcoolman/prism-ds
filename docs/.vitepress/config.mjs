import { defineConfig } from 'vitepress'

const c = (text, slug) => ({ text, link: `/components/${slug}` })

export default defineConfig({
  title: 'Prism',
  description: 'A themeable, Apple-inspired design system for Compose Multiplatform and React.',
  lang: 'en-US',
  base: '/prism-ds/',
  cleanUrls: true,
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/prism-ds/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#0066cc' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Get Started', link: '/install' },
      { text: 'Theming', link: '/styling' },
      { text: 'Components', link: '/components/' },
      { text: 'Guide', link: '/guides/00-foundations' },
      { text: 'Demo', link: '/demo/', target: '_blank' },
    ],
    sidebar: {
      '/components/': [
        { text: 'Overview', link: '/components/' },
        {
          text: 'Actions & Feedback',
          collapsed: false,
          items: [
            c('Button', 'button'), c('Tag', 'tag'), c('Badge', 'badge'), c('Banner', 'banner'),
            c('Toast', 'toast'), c('Spinner', 'spinner'), c('ProgressBar', 'progressbar'),
            c('Skeleton', 'skeleton'), c('PageControl', 'pagecontrol'), c('StateView', 'stateview'),
          ],
        },
        {
          text: 'Inputs & Forms',
          collapsed: false,
          items: [
            c('TextField', 'textfield'), c('Textarea', 'textarea'), c('SearchField', 'searchfield'),
            c('Select', 'select'), c('Switch', 'switch'), c('Checkbox', 'checkbox'), c('Radio', 'radio'),
            c('Slider', 'slider'), c('Stepper', 'stepper'), c('DatePicker', 'datepicker'),
            c('WheelPicker', 'wheelpicker'),
          ],
        },
        {
          text: 'Navigation',
          collapsed: false,
          items: [
            c('Tabs', 'tabs'), c('SegmentedControl', 'segmentedcontrol'), c('TabBar', 'tabbar'),
            c('NavBar', 'navbar'), c('Breadcrumb', 'breadcrumb'),
          ],
        },
        {
          text: 'Overlays & Disclosure',
          collapsed: false,
          items: [
            c('Modal', 'modal'), c('Alert', 'alert'), c('Sheet', 'sheet'), c('Popover', 'popover'),
            c('Tooltip', 'tooltip'), c('Menu', 'menu'), c('Disclosure', 'disclosure'),
          ],
        },
        {
          text: 'Containers & Content',
          collapsed: false,
          items: [
            c('Card', 'card'), c('List', 'list'), c('Table', 'table'), c('Grid', 'grid'),
            c('Avatar', 'avatar'), c('Image', 'image'),
          ],
        },
        {
          text: 'Charts',
          collapsed: false,
          items: [c('BarChart', 'barchart'), c('LineChart', 'linechart'), c('ProgressRing', 'progressring')],
        },
        {
          text: 'Glass',
          collapsed: false,
          items: [c('Material', 'material'), c('LiquidGlass', 'liquidglass')],
        },
        {
          text: 'Foundation',
          collapsed: false,
          items: [c('Icon', 'icon'), c('ThemeProvider', 'themeprovider')],
        },
      ],
      '/guides/': [
        {
          text: 'Design Guide',
          items: [
            { text: 'Foundations', link: '/guides/00-foundations' },
            { text: 'Materials & Motion', link: '/guides/01-materials-motion' },
            { text: 'Components', link: '/guides/02-components' },
            { text: 'Interaction & States', link: '/guides/03-interaction-states' },
            { text: 'Accessibility', link: '/guides/04-accessibility' },
            { text: 'Brand & Platforms', link: '/guides/05-content-platforms-governance' },
          ],
        },
      ],
      '/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Get Started', link: '/install' },
            { text: 'Theming', link: '/styling' },
            { text: 'Components', link: '/components/' },
          ],
        },
        {
          text: 'Architecture',
          items: [
            { text: 'Compose migration plan', link: '/COMPOSE-MIGRATION' },
            { text: 'CSS theming (web)', link: '/THEMING' },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/Heartcoolman/prism-ds' }],
    search: { provider: 'local' },
    outline: [2, 3],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Prism Design System',
    },
  },
})
