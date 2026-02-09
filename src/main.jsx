import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { DataProvider } from './context/DataContext'

// Initialize app
const initApp = () => {
  // Disable Google Analytics for 'Admin' browsers
  // Run this command *once* in your console: localStorage.setItem('exclude_me', 'true')
  if (localStorage.getItem('exclude_me') === 'true') {
    window['ga-disable-G-MDDKBJRTXM'] = true;
    console.log('Google Analytics is DISABLED for this session (Admin Mode).');
  }

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
