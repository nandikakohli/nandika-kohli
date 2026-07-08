<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="home-bg-wrap" aria-hidden="true">
	<div class="home-bg-container">
		<img
			class="home-bg-image"
			src="{base}/updated%20background.jpeg"
			alt=""
			width="1600"
			height="1237"
			decoding="async"
			fetchpriority="low"
		/>
	</div>
</div>

<style>
	.home-bg-wrap {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		height: 100dvh;
		z-index: 1;
		pointer-events: none;
		overflow: hidden;
		background-color: #fafaf5;
	}

	.home-bg-container {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	.home-bg-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		min-width: 100%;
		min-height: 100%;
		object-fit: cover;
		object-position: center 30%;
		opacity: 1;
		border: none;
		border-radius: 0;
	}
</style>
