<script lang="ts">
	import { onMount } from 'svelte';
	
	type Flower = {
		x: number;
		h: number;
		color: string;
		type?: 'lotus' | 'spike' | 'simple' | 'ghibli';
	};

	const flowers: Flower[] = [
		{ x: 6, h: 122, color: '#eaa0b1', type: 'ghibli' },
		{ x: 12, h: 148, color: '#f7c7a0', type: 'spike' },
		{ x: 19, h: 128, color: '#9a6aa1', type: 'simple' },
		{ x: 26, h: 168, color: '#f3d46b', type: 'spike' },
		{ x: 34, h: 138, color: '#e88ea4', type: 'lotus' },
		{ x: 41, h: 158, color: '#88d39a', type: 'simple' },
		{ x: 49, h: 120, color: '#f7b39a', type: 'ghibli' },
		{ x: 57, h: 150, color: '#8c5889', type: 'spike' },
		{ x: 65, h: 140, color: '#f3d46b', type: 'simple' },
		{ x: 73, h: 162, color: '#da7b91', type: 'ghibli' },
		{ x: 81, h: 130, color: '#7bc67b', type: 'simple' },
		{ x: 89, h: 144, color: '#fca88e', type: 'lotus' },
		{ x: 96, h: 136, color: '#a884c2', type: 'ghibli' },
	];

	function drawHead(f: Flower) {
		if (f.type === 'ghibli') {
			return `
				<g>
					<defs>
						<radialGradient id="core-${f.x}" cx="50%" cy="50%" r="60%">
							<stop offset="0%" stop-color="#ffe79a" />
							<stop offset="100%" stop-color="#ffd27a" />
						</radialGradient>
					</defs>
					<circle cx="0" cy="0" r="6.5" fill="${f.color}" opacity="0.25" />
					<ellipse cx="0" cy="-4" rx="4.8" ry="8.2" fill="${f.color}" stroke="rgba(0,0,0,0.08)" stroke-width="0.2" />
					<ellipse cx="4.2" cy="-1.5" rx="4.2" ry="7.0" fill="${f.color}" stroke="rgba(0,0,0,0.08)" stroke-width="0.2" transform="rotate(28)" />
					<ellipse cx="-4.2" cy="-1.5" rx="4.2" ry="7.0" fill="${f.color}" stroke="rgba(0,0,0,0.08)" stroke-width="0.2" transform="rotate(-28)" />
					<ellipse cx="0" cy="3.8" rx="5.0" ry="7.5" fill="${f.color}" stroke="rgba(0,0,0,0.08)" stroke-width="0.2" />
					<circle cx="0" cy="0" r="2.6" fill="url(#core-${f.x})" />
				</g>
			`;
		}
		if (f.type === 'lotus') {
			return `
				<g>
					<circle cx="0" cy="0" r="2.2" fill="#ffd27a" />
					<ellipse cx="0" cy="3.5" rx="4.8" ry="7.2" fill="${f.color}" opacity="0.7" />
					<ellipse cx="0" cy="0" rx="6.2" ry="9.2" fill="${f.color}" opacity="0.9" />
					<ellipse cx="0" cy="-2.2" rx="5.6" ry="8.6" fill="${f.color}" />
					<ellipse cx="-5" cy="0.5" rx="3.4" ry="7" fill="${f.color}" transform="rotate(-25)" />
					<ellipse cx="5" cy="0.5" rx="3.4" ry="7" fill="${f.color}" transform="rotate(25)" />
				</g>
			`;
		}
		if (f.type === 'spike') {
			return `
				<g>
					<rect x="-1.2" y="-16" width="2.4" height="18" rx="1.2" fill="${f.color}" />
					${Array.from({ length: 6 }).map((_, i) => `
						<ellipse
							cx="${i % 2 === 0 ? -2.4 : 2.4}"
							cy="${-14 + i * 3}"
							rx="2.6"
							ry="4.2"
							fill="${f.color}"
							opacity="${0.95 - i * 0.08}"
						/>
					`).join('')}
				</g>
			`;
		}
		return `
			<g>
				<circle cx="0" cy="0" r="2.2" fill="#ffd27a" />
				<ellipse cx="0" cy="-5" rx="2.5" ry="5.5" fill="${f.color}" />
				<ellipse cx="4.5" cy="-2" rx="2.2" ry="5.0" fill="${f.color}" transform="rotate(35)" />
				<ellipse cx="-4.5" cy="-2" rx="2.2" ry="5.0" fill="${f.color}" transform="rotate(-35)" />
				<ellipse cx="0" cy="4.5" rx="2.5" ry="5.5" fill="${f.color}" />
			</g>
		`;
	}

	let svgElement: SVGSVGElement;
	let animationFrame: number;
	
	onMount(() => {
		const animate = () => {
			if (svgElement) {
				// Animate flowers using CSS animations via inline styles
				// The actual animation will be handled by CSS keyframes
			}
			animationFrame = requestAnimationFrame(animate);
		};
		animate();
		
		return () => {
			if (animationFrame) cancelAnimationFrame(animationFrame);
		};
	});
