<script lang="ts">
	import { base } from '$app/paths';

	const teleopVideoSrc = `${base}/So-101%20arm%20video/So-101%20teleop%20arms.MOV`;
	const dataPlanPdfSrc = 'https://drive.google.com/file/d/19sUTu4fcFIfrGkvM1KtE1L0pCZwn65av/preview';

	let video: HTMLVideoElement;
	let playing = false;
	let currentTime = 0;
	let duration = 0;
	let showPdfModal = false;

	async function togglePlayback() {
		if (!video) return;

		if (video.paused) {
			await video.play();
		} else {
			video.pause();
		}
	}

	function formatTime(seconds: number) {
		if (!Number.isFinite(seconds)) return '0:00';
		const minutes = Math.floor(seconds / 60);
		const remainder = Math.floor(seconds % 60);
		return `${minutes}:${String(remainder).padStart(2, '0')}`;
	}

	function seek(event: Event) {
		if (!video) return;
		video.currentTime = Number((event.currentTarget as HTMLInputElement).value);
	}
</script>

<section class="so101-teleop" aria-label="SO-101 teleoperation demonstration">
	<h3>Videos of Teleoperation!</h3>
	<div class="teleop-media-row">
		<div class="teleop-video-frame" data-design-video-id="teleoperation-video">
			<video
				bind:this={video}
				class="teleop-video"
				playsinline
				preload="metadata"
				on:loadedmetadata={() => (duration = video.duration)}
				on:timeupdate={() => (currentTime = video.currentTime)}
				on:play={() => (playing = true)}
				on:pause={() => (playing = false)}
				on:ended={() => (playing = false)}
			>
				<source src={teleopVideoSrc} />
				Your browser does not support the video tag.
			</video>
			<div class="teleop-controls" aria-label="Video playback controls">
				<button
					type="button"
					class="teleop-control-button"
					aria-label={playing ? 'Pause teleoperation video' : 'Play teleoperation video'}
					on:click={togglePlayback}
				>
					{playing ? 'Pause' : 'Play'}
				</button>
				<input
					class="teleop-progress"
					type="range"
					min="0"
					max={duration || 0}
					step="0.01"
					value={currentTime}
					aria-label="Video progress"
					on:input={seek}
				/>
				<span class="teleop-time">{formatTime(currentTime)} / {formatTime(duration)}</span>
			</div>
		</div>

		<article class="teleop-pdf-panel" aria-label="Data collection plan PDF">
			<div class="teleop-pdf-header">
				<h4>Data Collection Plan</h4>
				<button
					type="button"
					class="teleop-pdf-icon-button"
					aria-label="Open larger view"
					title="Open larger view"
					on:click={() => (showPdfModal = true)}
				>
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path d="M15 3h6v6" />
						<path d="m21 3-7 7" />
						<path d="M9 21H3v-6" />
						<path d="m3 21 7-7" />
					</svg>
				</button>
			</div>
			<iframe
				class="teleop-pdf-frame"
				src={dataPlanPdfSrc}
				title="SO-101 data collection plan PDF"
				loading="lazy"
			></iframe>
		</article>
	</div>

	{#if showPdfModal}
		<div class="teleop-pdf-modal" role="dialog" aria-modal="true" aria-label="Data collection plan larger view">
			<div class="teleop-pdf-modal-card">
				<div class="teleop-pdf-modal-header">
					<h4>Data Collection Plan</h4>
					<button
						type="button"
						class="teleop-pdf-icon-button"
						aria-label="Return to smaller view"
						title="Return to smaller view"
						on:click={() => (showPdfModal = false)}
					>
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M8 3v5H3" />
							<path d="m3 8 6-6" />
							<path d="M16 21v-5h5" />
							<path d="m21 16-6 6" />
						</svg>
					</button>
				</div>
				<iframe
					class="teleop-pdf-modal-frame"
					src={dataPlanPdfSrc}
					title="SO-101 data collection plan PDF larger view"
				></iframe>
			</div>
			<button
				type="button"
				class="teleop-pdf-side-button"
				aria-label="Make data collection plan smaller"
				title="Make smaller"
				on:click={() => (showPdfModal = false)}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d="M8 3v5H3" />
					<path d="m3 8 6-6" />
					<path d="M16 21v-5h5" />
					<path d="m21 16-6 6" />
				</svg>
			</button>
		</div>
	{/if}
</section>
