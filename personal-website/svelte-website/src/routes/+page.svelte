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
					multidisciplinary teams to design robotics systems that balance hardware, software,
					usability, and real world needs.
				</p>
			</section>
			<section class="blurb">
				<p>
					Here's where my head is at right now: consistent sustained effort is crucial to gaining
					the technical and interpersonal skills that will enable me to contribute to the robotics
					solutions I want to see in the world. Respecting everything whether it be the people I
					find myself lucky enough to call friends and mentors or the butterflies that I'm delighted
					to see every time I walk through Tech Square is a non-negotiable for me.
				</p>
				<p>
					The perspective I bring to problems is starting by considering end outcomes, the context
					of the systems that surround the issue, planning to create a solution, and then
					collaborating to ensure solutions become reality. As someone who enjoys discussions I find
					that I'm able to deepen my understanding by constantly questioning and thinking through
					the various modalities of a problem.
				</p>
				<p>
					I'm also an avowed boba and rose green tea addict, love to watch movies and TV shows (I
					also love recommendations, keep scrolling to learn more!). I enjoy dancing, music (Tecca
					and Laufey specifically), love to hang out with friends, love beaches and seeing sunsets.
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
