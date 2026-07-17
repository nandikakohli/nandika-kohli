<script lang="ts">
	import { fade } from 'svelte/transition';
	import { base } from '$app/paths';

	interface CardState {
		id: string;
		x: number;
		y: number;
		width: number;
		height: number;
	}

	let editMode = true;
	let draggingId: string | null = null;
	let resizingId: string | null = null;
	let history: CardState[][] = [];
	let activeCard: CardState | null = null;
	let dragOffset = { x: 0, y: 0 };
	let startPointer = { x: 0, y: 0 };

	const initialCards: CardState[] = [
		{ id: 'card-1', x: 0, y: 0, width: 100, height: 120 },
		{ id: 'card-2', x: 0, y: 180, width: 100, height: 220 }
	];

	let cards = structuredClone(initialCards);

	function handleImageError(e: Event) {
		const target = e.target as HTMLImageElement;
		target.src = `${base}/profile-backup.jpg`;
	}

	function getCardFontSize(width: number, height: number) {
		const base = Math.min(width, height);
		return Math.max(12, Math.min(22, Math.round(base / 8)));
	}

	function pushHistory() {
		history = [...history, structuredClone(cards)];
		if (history.length > 20) {
			history.shift();
		}
	}

	function undo() {
		if (history.length === 0) return;
		const previous = history[history.length - 1];
		cards = structuredClone(previous);
		history = history.slice(0, -1);
	}

	function redo() {
		if (history.length === 0) return;
		const next = history[history.length - 1];
		cards = structuredClone(next);
		history = history.slice(0, -1);
	}

	function beginDrag(cardId: string, event: MouseEvent) {
		if (!editMode) return;
		const card = cards.find((item) => item.id === cardId);
		if (!card) return;
		activeCard = card;
		draggingId = cardId;
		dragOffset = { x: event.clientX - card.x, y: event.clientY - card.y };
	}

	function beginResize(cardId: string, event: MouseEvent) {
		if (!editMode) return;
		const card = cards.find((item) => item.id === cardId);
		if (!card) return;
		activeCard = card;
		resizingId = cardId;
		startPointer = { x: event.clientX, y: event.clientY };
	}

	function onPointerMove(event: MouseEvent) {
		if (!editMode || (!draggingId && !resizingId)) return;
		const card = cards.find((item) => item.id === (draggingId || resizingId));
		if (!card) return;
		if (draggingId) {
			card.x = event.clientX - dragOffset.x;
			card.y = event.clientY - dragOffset.y;
		}
		if (resizingId) {
			card.width = Math.max(180, card.width + event.clientX - startPointer.x);
			card.height = Math.max(120, card.height + event.clientY - startPointer.y);
			startPointer = { x: event.clientX, y: event.clientY };
		}
		cards = [...cards];
	}

	function stopInteraction() {
		draggingId = null;
		resizingId = null;
		activeCard = null;
	}

	function toggleEditMode() {
		editMode = !editMode;
		if (!editMode) {
			stopInteraction();
		}
	}

	function addCard() {
		pushHistory();
		cards = [...cards, { id: `card-${Date.now()}`, x: 0, y: cards.reduce((max, item) => Math.max(max, item.y + item.height + 20), 0), width: 100, height: 120 }];
	}

	function removeCard() {
		if (cards.length === 0) return;
		pushHistory();
		cards = cards.slice(0, -1);
	}
</script>

<svelte:window on:mousemove={onPointerMove} on:mouseup={stopInteraction} />

<div class="home-container">
	<div class="home-body">
		<div class="content">
			<div class="text-content" transition:fade={{ duration: 800, delay: 0 }}>
				<div class="editor-toolbar">
					<button class="editor-button" on:click={toggleEditMode}>{editMode ? 'Exit edit mode' : 'Enter edit mode'}</button>
					<button class="editor-button" on:click={undo} disabled={!history.length}>Undo</button>
					<button class="editor-button" on:click={redo}>Redo</button>
					<button class="editor-button" on:click={addCard}>Add card</button>
					<button class="editor-button" on:click={removeCard}>Remove card</button>
				</div>
				<h1 class="home-title">Hi I'm <span class="highlight">Nandika</span>!</h1>
				<div class="editable-canvas" class:edit-mode={editMode}>
					{#each cards as card}
						<section
							class="blurb editable-card"
							style={`transform: translate(${card.x}px, ${card.y}px); width: ${card.width}px; height: ${card.height}px; font-size: ${getCardFontSize(card.width, card.height)}px;`}
							on:mousedown={(e) => beginDrag(card.id, e)}
						>
							{#if editMode}
								<div class="card-handle" on:mousedown|stopPropagation={(e) => beginResize(card.id, e)}></div>
							{/if}
							{#if card.id === 'card-1'}
								<p>
									I’m a Computer Engineering undergrad at Tech focused on developing humanoid and
									surgical robots that improve the standard of care. I enjoy collaborating with
									multidisciplinary teams to design robotics systems that balance functionality,
									safety and real world needs.
								</p>
							{:else}
								<p>
									I believe meaningful progress in robotics comes from sustained effort, genuine curiosity,
									and optimism about the positive impact of robots. Respecting everything whether it be the
									people I have the opportunity to work with, the communities robots will impact or the
									butterflies that make me smile across campus is of utmost importance to me.
								</p>
							{/if}
						</section>
					{/each}
				</div>
			</div>
			<div class="photo-container">
				<img
					src="{base}/profile-new.jpeg"
					alt="Profile"
					class="profile-photo"
					on:error={handleImageError}
				/>
			</div>
		</div>
	</div>
</div>
