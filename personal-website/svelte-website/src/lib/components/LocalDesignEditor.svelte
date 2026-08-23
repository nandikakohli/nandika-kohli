<script lang="ts">
	import { browser } from '$app/environment';
	import { afterUpdate, onDestroy, onMount, tick } from 'svelte';

	const cardSelector = [
		'.so101-text-box',
		'.project-card',
		'.so101-iteration-card',
		'.so101-teleop',
		'.simr-media-item',
		'.robots-grid-row',
		'.timeline-content',
		'.blurb'
	].join(',');

	const cropSelector = "[data-design-video-id='teleoperation-video']";
	const textSelector = 'h1, h2, h3, h4, p, li, figcaption, span, strong, a';
	const standaloneTextSelector = 'main h1, main h2, main h3';
	const storageKey = 'local-design-editor:v1';

	type SavedState = {
		cards: Record<string, { x: number; y: number; width?: number; height?: number }>;
		crops?: Record<string, ResponsiveCropConfig>;
		text: Record<string, string>;
	};

	type Breakpoint = 'desktop' | 'tablet' | 'mobile';
	type CropConfig = {
		fit: 'cover' | 'contain';
		positionX: number;
		positionY: number;
		zoom: number;
		aspectRatio: 'original' | '16/9' | '4/3' | '1/1' | 'free';
		width?: number;
		height?: number;
	};
	type ResponsiveCropConfig =
		| Partial<Record<Breakpoint, CropConfig>>
		| {
				x?: number;
				y?: number;
				scale?: number;
				fit?: 'cover' | 'contain';
				positionX?: number;
				positionY?: number;
				zoom?: number;
				aspectRatio?: CropConfig['aspectRatio'];
				width?: number;
				height?: number;
		  };
	type ActiveCrop = {
		target: HTMLElement;
		card: HTMLElement;
		id: string;
		breakpoint: Breakpoint;
		original: CropConfig;
	};

	const defaultCrop: CropConfig = {
		fit: 'cover',
		positionX: 50,
		positionY: 50,
		zoom: 1,
		aspectRatio: '16/9'
	};

	let isLocal = false;
	let enabled = false;
	let message = '';
	let activeCrop: ActiveCrop | null = null;
	let cropDraft: CropConfig = { ...defaultCrop };
	let cropHistory: CropConfig[] = [];
	let cropFuture: CropConfig[] = [];
	let saveTimer: number | null = null;
	let cleanupFns: Array<() => void> = [];
	let cropCleanupFns: Array<() => void> = [];

	function defaultState(): SavedState {
		return { cards: {}, crops: {}, text: {} };
	}

	function readState(): SavedState {
		if (!browser) return defaultState();

		try {
			return JSON.parse(localStorage.getItem(storageKey) ?? '') as SavedState;
		} catch {
			return defaultState();
		}
	}

	function writeState(state: SavedState) {
		localStorage.setItem(storageKey, JSON.stringify(state));
	}

	function getCardId(card: Element, index: number) {
		const className = Array.from(card.classList)
			.filter((className) => !className.startsWith('design-'))
			.join('.');
		return `${card.tagName.toLowerCase()}.${className}:${index}`;
	}

	function getTextId(node: Element, cardId: string, index: number) {
		const tag = node.tagName.toLowerCase();
		const className = Array.from(node.classList).join('.');
		return `${cardId}:${tag}.${className}:${index}`;
	}

	function getStandaloneTextId(node: Element, index: number) {
		const tag = node.tagName.toLowerCase();
		const className = Array.from(node.classList).join('.');
		const section = node.closest('section')?.className || node.closest('.page')?.className || 'main';
		return `standalone:${section}:${tag}.${className}:${index}`;
	}

	function cleanupDesignMode() {
		exitCropMode('cancel', false);
		cleanupFns.forEach((cleanup) => cleanup());
		cleanupFns = [];

		document.querySelectorAll('[data-design-card]').forEach((card) => {
			card.removeAttribute('data-design-card');
			card.removeAttribute('data-design-id');
			card.querySelector('.design-drag-handle')?.remove();
			card.querySelector('.design-resize-handle')?.remove();
			card.querySelector('.design-crop-mode-handle')?.remove();
		});

		document.querySelectorAll('[data-design-crop-target]').forEach((target) => {
			target.removeAttribute('data-design-crop-target');
			target.removeAttribute('data-design-crop-id');
			target.querySelector('.design-video-size-handle')?.remove();
			target.querySelector('.design-crop-mode-handle')?.remove();
		});

		document.querySelectorAll('[data-design-editable]').forEach((node) => {
			node.removeAttribute('data-design-editable');
			node.removeAttribute('contenteditable');
			node.removeAttribute('spellcheck');
			node.removeAttribute('data-design-text-id');
		});
	}

	function scheduleSave(card?: HTMLElement) {
		if (saveTimer) window.clearTimeout(saveTimer);

		saveTimer = window.setTimeout(() => {
			const state = readState();

			document.querySelectorAll<HTMLElement>('[data-design-card]').forEach((item) => {
				const id = item.dataset.designId;
				if (!id) return;

				const x = Number(item.dataset.designX ?? 0);
				const y = Number(item.dataset.designY ?? 0);
				const width = Number(item.dataset.designWidth || 0) || undefined;
				const height = Number(item.dataset.designHeight || 0) || undefined;
				state.cards[id] = { x, y, width, height };
			});

			document.querySelectorAll<HTMLElement>('[data-design-crop-target]').forEach((item) => {
				const id = item.dataset.designCropId;
				if (!id) return;

				const crop = getCropFromDataset(item);
				const breakpoint = getCurrentBreakpoint();
				state.crops ??= {};
				state.crops[id] = {
					...(isBreakpointCropState(state.crops[id]) ? state.crops[id] : {}),
					[breakpoint]: crop
				};
			});

			document.querySelectorAll<HTMLElement>('[data-design-text-id]').forEach((item) => {
				const id = item.dataset.designTextId;
				if (!id) return;
				state.text[id] = item.innerHTML;
			});

			writeState(state);
			if (card) flash('Saved locally');
		}, 180);
	}

	function flash(nextMessage: string) {
		message = nextMessage;
		window.setTimeout(() => {
			if (message === nextMessage) message = '';
		}, 1400);
	}

	function applyTransform(card: HTMLElement, x: number, y: number) {
		card.dataset.designX = String(Math.round(x));
		card.dataset.designY = String(Math.round(y));
		card.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
		card.style.position = card.style.position || 'relative';
		card.style.zIndex = x || y ? '3' : '';
	}

	function applySize(card: HTMLElement, width?: number, height?: number) {
		if (width) {
			card.dataset.designWidth = String(Math.round(width));
			card.style.width = `${Math.round(width)}px`;
			card.style.maxWidth = 'none';
		}

		if (height) {
			card.dataset.designHeight = String(Math.round(height));
			card.style.minHeight = `${Math.round(height)}px`;
		}
	}

	function getCropId(target: Element, cardId: string, index: number) {
		if (target instanceof HTMLElement && target.dataset.designVideoId) {
			return target.dataset.designVideoId;
		}

		const className = Array.from(target.classList).join('.');
		return `${cardId}:crop:${target.tagName.toLowerCase()}.${className}:${index}`;
	}

	function getCropMedia(target: HTMLElement) {
		return target.querySelector<HTMLElement>('video, img');
	}

	function clampNumber(value: number, min: number, max: number) {
		return Math.min(max, Math.max(min, value));
	}

	function getCurrentBreakpoint(): Breakpoint {
		if (!browser) return 'desktop';
		if (window.innerWidth < 768) return 'mobile';
		if (window.innerWidth < 1024) return 'tablet';
		return 'desktop';
	}

	function isBreakpointCropState(value: ResponsiveCropConfig | undefined): value is Partial<Record<Breakpoint, CropConfig>> {
		return Boolean(
			value &&
				('desktop' in value || 'tablet' in value || 'mobile' in value) &&
				!('positionX' in value) &&
				!('x' in value)
		);
	}

	function normalizeCrop(value: Partial<CropConfig> & { x?: number; y?: number; scale?: number } = {}): CropConfig {
		const crop: CropConfig = {
			fit: value.fit === 'contain' ? 'contain' : 'cover',
			positionX: clampNumber(Number(value.positionX ?? value.x ?? defaultCrop.positionX), 0, 100),
			positionY: clampNumber(Number(value.positionY ?? value.y ?? defaultCrop.positionY), 0, 100),
			zoom: clampNumber(Number(value.zoom ?? value.scale ?? defaultCrop.zoom), 1, 3),
			aspectRatio: value.aspectRatio ?? defaultCrop.aspectRatio
		};

		if (value.width) crop.width = Math.round(value.width);
		if (value.height) crop.height = Math.round(value.height);
		return crop;
	}

	function readCropForBreakpoint(state: SavedState, id: string, breakpoint = getCurrentBreakpoint()) {
		const saved = state.crops?.[id];
		if (!saved) return { ...defaultCrop };

		if (!isBreakpointCropState(saved)) {
			return normalizeCrop(saved);
		}

		if (breakpoint === 'mobile') {
			return normalizeCrop(saved.mobile ?? saved.tablet ?? saved.desktop ?? defaultCrop);
		}

		if (breakpoint === 'tablet') {
			return normalizeCrop(saved.tablet ?? saved.desktop ?? defaultCrop);
		}

		return normalizeCrop(saved.desktop ?? defaultCrop);
	}

	function saveCropForBreakpoint(id: string, breakpoint: Breakpoint, crop: CropConfig) {
		const state = readState();
		const saved = state.crops?.[id];
		state.crops ??= {};
		state.crops[id] = {
			...(isBreakpointCropState(saved) ? saved : {}),
			[breakpoint]: crop
		};
		writeState(state);
	}

	function getCropFromDataset(target: HTMLElement): CropConfig {
		return normalizeCrop({
			fit: target.dataset.designCropFit as CropConfig['fit'],
			positionX: Number(target.dataset.designCropPositionX ?? defaultCrop.positionX),
			positionY: Number(target.dataset.designCropPositionY ?? defaultCrop.positionY),
			zoom: Number(target.dataset.designCropZoom ?? defaultCrop.zoom),
			aspectRatio: target.dataset.designCropAspectRatio as CropConfig['aspectRatio'],
			width: Number(target.dataset.designVideoWidth || 0) || undefined,
			height: Number(target.dataset.designVideoHeight || 0) || undefined
		});
	}

	function writeCropDataset(target: HTMLElement, crop: CropConfig) {
		target.dataset.designCropFit = crop.fit;
		target.dataset.designCropPositionX = String(Math.round(crop.positionX));
		target.dataset.designCropPositionY = String(Math.round(crop.positionY));
		target.dataset.designCropZoom = String(Number(crop.zoom.toFixed(2)));
		target.dataset.designCropAspectRatio = crop.aspectRatio;
		if (crop.width) {
			target.dataset.designVideoWidth = String(Math.round(crop.width));
		} else {
			delete target.dataset.designVideoWidth;
		}

		if (crop.height) {
			target.dataset.designVideoHeight = String(Math.round(crop.height));
		} else {
			delete target.dataset.designVideoHeight;
		}
	}

	function applyCrop(target: HTMLElement, crop: CropConfig) {
		const media = getCropMedia(target);
		if (!media) return;

		const nextCrop = normalizeCrop(crop);
		writeCropDataset(target, nextCrop);
		media.style.objectFit = nextCrop.fit;
		media.style.objectPosition = `${Math.round(nextCrop.positionX)}% ${Math.round(nextCrop.positionY)}%`;
		media.style.transform = `scale(${nextCrop.zoom})`;
		media.style.transformOrigin = 'center center';

		if (nextCrop.aspectRatio === 'free') {
			target.style.aspectRatio = 'auto';
		} else if (nextCrop.aspectRatio === 'original') {
			target.style.aspectRatio = '';
		} else {
			target.style.aspectRatio = nextCrop.aspectRatio.replace('/', ' / ');
		}

		if (nextCrop.width) {
			target.style.width = `${nextCrop.width}px`;
			target.style.maxWidth = 'none';
		} else {
			target.style.width = '';
			target.style.maxWidth = '';
		}

		if (nextCrop.height) {
			target.style.height = `${nextCrop.height}px`;
		} else {
			target.style.height = '';
		}
	}

	function setCropDraft(nextCrop: CropConfig, addHistory = true) {
		if (!activeCrop) return;
		if (addHistory) {
			cropHistory = [...cropHistory, { ...cropDraft }];
			cropFuture = [];
		}

		cropDraft = normalizeCrop(nextCrop);
		applyCrop(activeCrop.target, cropDraft);
	}

	function makeCardDraggable(card: HTMLElement) {
		const handle = document.createElement('button');
		handle.type = 'button';
		handle.className = 'design-drag-handle';
		handle.textContent = 'Move';
		handle.title = 'Drag to move this card';
		card.append(handle);

		const onPointerDown = (event: PointerEvent) => {
			if (activeCrop) return;
			event.preventDefault();
			event.stopPropagation();

			const startX = event.clientX;
			const startY = event.clientY;
			const originX = Number(card.dataset.designX ?? 0);
			const originY = Number(card.dataset.designY ?? 0);

			card.classList.add('design-card-moving');
			handle.setPointerCapture(event.pointerId);

			const onPointerMove = (moveEvent: PointerEvent) => {
				applyTransform(card, originX + moveEvent.clientX - startX, originY + moveEvent.clientY - startY);
			};

			const onPointerUp = (upEvent: PointerEvent) => {
				handle.releasePointerCapture(upEvent.pointerId);
				handle.removeEventListener('pointermove', onPointerMove);
				handle.removeEventListener('pointerup', onPointerUp);
				card.classList.remove('design-card-moving');
				scheduleSave(card);
			};

			handle.addEventListener('pointermove', onPointerMove);
			handle.addEventListener('pointerup', onPointerUp);
		};

		handle.addEventListener('pointerdown', onPointerDown);
		cleanupFns.push(() => handle.removeEventListener('pointerdown', onPointerDown));
	}

	function makeCardResizable(card: HTMLElement) {
		const handle = document.createElement('button');
		handle.type = 'button';
		handle.className = 'design-resize-handle';
		handle.textContent = 'Resize';
		handle.title = 'Drag to resize this card';
		card.append(handle);

		const onPointerDown = (event: PointerEvent) => {
			if (activeCrop) return;
			event.preventDefault();
			event.stopPropagation();

			const rect = card.getBoundingClientRect();
			const startX = event.clientX;
			const startY = event.clientY;
			const startWidth = rect.width;
			const startHeight = rect.height;
			const minWidth = Math.min(160, startWidth);
			const minHeight = Math.min(90, startHeight);

			card.classList.add('design-card-resizing');
			handle.setPointerCapture(event.pointerId);

			const onPointerMove = (moveEvent: PointerEvent) => {
				const nextWidth = Math.max(minWidth, startWidth + moveEvent.clientX - startX);
				const nextHeight = Math.max(minHeight, startHeight + moveEvent.clientY - startY);
				applySize(card, nextWidth, nextHeight);
			};

			const onPointerUp = (upEvent: PointerEvent) => {
				handle.releasePointerCapture(upEvent.pointerId);
				handle.removeEventListener('pointermove', onPointerMove);
				handle.removeEventListener('pointerup', onPointerUp);
				card.classList.remove('design-card-resizing');
				scheduleSave(card);
			};

			handle.addEventListener('pointermove', onPointerMove);
			handle.addEventListener('pointerup', onPointerUp);
		};

		handle.addEventListener('pointerdown', onPointerDown);
		cleanupFns.push(() => handle.removeEventListener('pointerdown', onPointerDown));
	}

	function makeCropEditable(target: HTMLElement, cropId: string, state: SavedState, card: HTMLElement) {
		target.dataset.designCropTarget = 'true';
		target.dataset.designCropId = cropId;

		applyCrop(target, readCropForBreakpoint(state, cropId));

		const cropHandle = document.createElement('button');
		cropHandle.type = 'button';
		cropHandle.className = 'design-crop-mode-handle';
		cropHandle.textContent = 'Crop';
		cropHandle.title = 'Open crop controls for this video';
		target.append(cropHandle);

		const sizeHandle = document.createElement('button');
		sizeHandle.type = 'button';
		sizeHandle.className = 'design-video-size-handle';
		sizeHandle.textContent = 'Size';
		sizeHandle.title = 'Drag to resize this video frame';
		target.append(sizeHandle);

		const onCropPointerDown = (event: PointerEvent) => event.stopPropagation();
		const onCropClick = (event: MouseEvent) => {
			event.preventDefault();
			event.stopPropagation();
			enterCropMode(target, cropId, card);
		};

		const onSizePointerDown = (event: PointerEvent) => {
			if (activeCrop) return;
			event.preventDefault();
			event.stopPropagation();

			const rect = target.getBoundingClientRect();
			const startX = event.clientX;
			const startY = event.clientY;
			const startWidth = rect.width;
			const startHeight = rect.height;
			const minWidth = Math.min(220, startWidth);
			const minHeight = Math.min(124, startHeight);
			const originCrop = { ...getCropFromDataset(target), aspectRatio: 'free' as const };

			target.classList.add('design-video-resizing');
			sizeHandle.setPointerCapture(event.pointerId);
			applyCrop(target, originCrop);

			const onPointerMove = (moveEvent: PointerEvent) => {
				const nextCrop = normalizeCrop({
					...originCrop,
					width: Math.max(minWidth, startWidth + moveEvent.clientX - startX),
					height: Math.max(minHeight, startHeight + moveEvent.clientY - startY)
				});
				applyCrop(target, nextCrop);
			};

			const onPointerUp = (upEvent: PointerEvent) => {
				sizeHandle.releasePointerCapture(upEvent.pointerId);
				sizeHandle.removeEventListener('pointermove', onPointerMove);
				sizeHandle.removeEventListener('pointerup', onPointerUp);
				target.classList.remove('design-video-resizing');
				saveCropForBreakpoint(cropId, getCurrentBreakpoint(), getCropFromDataset(target));
				flash('Video size saved locally');
			};

			sizeHandle.addEventListener('pointermove', onPointerMove);
			sizeHandle.addEventListener('pointerup', onPointerUp);
		};

		const onFramePointerDown = (event: PointerEvent) => {
			if (
				activeCrop ||
				event.target instanceof HTMLButtonElement ||
				event.target instanceof HTMLInputElement ||
				(event.target instanceof HTMLElement && event.target.closest('.teleop-controls'))
			) {
				return;
			}
			event.preventDefault();
			event.stopPropagation();

			const rect = target.getBoundingClientRect();
			const startX = event.clientX;
			const startY = event.clientY;
			const originCrop = getCropFromDataset(target);
			let moved = false;

			target.classList.add('design-video-panning');
			target.setPointerCapture(event.pointerId);

			const onPointerMove = (moveEvent: PointerEvent) => {
				moved = true;
				applyCrop(
					target,
					normalizeCrop({
						...originCrop,
						positionX: originCrop.positionX - ((moveEvent.clientX - startX) / rect.width) * 100,
						positionY: originCrop.positionY - ((moveEvent.clientY - startY) / rect.height) * 100
					})
				);
			};

			const onPointerUp = (upEvent: PointerEvent) => {
				target.releasePointerCapture(upEvent.pointerId);
				target.removeEventListener('pointermove', onPointerMove);
				target.removeEventListener('pointerup', onPointerUp);
				target.classList.remove('design-video-panning');
				if (moved) {
					saveCropForBreakpoint(cropId, getCurrentBreakpoint(), getCropFromDataset(target));
					flash('Video framing saved locally');
				}
			};

			target.addEventListener('pointermove', onPointerMove);
			target.addEventListener('pointerup', onPointerUp);
		};

		cropHandle.addEventListener('pointerdown', onCropPointerDown);
		cropHandle.addEventListener('click', onCropClick);
		sizeHandle.addEventListener('pointerdown', onSizePointerDown);
		target.addEventListener('pointerdown', onFramePointerDown);
		cleanupFns.push(() => {
			cropHandle.removeEventListener('pointerdown', onCropPointerDown);
			cropHandle.removeEventListener('click', onCropClick);
			sizeHandle.removeEventListener('pointerdown', onSizePointerDown);
			target.removeEventListener('pointerdown', onFramePointerDown);
		});
	}

	function enterCropMode(target: HTMLElement, cropId: string, card: HTMLElement) {
		exitCropMode('cancel', false);

		const breakpoint = getCurrentBreakpoint();
		const original = readCropForBreakpoint(readState(), cropId, breakpoint);
		activeCrop = { target, card, id: cropId, breakpoint, original };
		cropDraft = { ...original };
		cropHistory = [];
		cropFuture = [];
		target.classList.add('design-crop-active');
		card.classList.add('design-card-cropping');
		applyCrop(target, cropDraft);

		const onPointerDown = (event: PointerEvent) => {
			if (!activeCrop || event.target instanceof HTMLButtonElement || event.target instanceof HTMLInputElement) {
				return;
			}

			event.preventDefault();
			event.stopPropagation();

			const rect = target.getBoundingClientRect();
			const startX = event.clientX;
			const startY = event.clientY;
			const origin = { ...cropDraft };
			let moved = false;

			target.classList.add('design-crop-editing');
			target.setPointerCapture(event.pointerId);

			const onPointerMove = (moveEvent: PointerEvent) => {
				moved = true;
				const nextCrop = normalizeCrop({
					...origin,
					positionX: origin.positionX - ((moveEvent.clientX - startX) / rect.width) * 100,
					positionY: origin.positionY - ((moveEvent.clientY - startY) / rect.height) * 100
				});
				cropDraft = nextCrop;
				applyCrop(target, nextCrop);
			};

			const onPointerUp = (upEvent: PointerEvent) => {
				target.releasePointerCapture(upEvent.pointerId);
				target.removeEventListener('pointermove', onPointerMove);
				target.removeEventListener('pointerup', onPointerUp);
				target.classList.remove('design-crop-editing');
				if (moved) {
					cropHistory = [...cropHistory, origin];
					cropFuture = [];
				}
			};

			target.addEventListener('pointermove', onPointerMove);
			target.addEventListener('pointerup', onPointerUp);
		};

		const onKeyDown = (event: KeyboardEvent) => {
			if (!activeCrop) return;

			if (event.key === 'Escape') {
				event.preventDefault();
				exitCropMode('cancel');
			}

			if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
				event.preventDefault();
				undoCrop();
			}

			if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') {
				event.preventDefault();
				redoCrop();
			}
		};

		target.addEventListener('pointerdown', onPointerDown);
		window.addEventListener('keydown', onKeyDown);
		cropCleanupFns.push(() => {
			target.removeEventListener('pointerdown', onPointerDown);
			window.removeEventListener('keydown', onKeyDown);
		});
		flash(`Cropping ${breakpoint} video`);
	}

	function undoCrop() {
		if (!activeCrop || cropHistory.length === 0) return;
		const previous = cropHistory[cropHistory.length - 1];
		cropHistory = cropHistory.slice(0, -1);
		cropFuture = [{ ...cropDraft }, ...cropFuture];
		cropDraft = { ...previous };
		applyCrop(activeCrop.target, cropDraft);
	}

	function redoCrop() {
		if (!activeCrop || cropFuture.length === 0) return;
		const next = cropFuture[0];
		cropFuture = cropFuture.slice(1);
		cropHistory = [...cropHistory, { ...cropDraft }];
		cropDraft = { ...next };
		applyCrop(activeCrop.target, cropDraft);
	}

	function exitCropMode(action: 'apply' | 'cancel', announce = true) {
		if (!activeCrop) return;

		if (action === 'apply') {
			saveCropForBreakpoint(activeCrop.id, activeCrop.breakpoint, cropDraft);
			if (announce) flash('Crop saved locally');
		} else {
			applyCrop(activeCrop.target, activeCrop.original);
			if (announce) flash('Crop canceled');
		}

		activeCrop.target.classList.remove('design-crop-active', 'design-crop-editing');
		activeCrop.card.classList.remove('design-card-cropping');
		cropCleanupFns.forEach((cleanup) => cleanup());
		cropCleanupFns = [];
		activeCrop = null;
		cropHistory = [];
		cropFuture = [];
	}

	function setupCropEditing(card: HTMLElement, cardId: string, state: SavedState) {
		const targets = Array.from(card.querySelectorAll<HTMLElement>(cropSelector));

		targets.forEach((target, index) => {
			makeCropEditable(target, getCropId(target, cardId, index), state, card);
		});
	}

	function makeTextEditable(node: HTMLElement, textId: string, state: SavedState, card?: HTMLElement) {
		node.dataset.designTextId = textId;
		node.dataset.designEditable = 'true';
		node.contentEditable = 'true';
		node.spellcheck = true;

		if (state.text[textId] !== undefined) {
			node.innerHTML = state.text[textId];
		}

		const onInput = () => scheduleSave(card);
		const onPointerDown = (event: PointerEvent) => event.stopPropagation();
		node.addEventListener('input', onInput);
		node.addEventListener('pointerdown', onPointerDown);
		cleanupFns.push(() => {
			node.removeEventListener('input', onInput);
			node.removeEventListener('pointerdown', onPointerDown);
		});
	}

	function setupTextEditing(card: HTMLElement, cardId: string, state: SavedState) {
		const candidates = Array.from(card.querySelectorAll<HTMLElement>(textSelector)).filter(
			(node) =>
				!node.closest('.design-drag-handle') &&
				!node.closest('.skill-star-badge') &&
				Boolean(node.textContent?.trim())
		);
		const textNodes = candidates.filter(
			(node) => !candidates.some((other) => other !== node && node.contains(other))
		);

		textNodes.forEach((node, index) => {
			const textId = getTextId(node, cardId, index);
			makeTextEditable(node, textId, state, card);
		});
	}

	function setupStandaloneTextEditing(state: SavedState) {
		const nodes = Array.from(document.querySelectorAll<HTMLElement>(standaloneTextSelector)).filter(
			(node) =>
				!node.closest('[data-design-card]') &&
				!node.closest('nav') &&
				!node.closest('.local-design-toolbar') &&
				Boolean(node.textContent?.trim())
		);

		nodes.forEach((node, index) => {
			makeTextEditable(node, getStandaloneTextId(node, index), state);
		});
	}

	function setupDesignMode() {
		if (!browser || !enabled) return;
		if (activeCrop) return;

		cleanupDesignMode();

		const state = readState();
		const cards = Array.from(document.querySelectorAll<HTMLElement>(cardSelector)).filter(
			(card) => !card.closest('nav') && !card.closest('.local-design-toolbar')
		);

		cards.forEach((card, index) => {
			const cardId = getCardId(card, index);
			const savedPosition = state.cards[cardId] ?? { x: 0, y: 0 };
			card.dataset.designCard = 'true';
			card.dataset.designId = cardId;
			applyTransform(card, savedPosition.x, savedPosition.y);
			applySize(card, savedPosition.width, savedPosition.height);
			makeCardDraggable(card);
			makeCardResizable(card);
			setupCropEditing(card, cardId, state);
			setupTextEditing(card, cardId, state);
		});

		setupStandaloneTextEditing(state);
	}

	async function toggleDesignMode() {
		enabled = !enabled;
		await tick();

		if (enabled) {
			setupDesignMode();
			flash('Design mode on');
		} else {
			cleanupDesignMode();
			flash('Design mode off');
		}
	}

	function resetDesignEdits() {
		localStorage.removeItem(storageKey);
		document.querySelectorAll<HTMLElement>('[data-design-card]').forEach((card) => {
			applyTransform(card, 0, 0);
			card.removeAttribute('data-design-width');
			card.removeAttribute('data-design-height');
			card.style.width = '';
			card.style.maxWidth = '';
			card.style.minHeight = '';
		});
		document.querySelectorAll<HTMLElement>('[data-design-crop-target]').forEach((target) => {
			applyCrop(target, defaultCrop);
		});
		flash('Local edits reset. Refresh to restore original text.');
	}

	function applySavedCrops() {
		if (!browser) return;
		const state = readState();
		const cards = Array.from(document.querySelectorAll<HTMLElement>(cardSelector)).filter(
			(card) => !card.closest('nav') && !card.closest('.local-design-toolbar')
		);

		cards.forEach((card, cardIndex) => {
			const cardId = getCardId(card, cardIndex);
			Array.from(card.querySelectorAll<HTMLElement>(cropSelector)).forEach((target, cropIndex) => {
				const cropId = getCropId(target, cardId, cropIndex);
				target.dataset.designCropId = cropId;
				applyCrop(target, readCropForBreakpoint(state, cropId));
			});
		});
	}

	async function copyDesignEdits() {
		const state = readState();
		const text = JSON.stringify(state, null, 2);

		try {
			await navigator.clipboard.writeText(text);
			flash('Copied local edits');
		} catch {
			flash('Copy failed. Open DevTools localStorage.');
		}
	}

	onMount(() => {
		if (!browser) return;

		isLocal = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
		applySavedCrops();
	});

	afterUpdate(() => {
		if (enabled && !activeCrop) setupDesignMode();
	});

	onDestroy(() => {
		if (saveTimer) window.clearTimeout(saveTimer);
		cleanupDesignMode();
	});
