<script lang="ts">
	const skills = [
		'Conceptual & hands-on understanding of motor calibration',
		'Visualizing and bringing to reality bimanual systems that function intuitively in settings spanning material science labs and robotics workspaces',
		'Clearly documenting and communicating criteria for success with the team',
		'Iterating upon design of bimanual setup to optimize ergonomics of bimanual arm setup',
		'Training ACT policy to perform a simple MSE task'
	];
</script>

<section class="so101-skills-box so101-text-box">
	<h3>SKILLS GAINED</h3>
	<ul>
		{#each skills as skill}
			<li>
				<span class="skill-star-badge" aria-hidden="true">
					<svg viewBox="0 0 24 24" focusable="false">
						<path
							d="M12.2 2.9 L14.9 8.5 L21 9.1 L16.4 13.1 L17.8 19.4 L12.1 16.2 L6.7 20.1 L7.7 13.5 L3 9.3 L9.2 8.4 Z"
						/>
					</svg>
				</span>
				<span>{skill}</span>
			</li>
		{/each}
	</ul>
</section>
