// CRITICAL: Import React first and make it globally available immediately
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

// NUCLEAR: Make React available everywhere before any other imports
(window as any).React = React;
(window as any).ReactDOM = ReactDOM;
(globalThis as any).React = React;
(globalThis as any).ReactDOM = ReactDOM;

// Force React to be available at module load time
if (typeof global !== 'undefined') {
  (global as any).React = React;
  (global as any).ReactDOM = ReactDOM;
}

import { HeroUIProvider } from '@heroui/react';
import App from './app/app';
import './index.css';

// Debug info for production
console.log('🚀 BetweenDeals App starting...');
console.log('Environment:', import.meta.env.MODE);
console.log('Build timestamp:', new Date().toISOString());

// Simple error boundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('🚨 React Error Boundary caught error:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 React Error Details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
          <h1>🚨 Something went wrong</h1>
          <p>Please check the browser console for error details.</p>
          <p>Environment: {import.meta.env.MODE}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
