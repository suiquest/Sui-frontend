import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Providers } from './provider.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
  </React.StrictMode>,
)
