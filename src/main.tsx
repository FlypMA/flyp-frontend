import React from 'react';
import ReactDOM from 'react-dom/client';
import { HeroUIProvider } from '@heroui/react';
import App from './app/app';
import './index.css';

// CRITICAL: SSR-safe React setup for Vercel deployment
// This prevents useLayoutEffect errors during server-side rendering
if (typeof window !== 'undefined') {
  // Client-side: Ensure React is globally available
  if (!window.React) {
    window.React = React;
  }
} else {
  // Server-side: Provide SSR-safe React with useLayoutEffect fallback
  const ssrSafeReact = {
    ...React,
    useLayoutEffect: React.useEffect, // Fallback for SSR
  };
  (globalThis as any).React = ssrSafeReact;
}

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
