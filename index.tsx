import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // We use a simple relative path './sw.js'.
    // The browser will automatically resolve this against the current document's origin.
    // This avoids the "origin mismatch" errors that happen when manually constructing URLs 
    // in preview environments where the editor URL (window.location) differs from the iframe URL.
    navigator.serviceWorker
      .register('./sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        // Note: In some strict preview/sandbox environments, Service Workers might still be blocked by security policies.
        // This is expected behavior in previews, but it will work correctly in a real production deployment.
        console.log('SW registration failed (this is normal in preview mode): ', registrationError);
      });
  });
}