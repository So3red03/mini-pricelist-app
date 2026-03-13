import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { MEDIA } from './constants/index'

const iconLink = document.querySelector("link[rel='icon']") || document.createElement('link')
iconLink.setAttribute('rel', 'icon')
iconLink.setAttribute('type', 'image/png')
iconLink.setAttribute('href', MEDIA.favicon || MEDIA.diamond)
if (!iconLink.parentNode) {
  document.head.appendChild(iconLink)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
