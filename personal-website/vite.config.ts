import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for GitHub Pages project site
// The base must match the repository name so assets resolve under /<repo>/
export default defineConfig({
  plugins: [react()],
  base: '/nandika-kohli/',
  build: {
    minify: 'esbuild', // Fastest minifier
    cssMinify: 'esbuild', // Fastest CSS minifier
    sourcemap: false, // Disable sourcemaps for faster builds
    reportCompressedSize: false, // Skip size reporting for speed
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: undefined, // Disable code splitting for faster builds
        inlineDynamicImports: true, // Inline all chunks for faster builds
      },
      treeshake: {
        preset: 'smallest', // Aggressive tree-shaking
      },
    },
    target: 'esnext', // Skip transpilation for modern browsers
    cssCodeSplit: false, // Single CSS file
  },
  esbuild: {
    legalComments: 'none', // Remove all comments
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
});
