import { useEffect, useRef } from 'react';
import { mountSketchBackground } from '@shared/sketchBackground';

export default function UnfinishedGridBackground() {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		const canvas = canvasRef.current;
		if (!container || !canvas) return;

		let cleanup: (() => void) | undefined;
		const frame = requestAnimationFrame(() => {
			if (containerRef.current && canvasRef.current) {
				cleanup = mountSketchBackground(canvasRef.current, containerRef.current);
			}
		});

		return () => {
			cancelAnimationFrame(frame);
			cleanup?.();
		};
	}, []);

	return (
		<div className="grid-bg-wrap" ref={containerRef} aria-hidden="true">
			<canvas className="grid-bg" ref={canvasRef} />
		</div>
	);
}
