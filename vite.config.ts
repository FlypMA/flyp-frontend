import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';

  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
      tsconfigPaths(),
    ],
    server: {
      port: 3000,
      host: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@app': path.resolve(__dirname, './src/app'),
        '@features': path.resolve(__dirname, './src/features'),
        '@shared': path.resolve(__dirname, './src/shared'),
        '@config': path.resolve(__dirname, './src/config'),
      },
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react-router-dom',
        '@supabase/supabase-js',
        '@heroui/react',
        '@heroui/theme',
        'react-icons',
      ],
    },
    css: {
      postcss: './postcss.config.js',
      devSourcemap: isDevelopment,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      target: 'es2020',
      assetsDir: 'assets',
      assetsInlineLimit: 4096,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: undefined, // Let Vite handle chunking automatically
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
    envPrefix: ['VITE_', 'REACT_APP_'],
    define: {
      global: 'globalThis',
    },
  };
});
