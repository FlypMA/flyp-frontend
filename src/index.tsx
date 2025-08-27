import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/app';
import reportWebVitals from './reportWebVitals';
import { HeroUIProvider } from '@heroui/react';
import ErrorBoundary from './app/components/ErrorBoundary';

console.log('🚀 Starting React application...');

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', event => {
  console.error('🚨 Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// Global error handler for JavaScript errors
window.addEventListener('error', event => {
  console.error('🚨 Global JavaScript error:', event.error);
});

console.log('🔍 Getting root element...');
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found!');
  throw new Error('Root element not found');
}

console.log('✅ Root element found, creating React root...');
const root = ReactDOM.createRoot(rootElement);

console.log('🎨 Rendering React app...');
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <HeroUIProvider locale="en-US" disableAnimation={false}>
        <App />
      </HeroUIProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

console.log('✅ React app rendered');

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
