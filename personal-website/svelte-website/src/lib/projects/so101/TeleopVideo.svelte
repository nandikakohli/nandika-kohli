<script lang="ts">
	import { base } from '$app/paths';

	const teleopVideoSrc = `${base}/optimized/so101-teleop.mp4`;
	const teleopPosterSrc = `${base}/optimized/so101-teleop-poster.webp`;
</script>

<section class="so101-teleop" aria-label="SO-101 teleoperation demonstration">
	<h3>Videos of Teleoperation!</h3>
	<video class="teleop-video" controls playsinline preload="metadata" poster={teleopPosterSrc}>
		<source src={teleopVideoSrc} type="video/mp4" />
		Your browser does not support the video tag.
	</video>
</section>
