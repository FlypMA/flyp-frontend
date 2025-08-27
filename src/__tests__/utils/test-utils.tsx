import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

function render(ui: React.ReactElement, { route = '/' } = {}) {
  if (typeof window !== 'undefined') {
    window.history.pushState({}, 'Test page', route);
  }

  return rtlRender(ui, {
    wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
  });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
