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
          manualChunks: {
            // Vendor chunks
            'vendor-react': ['react', 'react-dom', 'react-dom/client'],
            'vendor-router': ['react-router-dom'],
            'vendor-ui': ['@heroui/react', '@heroui/theme'],
            'vendor-supabase': ['@supabase/supabase-js'],
            'vendor-icons': ['react-icons'],
            'vendor-forms': ['final-form'],
            'vendor-motion': ['framer-motion'],
            'vendor-utils': ['axios', 'canvas-confetti'],
            // Feature chunks
            'feature-auth': [
              './src/features/phase1/authentication',
              './src/app/providers/auth-provider.tsx',
              './src/shared/services/auth',
            ],
            'feature-business': ['./src/features/phase1/business', './src/app/pages/business'],
            'feature-conversations': [
              './src/features/phase1/conversations',
              './src/app/pages/messages',
            ],
            'feature-transactions': [
              './src/shared/components/transaction',
              './src/shared/components/transaction-completion',
            ],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    envPrefix: ['VITE_', 'REACT_APP_'],
    define: {
      global: 'globalThis',
    },
  };
});
