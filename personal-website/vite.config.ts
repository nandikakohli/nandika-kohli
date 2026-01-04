import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for GitHub Pages project site
// The base must match the repository name so assets resolve under /<repo>/
export default defineConfig({
  plugins: [react()],
  base: '/nandika-kohli/',
  build: {
    minify: 'esbuild', // Faster than terser
    cssMinify: true,
    sourcemap: false, // Disable sourcemaps for faster builds
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: undefined, // Disable code splitting for faster builds
      },
    },
  },
});
