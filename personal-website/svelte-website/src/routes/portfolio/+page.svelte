<script lang="ts">
	const canvaViewUrl = 'https://www.canva.com/design/DAHTIwg1Mko/view';
	const canvaEmbedUrl = `${canvaViewUrl}?embed`;
</script>

<div class="page cv-container">
	<div class="cv-actions">
		<a
			class="download-btn"
			href={canvaViewUrl}
			target="_blank"
			rel="noreferrer"
			aria-label="Download Nandika Kohli portfolio from Canva"
		>
			Download Portfolio
		</a>
		<a
			class="view-btn"
			href={canvaViewUrl}
			target="_blank"
			rel="noreferrer"
			aria-label="Open Nandika Kohli portfolio in Canva"
		>
			Open Portfolio
		</a>
	</div>
	<div class="cv-embed">
		<iframe
			title="Nandika Kohli portfolio"
			src={canvaEmbedUrl}
			loading="lazy"
			allowfullscreen
		></iframe>
	</div>
</div>
