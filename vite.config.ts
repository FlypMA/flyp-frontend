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
        // CRITICAL: Use classic runtime to prevent hook issues
        jsxRuntime: 'classic',
        jsxImportSource: undefined,
      }),
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
      dedupe: ['react', 'react-dom'], // Force single React instance
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
        'react/jsx-runtime',
        'react-dom/client',
      ],
      // Force React to be bundled correctly
      force: true,
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
        include: [/node_modules/],
        transformMixedEsModules: true,
      },
      rollupOptions: {
        // CRITICAL: Externalize React to prevent bundling issues
        external: isProduction ? [] : undefined,
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
          // NUCLEAR: Disable code splitting completely for React dependencies
          manualChunks: isProduction
            ? (id) => {
                // Keep React and React-DOM together in main bundle
                if (id.includes('react') || id.includes('react-dom')) {
                  return 'index';
                }
                // Group other vendors
                if (id.includes('node_modules')) {
                  if (id.includes('@heroui') || id.includes('framer-motion')) {
                    return 'ui-vendor';
                  }
                  return 'vendor';
                }
                // Everything else goes to main bundle
                return 'index';
              }
            : undefined,
          // Ensure globals are available
          globals: isProduction
            ? {}
            : {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
        },
      },
      chunkSizeWarningLimit: 1500,
    },
    // Environment variable handling
    envPrefix: ['VITE_', 'REACT_APP_'],
    // CRITICAL: Define globals for React to prevent useLayoutEffect errors
    define: {
      global: 'globalThis',
      // Make React available at compile time
      __DEV__: isDevelopment,
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };
});
