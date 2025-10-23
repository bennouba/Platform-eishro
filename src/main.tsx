// Main entry point for the React application
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <App />
)
