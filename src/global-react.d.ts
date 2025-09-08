// Global React types for third-party library compatibility
import * as React from 'react';

declare global {
  interface Window {
    React?: typeof React;
  }
}

export {};
