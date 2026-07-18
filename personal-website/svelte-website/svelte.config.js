import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGitHubPages ? '/nandika-kohli' : '';

const adapterOptions = {
	pages: 'build',
	assets: 'build',
	fallback: '404.html',
	precompress: false,
	strict: true
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		alias: {
			'@shared': '../shared',
		},
		adapter: adapter(adapterOptions),
		paths: {
			base: basePath
		}
	}
};

export default config;
