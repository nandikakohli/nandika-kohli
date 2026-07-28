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
						I’m a Computer Engineering undergrad at Tech focused on developing humanoid and
						surgical robots that improve the standard of care. I enjoy collaborating with
						multidisciplinary teams to design robotics systems that balance functionality,
						safety and real world needs.
					</p>
				</section>
				<section class="blurb">
					<p>
						I believe meaningful progress in robotics comes from sustained effort, genuine curiosity,
						and optimism about the positive impact of robots. Respecting everything whether it be the
						people I have the opportunity to work with, the communities robots will impact or the
						butterflies that make me smile across campus is of utmost importance to me.
					</p>
					<p>
						I enjoy discussions that tackle difficult questions about the implications of technology
						or robotics and give me the opportunity to deeply reflect on such issues.
					</p>
					<p>
						Through leading large project teams, I’ve discovered how rewarding it is to build
						cultures centered on open discussion, mentorship, accountability, bold experimentation,
						and fun! I’m excited to bring this mindset to robotics safety and systems integration,
						connecting intelligent software, mechatronics systems, with intentional design to
						translate ambitious research into dependable technology that can be responsibly deployed
						in the real world.
					</p>
					<p>
						I approach problems from the top down: I define the desired outcomes and criteria for
						success clearly, identify the system level requirements, and communicate the timeline and
						tasks needed to bring solutions to reality.
					</p>
					<p>
						Outside of exploring robotics, I can be found drinking boba or rose green tea, collecting
						movie and TV recommendations, dancing, watching sunsets, or joking around and yapping
						with friends :)
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
