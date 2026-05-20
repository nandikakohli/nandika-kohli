<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	
	// Replace these with your image paths
	export let images: string[] = [];
	
	let currentIndex = 0;
	let isRotating = false;
	
	function next() {
		if (isRotating) return;
		isRotating = true;
		currentIndex = (currentIndex + 1) % images.length;
		setTimeout(() => { isRotating = false; }, 600);
	}
	
	function prev() {
		if (isRotating) return;
		isRotating = true;
		currentIndex = (currentIndex - 1 + images.length) % images.length;
		setTimeout(() => { isRotating = false; }, 600);
	}
	
	function goTo(index: number) {
		if (isRotating || index === currentIndex) return;
		isRotating = true;
		currentIndex = index;
		setTimeout(() => { isRotating = false; }, 600);
	}
	
	// Auto-rotate (optional - can be disabled)
	let autoRotate = false;
	let autoRotateInterval: ReturnType<typeof setInterval>;
	
	onMount(() => {
		if (autoRotate) {
			autoRotateInterval = setInterval(() => {
				next();
			}, 3000);
		}
		return () => {
			if (autoRotateInterval) clearInterval(autoRotateInterval);
		};
	});
</script>

<div class="carousel-container">
	<div class="carousel-wrapper">
		<div 
			class="carousel-track" 
			style="transform: rotateY({-currentIndex * (360 / images.length)}deg)"
		>
			{#each images as image, index}
				<div 
					class="carousel-item" 
					style="transform: rotateY({index * (360 / images.length)}deg) translateZ(400px)"
				>
					<img src="{base}/{image}" alt="Carousel image {index + 1}" />
				</div>
			{/each}
		</div>
	</div>
	
	<div class="carousel-controls">
		<button class="carousel-btn prev" on:click={prev} aria-label="Previous" disabled={isRotating}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
		<button class="carousel-btn next" on:click={next} aria-label="Next" disabled={isRotating}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
	</div>
	
	<div class="carousel-dots">
		{#each images as _, index}
			<button 
				class="dot {currentIndex === index ? 'active' : ''}" 
				on:click={() => goTo(index)}
				aria-label="Go to slide {index + 1}"
				disabled={isRotating}
			></button>
		{/each}
	</div>
</div>

<style>
	.carousel-container {
		position: relative;
		width: 100%;
		height: 600px;
		perspective: 1200px;
		margin: 4rem 0;
	}
	
	.carousel-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
	}
	
	.carousel-track {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.carousel-item {
		position: absolute;
		width: 300px;
		height: 400px;
		left: 50%;
		top: 50%;
		margin-left: -150px;
		margin-top: -200px;
		transform-style: preserve-3d;
		backface-visibility: hidden;
	}
	
	.carousel-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 12px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		transition: transform 0.3s ease;
	}
	
	.carousel-item:hover img {
		transform: scale(1.05);
	}
	
	.carousel-controls {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		display: flex;
		justify-content: space-between;
		pointer-events: none;
		padding: 0 2rem;
		z-index: 10;
	}
	
	.carousel-btn {
		pointer-events: all;
		background: rgba(255, 255, 255, 0.9);
		border: none;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		color: #333;
	}
	
	.carousel-btn:hover:not(:disabled) {
		background: rgba(255, 255, 255, 1);
		transform: scale(1.1);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
	}
	
	.carousel-btn:active:not(:disabled) {
		transform: scale(0.95);
	}
	
	.carousel-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	
	.carousel-dots {
		display: flex;
		justify-content: center;
		gap: 12px;
		margin-top: 2rem;
		z-index: 10;
		position: relative;
	}
	
	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.4);
		cursor: pointer;
		transition: all 0.3s ease;
		padding: 0;
	}
	
	.dot:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.6);
		transform: scale(1.2);
	}
	
	.dot.active {
		background: rgba(255, 255, 255, 0.9);
		width: 32px;
		border-radius: 6px;
	}
	
	.dot:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	
	@media (max-width: 768px) {
		.carousel-container {
			height: 400px;
		}
		
		.carousel-item {
			width: 200px;
			height: 300px;
			margin-left: -100px;
			margin-top: -150px;
		}
		
		.carousel-item {
			transform: rotateY(var(--rotate)) translateZ(250px) !important;
		}
	}
</style>
