import { useEffect, useLayoutEffect } from 'react';

/**
 * SSR-safe useLayoutEffect hook
 * Uses useLayoutEffect on client, useEffect on server
 * This prevents "Cannot read properties of undefined (reading 'useLayoutEffect')" errors
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
