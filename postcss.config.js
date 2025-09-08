export default {
  plugins: {
    tailwindcss: './tailwind.config.ts',
    autoprefixer: {
      flexbox: 'no-2009',
      grid: 'autoplace',
    },
    // Ensure CSS is minified and optimized in production
    ...(process.env.NODE_ENV === 'production'
      ? {
          cssnano: {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
                normalizeWhitespace: true,
                reduceIdents: false, // Keep class names intact for debugging
                zindex: false, // Don't optimize z-index values
              },
            ],
          },
        }
      : {}),
  },
};
