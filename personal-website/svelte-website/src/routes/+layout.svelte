<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
</script>

<nav class="navbar">
	<div class="nav-content">
		<a href="/" class="home-button" title="Back to Home">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</a>
		<a href="/" class="logo" aria-label="Home"></a>
		<div class="nav-links">
			<a href="/robotics">Robotics</a>
			<a href="/cv">CV</a>
			<a href="/projects">Projects</a>
			<a href="/career-goals">Career Goals</a>
			<a href="/interests">Interests Outside of Robotics</a>
			<a href="/citations">Credits, Thanks, and Acknowledgments</a>
		</div>
	</div>
</nav>

<main>
	<slot />
</main>
