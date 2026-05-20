const BASE_ALPHA = 0.34;
const LINE_WIDTH = 0.6;
const LINE_WIDTH_BOOST = 0.15;
const CURSOR_RADIUS = 120;
const CURSOR_BOOST = 0.5;
const LERP = 0.12;
const LINE_RGB = '72, 68, 108';

const MOTIF_W = 5.8;
const MOTIF_H = 5.8;
const PIVOT_GX = 1.45;
const PIVOT_GY = 1.35;

type Cell = [number, number];
type Seg = [number, number, number, number];
type DecorKind = 'flower-pink' | 'flower-orange' | 'butterfly' | 'star' | 'trail-up' | 'trail-right' | 'trail-mid' | 'trail-down';

type MotifBlueprint = {
	cells: Cell[];
	segments: Seg[];
	center?: Cell;
	decors: DecorKind[];
};

/** Hand-drawn family: same vocabulary, different layouts (not copy-paste). */
const BLUEPRINTS: MotifBlueprint[] = [
	{
		cells: [
			[0, 0],
			[1, 0],
			[0, 1],
			[1, 1],
			[2, 0],
			[2, 1],
			[0, 2]
		],
		segments: [
			[-1.35, 0, 0, 0],
			[0.5, 0, 0.5, -1.15],
			[3, 1.5, 4.6, 1.5],
			[1.5, 2, 1.5, 4.5]
		],
		center: [1, 1],
		decors: ['flower-pink', 'butterfly', 'flower-orange', 'star', 'trail-up', 'trail-right', 'trail-mid', 'trail-down']
	},
	{
		cells: [
			[0, 0],
			[1, 0],
			[0, 1],
			[1, 1],
			[0, 2],
			[1, 2],
			[2, 2]
		],
		segments: [
			[0.5, 2, 0.5, 4.2],
			[2, 2.5, 4.4, 2.5],
			[-1.1, 1, 0, 1],
			[1.5, -0.9, 1.5, 0]
		],
		center: [1, 1],
		decors: ['flower-pink', 'star', 'trail-down', 'trail-right', 'trail-mid']
	},
	{
		cells: [
			[0, 0],
			[1, 0],
			[2, 0],
			[0, 1],
			[1, 1],
			[0, 2]
		],
		segments: [
			[2, 0.5, 4.3, 0.5],
			[0, 2, 0, 3.8],
			[-1.2, 0.5, 0, 0.5],
			[1, -1, 1, 0]
		],
		center: [1, 1],
		decors: ['flower-orange', 'butterfly', 'trail-up', 'trail-right']
	},
	{
		cells: [
			[0, 0],
			[1, 0],
			[0, 1],
			[1, 1]
		],
		segments: [
			[2, 0, 3.6, 0],
			[0.5, 1, 0.5, 2.8],
			[-1, 0, 0, 0],
			[1, -0.85, 1, 0]
		],
		center: [1, 1],
		decors: ['star', 'trail-up', 'flower-pink']
	},
	{
		cells: [
			[1, 0],
			[2, 0],
			[1, 1],
			[2, 1],
			[1, 2],
			[2, 2]
		],
		segments: [
			[0.2, 1.5, -1.1, 1.5],
			[2.5, 2, 2.5, 4.1],
			[3.5, 0.5, 4.8, 0.5],
			[1.5, -1, 1.5, 0]
		],
		center: [2, 1],
		decors: ['flower-orange', 'trail-down', 'trail-mid', 'butterfly']
	},
	{
		cells: [
			[0, 0],
			[0, 1],
			[0, 2],
			[1, 1],
			[2, 1]
		],
		segments: [
			[-0.9, 1, 0, 1],
			[2, 1.5, 4.5, 1.5],
			[0.5, 2, 0.5, 3.9],
			[0, -0.8, 0, 0]
		],
		center: [0, 1],
		decors: ['trail-right', 'trail-down', 'flower-pink']
	},
	{
		cells: [
			[0, 0],
			[1, 0],
			[2, 0],
			[1, 1]
		],
		segments: [
			[2.5, 0.5, 4.2, 0.5],
			[0.5, 0, 0.5, -1.2],
			[1, 1, 1, 2.6]
		],
		decors: ['flower-orange', 'trail-up']
	},
	{
		cells: [
			[0, 1],
			[1, 1],
			[0, 2],
			[1, 2],
			[2, 2]
		],
		segments: [
			[1.5, 2, 1.5, 4.4],
			[-1, 1.5, 0, 1.5],
			[2.5, 2.5, 4, 2.5]
		],
		center: [1, 2],
		decors: ['butterfly', 'trail-down', 'star']
	}
];

