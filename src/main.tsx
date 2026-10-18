// Self-hosted fonts: no request to Google Fonts (GDPR)
import '@fontsource/ibm-plex-mono/300.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/400-italic.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/600.css'
import '@fontsource/ibm-plex-mono/700.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/400-italic.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-sans/700.css'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './theme/ThemeContext'

// A prerendered copy (scripts/prerender.mjs) is only for crawlers: drop it and its baked MUI styles
const container = document.getElementById('root')!
if (container.hasAttribute('data-prerendered')) {
  container.replaceChildren()
  container.removeAttribute('data-prerendered')
  document.querySelectorAll('style[data-prerender]').forEach((style) => style.remove())
}

createRoot(container).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)