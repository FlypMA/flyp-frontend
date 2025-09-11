import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // ✅ SIMPLIFIED ALIASES - Matching tsconfig.json exactly
    alias: {
      // Core app imports
      '@': path.resolve(__dirname, './src'),

      // Feature domains (simplified)
      '@auth': path.resolve(__dirname, './src/features/authentication'),
      '@marketplace': path.resolve(__dirname, './src/features/marketplace'),
      '@business': path.resolve(__dirname, './src/features/business-dashboard'),
      '@profile': path.resolve(__dirname, './src/features/user-profile'),
      '@messaging': path.resolve(__dirname, './src/features/messaging'),

      // Shared resources (simplified)
      '@shared': path.resolve(__dirname, './src/shared'),
      '@components': path.resolve(__dirname, './src/shared/components'),
      '@hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@stores': path.resolve(__dirname, './src/shared/stores'),
      '@services': path.resolve(__dirname, './src/shared/services'),
      '@utils': path.resolve(__dirname, './src/shared/utils'),
      '@types': path.resolve(__dirname, './src/shared/types'),

      // Assets & config
      '@assets': path.resolve(__dirname, './src/assets'),
      '@config': path.resolve(__dirname, './src/config'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    target: 'ES2020',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@heroui/react'],
          'router-vendor': ['react-router-dom'],
          stores: ['zustand'],
        },
      },
    },
  },
  define: {
    // Ensure environment variables are properly typed
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
});
