<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';
	import HomeBackground from '$lib/components/HomeBackground.svelte';
	import LocalDesignEditor from '$lib/components/LocalDesignEditor.svelte';

	$: normalizedPath = $page.url.pathname.replace(/\/$/, '');
	$: isHomePage = normalizedPath === base || normalizedPath === '';
	$: isProjectsPage = normalizedPath.endsWith('/projects');

	$: if (browser) {
		document.body.classList.toggle('home-route', isHomePage);
		document.body.classList.toggle('projects-route', isProjectsPage);
	}

	onDestroy(() => {
		if (browser) {
			document.body.classList.remove('home-route');
			document.body.classList.remove('projects-route');
		}
	});
</script>

{#if !isProjectsPage}
	<HomeBackground />
{/if}

<nav class="navbar">
	<div class="nav-content">
		<a href="{base}/" class="home-button" title="Back to Home">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</a>
		<a href="{base}/" class="logo" aria-label="Home"></a>
		<div class="nav-links">
			<!-- COMMENTED OUT: Robotics link
			<a href="{base}/robotics">Robotics</a>
			-->
			<a href="{base}/cv">CV</a>
			<a href="{base}/portfolio">Portfolio</a>
			<a href="{base}/projects">Projects</a>
			<!-- TEMPORARILY HIDDEN: Career Goals page
			<a href="{base}/career-goals">Career Goals</a>
			-->
			<!-- COMMENTED OUT: Interests Outside of Robotics link
			<a href="{base}/interests">Interests Outside of Robotics</a>
			-->
			<!-- TEMPORARILY HIDDEN: Credits, Thanks, and Acknowledgments page
			<a href="{base}/citations">Credits, Thanks, and Acknowledgments</a>
			-->
		</div>
	</div>
</nav>

<main>
	<slot />
</main>

<footer class="last-edited-box" aria-label="Last updated">
	<p>Website updated 2026.</p>
</footer>

<LocalDesignEditor />
