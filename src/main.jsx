import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Preload critical resources
const preloadResources = () => {
  // Add image preloading for critical images
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = '/noise.png';
      document.head.appendChild(preloadLink);
    });
  }
};

// Initialize app
const initApp = () => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  
  root.render(
    <React.StrictMode>
      <App />
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

// Start preloading
preloadResources();

// Initialize app
initApp();
