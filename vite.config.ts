import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // This plugin reads tsconfig.json paths and applies them to Vite
  ],
  server: {
    port: 3000,
    host: true, // Needed for proper WebSocket connection
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
  resolve: {
    alias: {
      // Explicit aliases for Vercel compatibility
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@components': path.resolve(__dirname, './src/app/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@hooks': path.resolve(__dirname, './src/app/hooks'),
      '@utils': path.resolve(__dirname, './src/app/utils'),
      '@services': path.resolve(__dirname, './src/app/services'),
      '@types': path.resolve(__dirname, './src/types'),
      '@constants': path.resolve(__dirname, './src/app/constants'),
      '@contexts': path.resolve(__dirname, './src/app/contexts'),
      '@pages': path.resolve(__dirname, './src/app/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@config': path.resolve(__dirname, './src/config'),
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['@supabase/supabase-js', '@heroui/react', '@heroui/theme', 'react-icons'],
  },
  css: {
    postcss: './postcss.config.js',
    devSourcemap: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
    assetsDir: 'assets',
    cssCodeSplit: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@heroui/react', '@heroui/theme', 'framer-motion'],
          icons: ['react-icons'],
          utils: ['axios', 'zustand'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
