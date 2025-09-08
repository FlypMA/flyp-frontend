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
        // Enable Fast Refresh for development
        fastRefresh: isDevelopment,
        // Ensure React is properly handled in production
        jsxRuntime: 'automatic'
      }),
      tsconfigPaths(), // This plugin reads tsconfig.json paths and applies them to Vite
    ],
    define: {
      // Ensure global React is available for dependencies
      global: 'globalThis',
    },
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
      include: [
        '@supabase/supabase-js',
        '@heroui/react',
        '@heroui/theme',
        'react-icons',
        'react',
        'react-dom',
        'react-router-dom',
      ],
    },
    css: {
      postcss: './postcss.config.js',
      devSourcemap: isDevelopment,
      // Ensure CSS is properly processed and minified
      preprocessorOptions: {
        // Add any preprocessor options if needed
      },
      // Critical: Keep CSS code split disabled for reliable loading
      modules: false,
    },
    build: {
      outDir: 'build',
      sourcemap: isDevelopment ? 'inline' : false,
      target: 'es2020',
      assetsDir: 'assets',
      // CRITICAL: Disable CSS code splitting to prevent CSS loading issues
      cssCodeSplit: false,
      cssMinify: isProduction ? 'cssnano' : false,
      // Inline smaller assets, reference larger ones
      assetsInlineLimit: 4096,
      emptyOutDir: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        output: {
          // Ensure consistent file naming
          entryFileNames: isProduction ? 'assets/[name]-[hash].js' : 'assets/[name].js',
          chunkFileNames: isProduction ? 'assets/[name]-[hash].js' : 'assets/[name].js',
          assetFileNames: assetInfo => {
            // Special handling for CSS files to ensure they load properly
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return isProduction ? 'assets/styles-[hash].css' : 'assets/styles.css';
            }
            return isProduction ? 'assets/[name]-[hash].[ext]' : 'assets/[name].[ext]';
          },
          // Optimize chunk splitting for better loading
          manualChunks: isProduction
            ? id => {
                if (id.includes('node_modules')) {
                  if (id.includes('react') || id.includes('react-dom')) {
                    return 'react-vendor';
                  }
                  if (id.includes('@heroui') || id.includes('framer-motion')) {
                    return 'ui-vendor';
                  }
                  if (id.includes('react-icons') || id.includes('lucide-react')) {
                    return 'icons-vendor';
                  }
                  if (id.includes('axios') || id.includes('@supabase')) {
                    return 'api-vendor';
                  }
                  return 'vendor';
                }
              }
            : undefined,
        },
      },
      chunkSizeWarningLimit: 1500,
    },
    // Environment variable handling
    envPrefix: ['VITE_', 'REACT_APP_'],
  };
});
