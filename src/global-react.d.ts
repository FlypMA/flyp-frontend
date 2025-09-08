// Global React types for third-party library compatibility and SSR
/* eslint-disable no-var, @typescript-eslint/no-unused-vars */
import * as React from 'react';

declare global {
  interface Window {
    React?: typeof React;
  }

  // Global React for server-side rendering
  // eslint-disable-next-line no-var
  var React: typeof import('react') | undefined;
}

export {};
