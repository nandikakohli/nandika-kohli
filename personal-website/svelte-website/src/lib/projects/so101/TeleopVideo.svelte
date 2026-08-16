<script lang="ts">
	import { base } from '$app/paths';

	const teleopVideoSrc = `${base}/So-101%20arm%20video/So-101%20teleop%20arms.MOV`;
</script>

<section class="so101-teleop" aria-label="SO-101 teleoperation demonstration">
	<h3>Videos of Teleoperation!</h3>
	<div class="teleop-video-crop" data-video-crop="left-half">
		<video class="teleop-video" controls playsinline preload="metadata">
			<source src={teleopVideoSrc} />
			Your browser does not support the video tag.
		</video>
	</div>
</section>
