// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   < StrictMode >
//     <App />
//   </ StrictMode >,
// )

import { BrowserRouter } from 'react-router-dom'
import ScrollManager from './scroll/ScrollManager.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ScrollManager />
    <App />
  </BrowserRouter>
)
