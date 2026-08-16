import { execFile } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import type { Plugin, ViteDevServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const execFileAsync = promisify(execFile);
const repoRoot = path.resolve(__dirname, '../..');

function localDesignPushPlugin(): Plugin {
	return {
		name: 'local-design-push',
		configureServer(server: ViteDevServer) {
			server.middlewares.use('/__local-design/push-to-remote', async (req, res) => {
				if (req.method !== 'POST') {
					res.statusCode = 405;
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({ message: 'Use POST to push changes.' }));
					return;
				}

				try {
					await execFileAsync('git', ['add', 'personal-website/svelte-website'], { cwd: repoRoot });

					try {
						await execFileAsync('git', ['diff', '--cached', '--quiet'], { cwd: repoRoot });
						res.setHeader('Content-Type', 'application/json');
						res.end(JSON.stringify({ message: 'No source changes to push.' }));
						return;
					} catch {
						// git diff --quiet exits with 1 when staged changes exist.
					}

					await execFileAsync('git', ['commit', '-m', 'Apply local website edits'], { cwd: repoRoot });
					await execFileAsync('git', ['push', 'origin', 'main'], { cwd: repoRoot });

					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({ message: 'Pushed to remote.' }));
				} catch (error) {
					const message = error instanceof Error ? error.message : 'Push failed.';
					res.statusCode = 500;
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({ message }));
				}
			});
		}
	};
}

export default defineConfig({
	plugins: [localDesignPushPlugin(), sveltekit()],
	server: {
		fs: {
			allow: [__dirname, path.resolve(__dirname, '../node_modules')],
		},
	},
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