</script>

<div class="flowers-garden" style="position: absolute; left: 0; right: 0; bottom: 0; width: 100vw; pointer-events: none; z-index: 0;">
	<svg bind:this={svgElement} viewBox="0 0 100 200" preserveAspectRatio="none" width="100vw" height="34vh">
		<defs>
			<linearGradient id="stem" x1="0" x2="0" y1="0" y2="1">
				<stop offset="0%" stop-color="#4a9158" />
				<stop offset="100%" stop-color="#2f6b3e" />
			</linearGradient>
			<linearGradient id="leafDark" x1="0" x2="0" y1="0" y2="1">
				<stop offset="0%" stop-color="#274e3b" />
				<stop offset="100%" stop-color="#1e3d2f" />
			</linearGradient>
			<linearGradient id="leafMid" x1="0" x2="0" y1="0" y2="1">
				<stop offset="0%" stop-color="#3e7759" />
				<stop offset="100%" stop-color="#2e5e45" />
			</linearGradient>
		</defs>
		
		<g class="foliage-animation" style="opacity: 0.9;">
			<rect x="-5" y="155" width="110" height="50" fill="url(#leafDark)" rx="3" />
			<path d="M0 180 C 10 160, 25 160, 35 180 C 45 195, 55 190, 65 178 C 78 162, 90 165, 100 180 L 100 205 L 0 205 Z" fill="url(#leafMid)" opacity="0.9" />
		</g>

		<g>
			<path d="M-5 200 L -5 165 C 5 158, 10 170, 15 180 C 18 186, 22 192, 25 200 Z" fill="#2e5e45" opacity="0.95" />
			<path d="M100 200 L 100 165 C 95 158, 92 170, 87 180 C 84 186, 80 192, 77 200 Z" fill="#2e5e45" opacity="0.95" />
		</g>

		{#each flowers as f, i}
			<g class="flower-stem" style="transform-origin: 50% 100%;">
				<g transform="translate({f.x}, 200)">
					<path d="M0 0 C -4 -{f.h * 0.3}, 4 -{f.h * 0.6}, 0 -{f.h}" stroke="url(#stem)" stroke-width="0.8" fill="none" />
					<g class="flower-head" style="transform: translate(0, -{f.h}px); transform-origin: 50% 50%;">
						{@html drawHead(f)}
					</g>
					<path d="M0 -{f.h * 0.6} C 6 -{f.h * 0.6 + 10}, 6 -{f.h * 0.6 + 26}, 0 -{f.h * 0.6 + 30}" fill="#6dbd7a" opacity="0.8" />
					<path d="M0 -{f.h * 0.35} C -6 -{f.h * 0.35 + 8}, -6 -{f.h * 0.35 + 22}, 0 -{f.h * 0.35 + 26}" fill="#6dbd7a" opacity="0.75" />
				</g>
			</g>
		{/each}

		<rect x="0" y="180" width="100" height="30" fill="#a6d8a8" opacity="0.55" />
		<rect x="0" y="190" width="100" height="20" fill="#8bcf91" opacity="0.8" />
	</svg>
</div>

<style>
	@keyframes flowerSway {
		0%, 100% { transform: rotate(0deg); }
		25% { transform: rotate(-2deg); }
		50% { transform: rotate(0deg); }
		75% { transform: rotate(2deg); }
	}
	
	@keyframes flowerHeadSway {
		0%, 100% { transform: rotate(0deg); }
		50% { transform: rotate(3deg); }
	}
	
	@keyframes foliageSway {
		0%, 100% { transform: translate(0, 0); }
		25% { transform: translate(-0.6px, -0.8px); }
		50% { transform: translate(0.6px, 0); }
	}
	
	.foliage-animation {
		animation: foliageSway 16s ease-in-out infinite;
	}
	
	.flower-stem {
		animation: flowerSway calc(6s + var(--delay, 0s)) ease-in-out infinite;
		animation-delay: calc(var(--index, 0) * 0.2s);
	}
	
	.flower-head {
		animation: flowerHeadSway calc(5s + var(--delay, 0s)) ease-in-out infinite;
		animation-delay: calc(var(--index, 0) * 0.15s);
	}
</style>

