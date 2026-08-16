<script lang="ts">
	import { browser } from '$app/environment';
	import { afterUpdate, onDestroy, onMount, tick } from 'svelte';

	const cardSelector = [
		'.so101-text-box',
		'.project-card',
		'.so101-iteration-card',
		'.simr-media-item',
		'.robots-grid-row',
		'.timeline-content',
		'.blurb'
	].join(',');

	const textSelector = 'h1, h2, h3, h4, p, li, figcaption, span, strong, em, a';
	const standaloneTextSelector = 'main h1, main h2, main h3';
	const storageKey = 'local-design-editor:v1';

	type SavedState = {
		cards: Record<string, { x: number; y: number; width?: number; height?: number }>;
		text: Record<string, string>;
	};

	let isLocal = false;
	let enabled = false;
	let message = '';
	let saveTimer: number | null = null;
	let cleanupFns: Array<() => void> = [];

	function defaultState(): SavedState {
		return { cards: {}, text: {} };
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
		cleanupFns.forEach((cleanup) => cleanup());
		cleanupFns = [];

		document.querySelectorAll('[data-design-card]').forEach((card) => {
			card.removeAttribute('data-design-card');
			card.removeAttribute('data-design-id');
			card.querySelector('.design-drag-handle')?.remove();
			card.querySelector('.design-resize-handle')?.remove();
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

	function makeCardDraggable(card: HTMLElement) {
		const handle = document.createElement('button');
		handle.type = 'button';
		handle.className = 'design-drag-handle';
		handle.textContent = 'Move';
		handle.title = 'Drag to move this card';
		card.append(handle);

		const onPointerDown = (event: PointerEvent) => {
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
		flash('Local edits reset. Refresh to restore original text.');
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
	});

	afterUpdate(() => {
		if (enabled) setupDesignMode();
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
{/if}
