<script lang="ts">
	import { fade } from 'svelte/transition';
	import { base } from '$app/paths';
	
	function handleImageError(e: Event) {
		const target = e.target as HTMLImageElement;
		target.src = `${base}/profile-backup.jpg`;
	}
</script>

<div class="home-container">
	<div class="content">
		<div class="text-content" transition:fade={{ duration: 800, delay: 0 }}>
			<h1>Hi I'm <span class="highlight">Nandika</span>!</h1>
			<section class="notice-box">
				<span class="notice-strong">Note:</span> This website is still being edited for style and readability. <span class="notice-em">Stay tuned for updates!</span>
			</section>
			<section class="blurb">
				<p>I'm an aspiring roboticist excited to create humanoids and surgical robots to improve medical treatment because I strongly believe that being healthy is a human right. I'm currently a computer engineering undergrad at Georgia Tech (graduating May 2029) who's always looking to learn and gain more well rounded and nuanced perspectives. Here's where my head is at right now: I believe consistent sustained effort is crucial to gaining the technical and interpersonal skills that will enable me to contribute to the robotics solutions I want to see in the world. Respecting everything whether it be the people I find myself lucky enough to call friends and mentors or the butterflies that I'm delighted to see every time I walk through Tech Square is a non-negotiable for me. Currently I approach problems with the aim of building or adopting systems to enable a certain objective. As someone who enjoys discussions I find that I am able to deepen my own understanding by constantly questioning and thinking through the various modalities of a problem. Outside of robotics or reading research I'm an avowed boba and rose green tea addict, I love to watch movies and TV shows (I also love recommendations, keep scrolling to learn more!), I enjoy dancing, I love to hang out with friends, yap and watch sunsets.</p>
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
