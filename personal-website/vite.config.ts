import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for GitHub Pages project site
// The base must match the repository name so assets resolve under /<repo>/
export default defineConfig({
  plugins: [react()],
  base: '/nandika-kohli/',
});
