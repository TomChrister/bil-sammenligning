import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react';
import './index.css'
import App from './App.tsx'

if (new URLSearchParams(window.location.search).has("noanalytics")) {
  localStorage.setItem("va-disable", "1")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
    <Analytics
      beforeSend={(event) => {
        if (localStorage.getItem("va-disable")) return null;
        return event;
      }}/>
  </StrictMode>,
)
