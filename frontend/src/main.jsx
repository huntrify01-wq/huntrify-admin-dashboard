import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactLenis } from 'lenis/react'
import { Toaster } from 'sonner'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactLenis root options={{ lerp: 0.02, duration: 2.5, smoothWheel: true, wheelMultiplier: 0.7, touchMultiplier: 1.5 }}>
      <App />
    </ReactLenis>
    <Toaster position="bottom-right" />
  </StrictMode>,
)
