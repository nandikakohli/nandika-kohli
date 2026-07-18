<script lang="ts">
	import { onMount } from 'svelte';
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';
	import * as THREE from 'three';
	
	let handRef: THREE.Mesh | undefined;
	let clock = new THREE.Clock();
	let animationId: number;
	
	onMount(() => {
		const animate = () => {
			if (handRef) {
				const elapsedTime = clock.getElapsedTime();
				handRef.rotation.z = Math.sin(elapsedTime * 2) * 0.3;
			}
			animationId = requestAnimationFrame(animate);
		};
		animate();
		
		return () => {
			if (animationId) cancelAnimationFrame(animationId);
		};
	});
</script>

<Canvas>
	<T.Group position={[0, 0, 0]}>
		<!-- Head -->
		<T.Mesh position={[0, 1.5, 0]} castShadow>
			<T.SphereGeometry args={[0.5, 32, 32]} />
			<T.MeshStandardMaterial color="#f3b3a6" />
		</T.Mesh>
		
		<!-- Body -->
		<T.Group position={[0, 0.5, 0]}>
			<!-- Upper body -->
			<T.Mesh position={[0, 0.25, 0]} castShadow>
				<T.BoxGeometry args={[0.8, 0.5, 0.4]} />
				<T.MeshStandardMaterial color="#fca88e" />
			</T.Mesh>
			
			<!-- Middle section - rotated 90 degrees -->
			<T.Mesh position={[0, -0.25, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
				<T.BoxGeometry args={[0.8, 0.5, 0.4]} />
				<T.MeshStandardMaterial color="#fca88e" />
			</T.Mesh>
			
			<!-- Arms -->
			<T.Group position={[0.4, 0, 0]}>
				<T.Mesh position={[0.3, 0, 0]} rotation={[0, 0, -0.5]} castShadow>
					<T.BoxGeometry args={[0.2, 0.7, 0.2]} />
					<T.MeshStandardMaterial color="#f3b3a6" />
				</T.Mesh>
			</T.Group>
			
			<T.Group position={[-0.4, 0, 0]}>
				<T.Mesh bind:ref={handRef} position={[-0.3, 0, 0]} rotation={[0, 0, 0.5]} castShadow>
					<T.BoxGeometry args={[0.2, 0.7, 0.2]} />
					<T.MeshStandardMaterial color="#f3b3a6" />
				</T.Mesh>
			</T.Group>
		</T.Group>
		
		<!-- Legs -->
		<T.Group position={[0, -0.8, 0]}>
			<T.Mesh position={[0.2, -0.5, 0]} castShadow>
				<T.BoxGeometry args={[0.2, 0.8, 0.2]} />
				<T.MeshStandardMaterial color="#2c3e50" />
			</T.Mesh>
			<T.Mesh position={[-0.2, -0.5, 0]} castShadow>
				<T.BoxGeometry args={[0.2, 0.8, 0.2]} />
				<T.MeshStandardMaterial color="#2c3e50" />
			</T.Mesh>
		</T.Group>
	</T.Group>
</Canvas>

