<script lang="ts">
	import { mockChats, type Chat } from '$lib/data';
	import { fade, slide } from 'svelte/transition';

	let selectedChatId = $state<string | null>(null);
	let newMessage = $state('');
	
	// Track chat state for mock interactivity
	let activeChats = $state([...mockChats]);

	const selectedChat = $derived(activeChats.find(c => c.id === selectedChatId));

	function sendMessage(e: Event) {
		e.preventDefault();
		if (newMessage.trim() && selectedChat) {
			selectedChat.messages.push({
				id: Math.random().toString(36).substr(2, 9),
				senderId: 'me',
				text: newMessage.trim(),
				timestamp: new Date()
			});
			selectedChat.lastMessage = newMessage.trim();
			newMessage = '';
		}
	}

	function selectChat(id: string) {
		selectedChatId = id;
	}

	function backToList() {
		selectedChatId = null;
	}
</script>

<div class="mx-auto max-w-5xl">
	{#if !selectedChatId}
		<!-- Liste des conversations -->
		<div class="space-y-6" in:fade>
			<header class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
				<h1 class="text-3xl font-black text-gray-900 sm:text-4xl">Messages</h1>
				<p class="text-gray-500 font-medium">Vous avez {activeChats.length} conversations actives.</p>
			</header>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
				{#each activeChats as chat}
					<button
						onclick={() => selectChat(chat.id)}
						class="flex items-center gap-4 w-full bg-white p-5 rounded-3xl shadow-sm border border-gray-100 transition-all hover:border-orange-orange/30 hover:shadow-md text-left group"
					>
						<div class="h-16 w-16 flex items-center justify-center rounded-full bg-gray-50 text-3xl border border-gray-100 group-hover:scale-105 transition-transform">
							{chat.participant.avatar}
						</div>
						<div class="flex-1 min-w-0">
							<div class="flex justify-between items-start mb-1">
								<h3 class="font-black text-gray-900 text-lg">{chat.participant.pseudo_anonyme}</h3>
								<span class="text-xs font-bold text-gray-400 uppercase tracking-tighter">
									{chat.messages.length > 0 ? new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(chat.messages[chat.messages.length - 1].timestamp) : ''}
								</span>
							</div>
							<p class="text-gray-500 font-medium truncate pr-4">{chat.lastMessage}</p>
						</div>
						<div class="text-orange-orange opacity-0 group-hover:opacity-100 transition-opacity">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</div>
					</button>
				{/each}
			</div>
		</div>
	{:else if selectedChat}
		<!-- Vue détaillée du chat -->
		<div class="flex flex-col h-[calc(100vh-140px)] bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden" in:slide={{ axis: 'x' }}>
			<!-- Header de chat -->
			<header class="flex items-center gap-4 bg-gray-50/50 px-6 py-4 border-b border-gray-100">
				<button 
					onclick={backToList}
					class="p-2 hover:bg-white rounded-full transition-colors"
					title="Retour"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<div class="h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-sm text-2xl border border-gray-100">
					{selectedChat.participant.avatar}
				</div>
				<div class="flex-1">
					<h2 class="font-bold text-gray-900 text-lg">{selectedChat.participant.pseudo_anonyme}</h2>
					<div class="flex items-center gap-1.5">
						<div class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
						<span class="text-xs text-gray-500 font-semibold uppercase tracking-wider">En ligne</span>
					</div>
				</div>
			</header>

			<!-- Zone des messages -->
			<div class="flex-1 overflow-y-auto p-6 space-y-4">
				{#each selectedChat.messages as msg}
					<div
						class="flex {msg.senderId === 'me' ? 'justify-end' : 'justify-start'}"
						in:fade={{ duration: 200 }}
					>
						<div class="flex flex-col {msg.senderId === 'me' ? 'items-end' : 'items-start'} max-w-[80%] sm:max-w-[70%]">
							<div
								class="rounded-2xl px-5 py-3 text-base font-medium shadow-sm {msg.senderId === 'me'
									? 'bg-orange-orange text-white rounded-tr-none'
									: 'bg-gray-100 text-gray-800 rounded-tl-none'}"
							>
								{msg.text}
							</div>
							<span class="mt-1 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
								{new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(msg.timestamp)}
							</span>
						</div>
					</div>
				{/each}
			</div>

			<!-- Input Zone -->
			<div class="p-4 bg-gray-50/50 border-t border-gray-100">
				<form
					onsubmit={sendMessage}
					class="flex items-center gap-3 bg-white p-2 pl-5 rounded-2xl shadow-sm border-2 border-transparent focus-within:border-orange-orange transition-all"
				>
					<input
						type="text"
						bind:value={newMessage}
						placeholder="Écrivez votre message..."
						class="flex-1 bg-transparent border-none outline-none py-2 text-gray-700 font-medium"
					/>
					<button
						type="submit"
						aria-label="Envoyer le message"
						title="Envoyer le message"
						class="h-12 w-12 flex items-center justify-center bg-black text-white rounded-xl active:scale-95 transition-all hover:bg-gray-800 disabled:opacity-50"
						disabled={!newMessage.trim()}
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
						</svg>
					</button>
				</form>
			</div>
		</div>
	{/if}
</div>
