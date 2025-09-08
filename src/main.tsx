import React from 'react';
import ReactDOM from 'react-dom/client';

// Import CSS first to ensure proper loading order
import './index.css';

// Then import the app
import { App } from './app/app';

// Ensure DOM is ready and create root
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

// Create root and render app
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
