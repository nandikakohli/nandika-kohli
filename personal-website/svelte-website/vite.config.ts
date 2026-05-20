import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@shared': path.resolve(__dirname, '../shared'),
		},
	},
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
