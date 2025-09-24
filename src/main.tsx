/**
 * 🚀 Main Entry Point - Upswitch MVP
 *
 * This is the application entry point that:
 * - Initializes the React application
 * - Sets up the UI framework (HeroUI)
 * - Provides development debugging information
 * - Handles application startup and rendering
 *
 * ARCHITECTURE:
 * - Uses the app shell from App.tsx (providers, routing, error boundaries)
 * - Integrates with HeroUI for component library
 * - Follows MVP principles with essential setup only
 * - Provides development debugging and environment info
 */

import { HeroUIProvider } from '@heroui/react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { logger } from './shared/utils/logger';

// 🚀 Development Debug Information
logger.info('🚀 Upswitch MVP starting...');
logger.info('Build time:', new Date().toISOString());
logger.info('App shell architecture initialized');

// 🎯 Application Initialization
const initializeApp = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    logger.error(
      '🚨 Root element not found! Make sure you have a div with id="root" in your HTML.'
    );
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    );

    logger.success('Application rendered successfully');
  } catch (error) {
    logger.error('🚨 Failed to render application:', error);

    // Fallback rendering for critical errors
    rootElement.innerHTML = `
      <div style="
        display: flex;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background-color: #f9fafb;
        font-family: system-ui, -apple-system, sans-serif;
      ">
        <div style="
          max-width: 28rem;
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        ">
          <h1 style="
            margin-bottom: 1rem;
            font-size: 1.5rem;
            font-weight: bold;
            color: #dc2626;
          ">🚨 Application Failed to Load</h1>
          <p style="
            margin-bottom: 1rem;
            color: #6b7280;
          ">The application encountered a critical error during initialization.</p>
          <button 
            onclick="window.location.reload()"
            style="
              background-color: #dc2626;
              color: white;
              padding: 0.5rem 1rem;
              border-radius: 0.375rem;
              border: none;
              cursor: pointer;
              font-weight: 500;
            "
            onmouseover="this.style.backgroundColor='#b91c1c'"
            onmouseout="this.style.backgroundColor='#dc2626'"
          >
            Reload Page
          </button>
        </div>
      </div>
    `;
  }
};

// Initialize the application
initializeApp();