/** Lone edges — stitch gaps between motifs. */
const BRIDGE_SEGMENTS: Seg[] = [
	[0.2, 0.5, 1.1, 0.5],
	[0.5, 0.15, 0.5, 0.95],
	[0.7, 0.4, 1.5, 0.4],
	[0.35, 0.65, 0.35, 1.4]
];

export function mountSketchBackground(
	canvas: HTMLCanvasElement,
	container: HTMLElement
) {
	let ctx: CanvasRenderingContext2D | null = null;
	let width = 0;
	let height = 0;
	let dpr = 1;

	let cursorX = -1000;
	let cursorY = -1000;
	let targetCursorX = -1000;
	let targetCursorY = -1000;
	let hasCursor = false;

	let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	let animationId = 0;

	let anchorX = 0;
	let anchorY = 0;
	let S = 48;

	function edgeFade(x: number, y: number): number {
		const margin = 40;
		const fx = Math.min(x / margin, (width - x) / margin, 1);
		const fy = Math.min(y / margin, (height - y) / margin, 1);
		return 0.58 + 0.42 * Math.min(fx, fy);
	}

	function smoothstep(t: number): number {
		const c = Math.max(0, Math.min(1, t));
		return c * c * (3 - 2 * c);
	}

	function cursorBoostAt(x: number, y: number): number {
		if (!hasCursor || reducedMotion) return 0;
		const dx = x - cursorX;
		const dy = y - cursorY;
		const dist = Math.sqrt(dx * dx + dy * dy);
		return smoothstep(1 - dist / CURSOR_RADIUS) * CURSOR_BOOST;
	}

	function transformGx(gx: number, flipX: boolean): number {
		return flipX ? PIVOT_GX * 2 - gx : gx;
	}

	function transformGy(gy: number, flipY: boolean): number {
		return flipY ? PIVOT_GY * 2 - gy : gy;
	}

	function pt(gx: number, gy: number, flipX: boolean, flipY: boolean) {
		return {
			x: anchorX + transformGx(gx, flipX) * S,
			y: anchorY + transformGy(gy, flipY) * S
		};
	}

	function drawLine(x1: number, y1: number, x2: number, y2: number) {
		if (!ctx) return;
		const mx = (x1 + x2) / 2;
		const my = (y1 + y2) / 2;
		if (mx < -50 || my < -50 || mx > width + 50 || my > height + 50) return;

		const fade = edgeFade(mx, my);
		if (fade <= 0) return;

		const boost = cursorBoostAt(mx, my);
		const alpha = BASE_ALPHA * fade * (1 + boost);

		ctx.strokeStyle = `rgba(${LINE_RGB}, ${alpha})`;
		ctx.lineWidth = LINE_WIDTH + boost * LINE_WIDTH_BOOST;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}

	function drawSeg(seg: Seg, flipX: boolean, flipY: boolean) {
		const a = pt(seg[0], seg[1], flipX, flipY);
		const b = pt(seg[2], seg[3], flipX, flipY);
		drawLine(a.x, a.y, b.x, b.y);
	}

	function drawCells(cells: Cell[], flipX: boolean, flipY: boolean) {
		for (const [gx, gy] of cells) {
			const p = pt(gx, gy, flipX, flipY);
			if (p.x + S < -10 || p.y + S < -10 || p.x > width + 10 || p.y > height + 10) continue;
			drawLine(p.x, p.y, p.x + S, p.y);
			drawLine(p.x + S, p.y, p.x + S, p.y + S);
			drawLine(p.x, p.y + S, p.x + S, p.y + S);
			drawLine(p.x, p.y, p.x, p.y + S);
		}
	}

	function drawCenter(cell: Cell, flipX: boolean, flipY: boolean) {
		if (!ctx) return;
		const c = pt(cell[0], cell[1], flipX, flipY);
		const fade = edgeFade(c.x, c.y);
		ctx.fillStyle = `rgba(${LINE_RGB}, ${BASE_ALPHA * 0.85 * fade})`;
		ctx.beginPath();
		ctx.arc(c.x, c.y, 3.5, 0, Math.PI * 2);
		ctx.fill();
	}

	function hexAlpha(hex: string, alpha: number): string {
		const h = hex.replace('#', '');
		return `rgba(${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}, ${alpha})`;
	}

	function drawDot(x: number, y: number, r: number, color: string, alpha = 0.85) {
		if (!ctx || x < -30 || y < -30 || x > width + 30 || y > height + 30) return;
		const fade = edgeFade(x, y);
		if (fade <= 0) return;
		ctx.fillStyle = hexAlpha(color, alpha * fade);
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI * 2);
		ctx.fill();
	}

	function trailPoint(
		t: number,
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		cx: number,
		cy: number
	) {
		const u = 1 - t;
		return {
			x: u * u * x1 + 2 * u * t * cx + t * t * x2,
			y: u * u * y1 + 2 * u * t * cy + t * t * y2
		};
	}

	function drawOrganicDotTrail(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		count: number,
		colors: string[],
		sizeBase: number,
		seed: number
	) {
		const mx = (x1 + x2) / 2;
		const my = (y1 + y2) / 2;
		const dx = x2 - x1;
		const dy = y2 - y1;
		const len = Math.hypot(dx, dy) || 1;
		const nx = -dy / len;
		const ny = dx / len;
		const bend = ((Math.abs(seed) % 23) - 11) * (0.35 + (Math.abs(seed >> 4) % 8) / 10);
		const cx = mx + nx * bend * (S * 0.35);
		const cy = my + ny * bend * (S * 0.35);

		const dotCount = count + (Math.abs(seed >> 6) % 5);
		for (let i = 0; i < dotCount; i++) {
			const h = seed ^ i * 374761393;
			if (Math.abs(h) % 6 === 0) continue;

			const t = (i + (Math.abs(h >> 3) % 10) / 20) / (dotCount - 0.5 || 1);
			if (t < 0 || t > 1) continue;

			const p = trailPoint(t, x1, y1, x2, y2, cx, cy);
			const wobble = (Math.abs(h >> 5) % 13) - 6;
			const x = p.x + nx * wobble * 0.55 + Math.sin(i * 2.3 + seed * 0.01) * 1.2;
			const y = p.y + ny * wobble * 0.55 + Math.cos(i * 1.9 + seed * 0.01) * 1.2;
			const r = sizeBase * (0.35 + (Math.abs(h >> 8) % 20) / 14);
			const color = colors[Math.abs(h >> 11) % colors.length];
			drawDot(x, y, r, color, 0.55 + (Math.abs(h >> 15) % 25) / 80);
		}
	}

	function drawPinkFlower(x: number, y: number) {
		if (!ctx || x < -40 || y < -40 || x > width + 40 || y > height + 40) return;
		const fade = edgeFade(x, y);
		ctx.save();
		ctx.globalAlpha = fade;
		ctx.fillStyle = '#5c3d6e';
		ctx.beginPath();
		ctx.arc(x, y, 5, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = '#f4a4c8';
		ctx.lineWidth = 2.2;
		ctx.lineCap = 'round';
		for (let i = 0; i < 8; i++) {
			const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
			ctx.beginPath();
			ctx.moveTo(x + Math.cos(a) * 6, y + Math.sin(a) * 6);
			ctx.quadraticCurveTo(
				x + Math.cos(a + 0.15) * 16,
				y + Math.sin(a + 0.15) * 16,
				x + Math.cos(a + 0.35) * 11,
				y + Math.sin(a + 0.35) * 11
			);
			ctx.stroke();
		}
		ctx.restore();
	}

	function drawOrangeFlower(x: number, y: number) {
		if (!ctx || x < -40 || y < -40 || x > width + 40 || y > height + 40) return;
		const fade = edgeFade(x, y);
		ctx.save();
		ctx.globalAlpha = fade;
		ctx.fillStyle = '#5c3d6e';
		ctx.beginPath();
		ctx.arc(x, y, 5, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = '#f0a060';
		ctx.lineWidth = 2.2;
		ctx.lineCap = 'round';
		for (let i = 0; i < 8; i++) {
			const a = (i / 8) * Math.PI * 2;
			ctx.beginPath();
			ctx.moveTo(x + Math.cos(a) * 5, y + Math.sin(a) * 5);
			ctx.quadraticCurveTo(
				x + Math.cos(a + 0.2) * 17,
				y + Math.sin(a + 0.2) * 15,
				x + Math.cos(a - 0.1) * 12,
				y + Math.sin(a - 0.1) * 12
			);
			ctx.stroke();
		}
		ctx.restore();
	}

	function drawButterfly(x: number, y: number, angle: number, scale: number) {
		if (!ctx || x < -60 || y < -60 || x > width + 60 || y > height + 60) return;
		const fade = edgeFade(x, y);
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(angle);
		ctx.scale(scale, scale);
		ctx.globalAlpha = fade;
		ctx.strokeStyle = '#8b4dc4';
		ctx.lineWidth = 2.6;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';

		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(0, 14);
		ctx.stroke();

		ctx.beginPath();
		ctx.ellipse(-14, -4, 12, 16, -0.35, 0, Math.PI * 2);
		ctx.stroke();
		ctx.beginPath();
		ctx.ellipse(14, -4, 12, 16, 0.35, 0, Math.PI * 2);
		ctx.stroke();
		ctx.beginPath();
		ctx.ellipse(-10, 10, 8, 11, -0.2, 0, Math.PI * 2);
		ctx.stroke();
		ctx.beginPath();
		ctx.ellipse(10, 10, 8, 11, 0.2, 0, Math.PI * 2);
		ctx.stroke();

		ctx.lineWidth = 1.4;
		ctx.beginPath();
		ctx.moveTo(-3, -12);
		ctx.lineTo(-6, -18);
		ctx.moveTo(3, -12);
		ctx.lineTo(6, -18);
		ctx.stroke();

		ctx.restore();
	}

	function drawPinkStar(x: number, y: number) {
		if (!ctx || x < -40 || y < -40 || x > width + 40 || y > height + 40) return;
		const fade = edgeFade(x, y);
		ctx.save();
		ctx.globalAlpha = fade;
		ctx.fillStyle = '#e88eb8';
		ctx.beginPath();
		for (let i = 0; i < 4; i++) {
			const outer = (i / 4) * Math.PI * 2 - Math.PI / 4;
			const inner = outer + Math.PI / 4;
			const ox = x + Math.cos(outer) * 10;
			const oy = y + Math.sin(outer) * 10;
			const ix = x + Math.cos(inner) * 4;
			const iy = y + Math.sin(inner) * 4;
			if (i === 0) ctx.moveTo(ox, oy);
			else ctx.lineTo(ox, oy);
			ctx.lineTo(ix, iy);
		}
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}

	function drawDecor(kind: DecorKind, flipX: boolean, flipY: boolean, seed: number) {
		switch (kind) {
			case 'trail-up': {
				const a = pt(0.5, 0, flipX, flipY);
				const b = pt(0.5, -1.15, flipX, flipY);
				drawOrganicDotTrail(a.x, a.y, b.x, b.y, 11, ['#c8b4e8', '#b8a0dc', '#d4c4f0', '#a890d0'], 2.8, seed);
				break;
			}
			case 'trail-right': {
				const a = pt(3, 0.15, flipX, flipY);
				const b = pt(3, 0.85, flipX, flipY);
				drawOrganicDotTrail(a.x, a.y, b.x, b.y, 8, ['#f4a4c8', '#7ec8c8', '#88d0d0', '#e8b0d0'], 2.6, seed + 1);
				break;
			}
			case 'trail-mid': {
				const a = pt(3, 1.15, flipX, flipY);
				const b = pt(3, 1.85, flipX, flipY);
				drawOrganicDotTrail(a.x, a.y, b.x, b.y, 8, ['#f4a4c8', '#9cc8e8', '#a8d8f0', '#d8a8c8'], 2.6, seed + 2);
				break;
			}
			case 'trail-down': {
				const a = pt(1.5, 2, flipX, flipY);
				const b = pt(1.5, 4.5, flipX, flipY);
				drawOrganicDotTrail(
					a.x,
					a.y,
					b.x,
					b.y,
					14,
					['#b83d78', '#5cb8a8', '#c84888', '#68c0b0', '#a03070'],
					3.1,
					seed + 3
				);
				break;
			}
			case 'flower-pink':
				drawPinkFlower(pt(0, 0, flipX, flipY).x - 8, pt(0, 0, flipX, flipY).y - 6);
				break;
			case 'flower-orange':
				drawOrangeFlower(pt(4.6, 1.5, flipX, flipY).x, pt(4.6, 1.5, flipX, flipY).y);
				break;
			case 'butterfly': {
				const p = pt(0, 2, flipX, flipY);
				const angle = ((Math.abs(seed) % 628) / 100) - Math.PI;
				const scale = 0.78 + (Math.abs(seed >> 9) % 35) / 100;
				drawButterfly(p.x + S * 0.35, p.y + S * 0.4, angle, scale);
				break;
			}
			case 'star':
				drawPinkStar(pt(1.85, 0.35, flipX, flipY).x, pt(1.85, 0.35, flipX, flipY).y);
				break;
		}
	}

	function drawBlueprint(bp: MotifBlueprint, flipX: boolean, flipY: boolean, decorMask: number, seed: number) {
		drawCells(bp.cells, flipX, flipY);
		for (const seg of bp.segments) drawSeg(seg, flipX, flipY);
		if (bp.center) drawCenter(bp.center, flipX, flipY);
		bp.decors.forEach((d, i) => {
			if ((decorMask >> i) & 1) drawDecor(d, flipX, flipY, seed + i * 97);
		});
	}

	function drawBridge(ax: number, ay: number, cellSize: number, seed: number) {
		anchorX = ax;
		anchorY = ay;
		S = cellSize;
		const count = 1 + (Math.abs(seed) % 3);
		for (let i = 0; i < count; i++) {
			const seg = BRIDGE_SEGMENTS[(Math.abs(seed >> 3) + i) % BRIDGE_SEGMENTS.length];
			const jx = ((Math.abs(seed >> (i + 5)) % 17) - 8) / 28;
			const jy = ((Math.abs(seed >> (i + 9)) % 17) - 8) / 28;
			drawSeg(
				[seg[0] + jx, seg[1] + jy, seg[2] + jx, seg[3] + jy],
				Math.abs(seed >> 1) % 2 === 0,
				Math.abs(seed >> 2) % 2 === 0
			);
		}
	}

	function tileHash(col: number, row: number): number {
		return col * 73856093 ^ row * 19349663 ^ 0x9e3779b9;
	}

	function drawOrganicField() {
		const baseS = Math.max(34, Math.min(50, Math.min(width, height) / 10.5));
		const pitchX = MOTIF_W * baseS * 0.92;
		const pitchY = MOTIF_H * baseS * 0.88;

		const cols = Math.ceil((width + pitchX * 1.2) / pitchX) + 2;
		const rows = Math.ceil((height + pitchY * 1.2) / pitchY) + 2;

		for (let row = -1; row < rows; row++) {
			for (let col = -1; col < cols; col++) {
				const h = tileHash(col, row);
				const roll = Math.abs(h);

				const jitterX = ((roll % 31) - 15) * (baseS / 44);
				const jitterY = (((roll >> 5) % 31) - 15) * (baseS / 44);
				const stagger = (row % 2) * pitchX * 0.38 + ((roll >> 10) % 5) * (baseS / 20);

				const ax = col * pitchX + stagger + jitterX - pitchX * 0.6;
				const ay = row * pitchY + jitterY - pitchY * 0.5;
				const localS = baseS * (0.9 + (roll % 17) / 85);

				anchorX = ax;
				anchorY = ay;
				S = localS;

				if (ax > width + pitchX || ay > height + pitchY) continue;
				if (ax + MOTIF_W * localS < -pitchX || ay + MOTIF_H * localS < -pitchY) continue;

				const mode = roll % 13;

				if (mode === 0) {
					drawBridge(ax + pitchX * 0.2, ay + pitchY * 0.15, localS * 0.95, h);
					continue;
				}

				const bp = BLUEPRINTS[roll % BLUEPRINTS.length];
				const flipX = (roll >> 4) % 3 !== 0;
				const flipY = (roll >> 6) % 4 === 0;

				let decorMask = 0xff;
				if ((roll >> 8) % 3 === 0) decorMask &= ~(1 << (roll % bp.decors.length));
				if ((roll >> 11) % 5 === 0) decorMask &= 0x2b;

				drawBlueprint(bp, flipX, flipY, decorMask, h);

				if ((roll >> 13) % 4 === 0) {
					drawBridge(ax + pitchX * 0.55, ay + pitchY * 0.4, localS * 0.7, h >> 1);
				}
			}
		}
	}

	function drawGridCell(px: number, py: number, size: number, seed: number) {
		if (py + size < height * 0.42 || py > height + size) return;
		const skip = Math.abs(seed) % 6;
		const x1 = px;
		const y1 = py;
		const x2 = px + size;
		const y2 = py + size;
		if (skip !== 1) drawLine(x1, y1, x2, y1);
		if (skip !== 2) drawLine(x2, y1, x2, y2);
		if (skip !== 3) drawLine(x1, y2, x2, y2);
		if (skip !== 4) drawLine(x1, y1, x1, y2);
	}

	function drawSpacedGridBand() {
		const bandTop = height * 0.46;
		const cellSize = Math.max(34, Math.min(50, Math.min(width, height) / 22));
		const pitch = cellSize * 2.65;

		const cols = Math.ceil((width + pitch) / pitch) + 2;
		const startRow = Math.floor(bandTop / pitch) - 1;
		const rowCount = Math.ceil((height - bandTop + pitch) / pitch) + 2;

		for (let row = startRow; row < startRow + rowCount; row++) {
			const offsetX = (row % 2) * pitch * 0.5;
			for (let col = -1; col < cols; col++) {
				const h = tileHash(col, row + 50000);
				const jitter = ((Math.abs(h) % 11) - 5) * (cellSize / 18);
				const px = col * pitch + offsetX + jitter;
				const py = row * pitch + (((Math.abs(h) >> 4) % 11) - 5) * (cellSize / 18);

				if (py + cellSize < bandTop - pitch * 0.5) continue;
				if (py > height + cellSize || px > width + cellSize || px + cellSize < -cellSize) continue;

				drawGridCell(px, py, cellSize, h);

				if (Math.abs(h) % 3 === 0) {
					drawGridCell(px + pitch * 0.52, py, cellSize * 0.95, h >> 1);
				}
				if (Math.abs(h) % 5 === 0) {
					drawGridCell(px, py + pitch * 0.52, cellSize * 0.95, h >> 2);
					drawGridCell(px + pitch * 0.52, py + pitch * 0.52, cellSize * 0.95, h >> 3);
				}
			}
		}
	}

	function drawGrid() {
		drawOrganicField();
		drawSpacedGridBand();
	}

	function drawFrame() {
		if (!ctx || width <= 0 || height <= 0) return;
		ctx.clearRect(0, 0, width, height);
		drawGrid();
	}

	function resize() {
		const rect = container.getBoundingClientRect();
		const w = rect.width > 2 ? rect.width : window.innerWidth;
		const h = rect.height > 2 ? rect.height : window.innerHeight;
		if (w < 2 || h < 2) return;

		dpr = Math.min(window.devicePixelRatio || 1, 2);
		width = w;
		height = h;

		canvas.width = Math.floor(width * dpr);
		canvas.height = Math.floor(height * dpr);
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		ctx = canvas.getContext('2d');
		if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

		drawFrame();
	}

	function tick() {
		if (!reducedMotion && hasCursor) {
			cursorX += (targetCursorX - cursorX) * LERP;
			cursorY += (targetCursorY - cursorY) * LERP;
		}
		drawFrame();
		animationId = requestAnimationFrame(tick);
	}

	function onPointerMove(clientX: number, clientY: number) {
		const rect = container.getBoundingClientRect();
		targetCursorX = clientX - rect.left;
		targetCursorY = clientY - rect.top;
		hasCursor = true;
	}

	const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	const onMotionChange = (e: MediaQueryListEvent) => {
		reducedMotion = e.matches;
		if (!reducedMotion && !animationId) animationId = requestAnimationFrame(tick);
		if (reducedMotion) {
			cancelAnimationFrame(animationId);
			animationId = 0;
			drawFrame();
		}
	};
	motionQuery.addEventListener('change', onMotionChange);

	const resizeObserver = new ResizeObserver(() => resize());
	resizeObserver.observe(container);
	window.addEventListener('resize', resize, { passive: true });
	window.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY), { passive: true });
	window.addEventListener('touchmove', (e) => {
		if (e.touches[0]) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
	}, { passive: true });

	requestAnimationFrame(() => {
		resize();
		requestAnimationFrame(resize);
	});

	if (reducedMotion) drawFrame();
	else animationId = requestAnimationFrame(tick);

	return () => {
		cancelAnimationFrame(animationId);
		resizeObserver.disconnect();
		window.removeEventListener('resize', resize);
		motionQuery.removeEventListener('change', onMotionChange);
	};
}
