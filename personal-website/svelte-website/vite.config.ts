import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		minify: 'esbuild', // Fastest minifier
		cssMinify: 'esbuild', // Fastest CSS minifier
		sourcemap: false, // Disable sourcemaps for faster builds
		reportCompressedSize: false, // Skip size reporting
		target: 'esnext', // Skip transpilation for modern browsers
		cssCodeSplit: false, // Single CSS file
		rollupOptions: {
			output: {
				manualChunks: undefined, // Disable code splitting for faster builds
			},
		},
	},
	esbuild: {
		legalComments: 'none', // Remove all comments
		minifyIdentifiers: true,
		minifySyntax: true,
		minifyWhitespace: true,
	},
});
