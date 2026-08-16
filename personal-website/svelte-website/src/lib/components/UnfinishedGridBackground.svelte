<script lang="ts">
	import { tick } from 'svelte';
	import { mountSketchBackground } from '@shared/sketchBackground';

	let canvas: HTMLCanvasElement | undefined;
	let container: HTMLDivElement | undefined;

	$effect(() => {
		const c = canvas;
		const el = container;
		if (!c || !el) return;

		let cleanup: (() => void) | undefined;
		let cancelled = false;

		void tick().then(() => {
			if (cancelled || !canvas || !container) return;
			cleanup = mountSketchBackground(canvas, container);
		});

		return () => {
			cancelled = true;
			cleanup?.();
		};
	});
</script>

<div class="grid-bg-wrap" bind:this={container}>
	<canvas class="grid-bg" bind:this={canvas} aria-hidden="true"></canvas>
</div>

<style>
	.grid-bg-wrap {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1;
		pointer-events: none;
		overflow: hidden;
		background: var(--background);
	}

	.grid-bg {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
