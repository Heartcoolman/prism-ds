import DefaultTheme from 'vitepress/theme'
import './custom.css'

// Resize each live-demo iframe to its content height (posted by the embed host).
if (typeof window !== 'undefined') {
  window.addEventListener('message', (e) => {
    const d = e.data
    if (!d || d.type !== 'prism-demo-height') return
    document.querySelectorAll('iframe.prism-demo-frame').forEach((f) => {
      if (f.contentWindow === e.source) {
        f.style.height = Math.max(140, Math.min(720, d.height)) + 'px'
      }
    })
  })
}

export default DefaultTheme
