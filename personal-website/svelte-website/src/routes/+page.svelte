<script lang="ts">
	import { fade } from 'svelte/transition';
	import { base } from '$app/paths';
	
	function handleImageError(e: Event) {
		const target = e.target as HTMLImageElement;
		target.src = `${base}/profile-backup.jpg`;
	}
</script>

<div class="home-container">
	<div class="home-body">
		<div class="content">
		<div class="text-content" transition:fade={{ duration: 800, delay: 0 }}>
			<h1 class="home-title">Hi I'm <span class="highlight">Nandika</span>!</h1>
			<section class="blurb intro-blurb">
				<p>
					I’m a Computer Engineering undergrad at Tech interested in developing humanoid and
					surgical robots that improve the standard of care. I enjoy collaborating with
					multidisciplinary teams to design robotics systems that design, safety and real world
					needs.
				</p>
			</section>
		</div>
		<div class="photo-container">
			<img
				src="{base}/profile-new.jpeg"
				alt="Profile"
				class="profile-photo"
				on:error={handleImageError}
			/>
		</div>
	</div>
	</div>
</div>