</script>

{#if isLocal}
	<div class="local-design-toolbar" aria-label="Local design editor">
		<button type="button" class:active={enabled} on:click={toggleDesignMode}>
			{enabled ? 'Design on' : 'Design'}
		</button>
		<button type="button" on:click={copyDesignEdits}>Copy edits</button>
		<button type="button" on:click={resetDesignEdits}>Reset local edits</button>
		{#if message}
			<span>{message}</span>
		{/if}
	</div>

	{#if activeCrop}
		<div class="local-crop-toolbar" aria-label="Crop video">
			<strong>CROP VIDEO</strong>
			<label>
				<span>Fit</span>
				<select
					value={cropDraft.fit}
					on:change={(event) =>
						setCropDraft({ ...cropDraft, fit: event.currentTarget.value as CropConfig['fit'] })}
				>
					<option value="cover">Fill</option>
					<option value="contain">Fit</option>
				</select>
			</label>
			<label>
				<span>Aspect</span>
				<select
					value={cropDraft.aspectRatio}
					on:change={(event) =>
						setCropDraft({
							...cropDraft,
							aspectRatio: event.currentTarget.value as CropConfig['aspectRatio']
						})}
				>
					<option value="original">Original</option>
					<option value="16/9">16:9</option>
					<option value="4/3">4:3</option>
					<option value="1/1">1:1</option>
					<option value="free">Free</option>
				</select>
			</label>
			<label class="local-crop-slider">
				<span>Zoom</span>
				<input
					type="range"
					min="1"
					max="3"
					step="0.05"
					value={cropDraft.zoom}
					on:input={(event) =>
						setCropDraft({ ...cropDraft, zoom: Number(event.currentTarget.value) })}
				/>
			</label>
			<div class="local-crop-actions">
				<button
					type="button"
					on:click={() =>
						setCropDraft({ ...defaultCrop, width: cropDraft.width, height: cropDraft.height })}
				>
					Reset
				</button>
				<button type="button" on:click={() => exitCropMode('cancel')}>Cancel</button>
				<button type="button" class="primary" on:click={() => exitCropMode('apply')}>Apply</button>
			</div>
		</div>
	{/if}
{/if}
