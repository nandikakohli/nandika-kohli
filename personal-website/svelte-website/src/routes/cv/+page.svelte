<script lang="ts">
	import { base } from '$app/paths';

	const resumePath = `${base}/Nandika-Kohli-Resume.pdf`;
	const resumeFileName = 'Nandika Kohli Resume.pdf';
</script>

<div class="page cv-container">
	<div class="cv-actions">
		<a class="download-btn" href={resumePath} download={resumeFileName} aria-label="Download Nandika Kohli resume PDF">
			Download Resume
		</a>
		<a class="view-btn" href={resumePath} target="_blank" rel="noreferrer" aria-label="Open Nandika Kohli resume PDF in a new tab">
			Open Resume
		</a>
	</div>
	<div class="cv-embed">
		<iframe title="Nandika Kohli resume" src={`${resumePath}#toolbar=0`} loading="lazy"></iframe>
	</div>
</div>

