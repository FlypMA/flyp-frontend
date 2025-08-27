import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';

// Mock browser APIs not available in Node
class MockTextEncoder {
  encode(input?: string): Uint8Array {
    return new Uint8Array(Buffer.from(input || ''));
  }
}

class MockTextDecoder {
  decode(input?: Uint8Array): string {
    return input ? Buffer.from(input).toString() : '';
  }
}

global.TextEncoder = MockTextEncoder as any;
global.TextDecoder = MockTextDecoder as any;

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock window.scrollTo
window.scrollTo = vi.fn((_x: number, _y: number) => {}) as any;

// Mock window.requestAnimationFrame
window.requestAnimationFrame = vi.fn(callback => setTimeout(callback, 0));

// Mock window.cancelAnimationFrame
window.cancelAnimationFrame = vi.fn(id => clearTimeout(id));

// Mock window.getComputedStyle
window.getComputedStyle = vi.fn(() => ({
  getPropertyValue: vi.fn(),
  cssText: '',
  length: 0,
  parentRule: null,
  getPropertyPriority: vi.fn(),
  getPropertyCSSValue: vi.fn(),
  item: vi.fn(),
  removeProperty: vi.fn(),
  setProperty: vi.fn(),
  [Symbol.iterator]: vi.fn(),
})) as any;

// Mock HTMLElement.prototype.scrollIntoView
HTMLElement.prototype.scrollIntoView = vi.fn();

// Setup custom matchers
expect.extend({
  toHaveBeenCalledWithMatch(received: any, expected: any) {
    const pass = this.equals(received.mock.calls[0][0], expected);
    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to have been called with ${expected}`
          : `expected ${received} to have been called with ${expected}`,
    };
  },
});
