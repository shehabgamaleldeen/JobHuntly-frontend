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
import AuthGate from './components/AxiosConfig/authGate.tsx'
import { SocketProvider } from './context/SocketContext.tsx'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollManager />
    <AuthGate>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthGate>
  </BrowserRouter>
);
