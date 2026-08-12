<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	const modelSrc = `${base}/3D models/So-101 arms.glb`;

	onMount(() => {
		import('@google/model-viewer');
	});
</script>

<div class="so101-model-anchor" aria-label="Interactive SO-101 robotic arm model">
	<model-viewer
		src={modelSrc}
		alt="Interactive 3D model of the SO-101 robotic arm"
		camera-controls
		disable-pan
		interaction-prompt="none"
		min-camera-orbit="auto auto 85%"
		max-camera-orbit="auto auto 130%"
		exposure="1"
		shadow-intensity="0"
	></model-viewer>
</div>
