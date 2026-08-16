<script lang="ts">
	import { base } from '$app/paths';

	const iterations = [
		{
			version: 'Iteration 1',
			image: `${base}/iteration_arms/iteration 1.jpeg`,
			alt: 'SO-101 hardware iteration 1'
		},
		{
			version: 'Iteration 2',
			image: `${base}/iteration_arms/iteration 2.jpg`,
			alt: 'SO-101 hardware iteration 2'
		},
		{
			version: 'Iteration 3',
			image: `${base}/iteration_arms/iteration 3.png`,
			alt: 'SO-101 hardware iteration 3'
		},
		{
			version: 'Iteration 4',
			image: `${base}/iteration_arms/iteration 4.jpeg`,
			alt: 'SO-101 hardware iteration 4'
		}
	];
</script>

<section class="so101-iterations" aria-label="SO-101 hardware setup iterations">
	<div class="so101-iteration-track">
		{#each iterations as iteration, index}
			<figure class="so101-iteration-card">
				{#if iteration.image}
					<img src={iteration.image} alt={iteration.alt} loading="lazy" />
				{:else}
					<div class="so101-iteration-missing" role="img" aria-label={iteration.alt}>
						Image needed
					</div>
				{/if}
				<figcaption>{iteration.version}</figcaption>
			</figure>
			{#if index < iterations.length - 1}
				<div class="so101-iteration-arrow" aria-hidden="true">-&gt;</div>
			{/if}
		{/each}
	</div>
</section>
