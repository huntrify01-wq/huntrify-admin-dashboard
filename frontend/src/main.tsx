import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster position="bottom-right" />
  </StrictMode>,
)
