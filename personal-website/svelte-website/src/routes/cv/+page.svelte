<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="page cv-container">
	<div class="cv-actions">
		<a class="download-btn" href="{base}/Master%20Resume.docx.pdf" download>
			Download PDF
		</a>
		<a class="view-btn" href="{base}/Master%20Resume.docx.pdf" target="_blank" rel="noreferrer">
			Open in new tab
		</a>
	</div>
	<div class="cv-embed">
		<iframe title="CV" src="{base}/Master%20Resume.docx.pdf#toolbar=0" loading="lazy"></iframe>
	</div>
</div>

