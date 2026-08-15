<script lang="ts">
	import ACTPlan from './ACTPlan.svelte';
	import IterationTimeline from './IterationTimeline.svelte';
	import SO101Model from './SO101Model.svelte';
	import SO101Overview from './SO101Overview.svelte';
	import TechnicalSkills from './TechnicalSkills.svelte';
	import TeleopVideo from './TeleopVideo.svelte';
</script>

<section class="year-group so101-section">
	<div class="so101-header-group">
		<h2>End to End SO-101 Robotic Arm Build and Control Policy</h2>
		<div class="so101-layout">
			<div class="so101-main-space">
				<SO101Overview />
				<IterationTimeline />
				<TeleopVideo />
				<ACTPlan />
			</div>
			<aside class="technical-skills-panel">
				<SO101Model />
				<TechnicalSkills />
			</aside>
		</div>
	</div>
</section>
