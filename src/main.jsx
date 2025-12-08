import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { DataProvider } from './context/DataContext'

// Initialize app
const initApp = () => {
  const container = document.getElementById('root');
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <DataProvider>
        <App />
      </DataProvider>
    </React.StrictMode>
  );

  // Register service worker if available
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').catch(() => {
        // Silent fallback
      });
    });
  }
};

// Initialize app
initApp();
