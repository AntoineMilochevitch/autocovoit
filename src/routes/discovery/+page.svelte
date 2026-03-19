<script lang="ts">
	import { anonymousProfiles } from '$lib/data';
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	import { currentUser } from '$lib/store';
	import { slide, fade } from 'svelte/transition';
	import { base } from '$app/paths';
</script>

<div class="space-y-8 pb-24 lg:pb-10">
	<header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
		<div class="space-y-1">
			<h1 class="text-3xl font-black text-gray-900 sm:text-4xl">Découverte</h1>
			<p class="text-gray-500">Trajets similaires détectés sur votre itinéraire habituel.</p>
		</div>
		{#if $currentUser.visible}
			<a
				href="{base}/chat"
				class="hidden items-center justify-center gap-2 rounded-full bg-black px-6 py-3 font-bold text-white transition-all hover:bg-gray-800 active:scale-95 sm:flex"
			>
				<span>💬</span>
				Voir mes conversations
			</a>
		{/if}
	</header>

	{#if $currentUser.visible}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each anonymousProfiles as profile, i}
				<div in:slide={{ delay: i * 150 }}>
					<ProfileCard {profile} />
				</div>
			{/each}
		</div>

		<div class="mt-8 rounded-2xl bg-gray-100 p-8 text-center sm:p-12">
			<p class="mx-auto max-w-lg text-lg font-medium text-gray-500">
				D'autres profils seront affichés ici dès qu'ils seront détectés sur votre trajet Dijon ↔ Belfort.
			</p>
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center gap-6 py-20 text-center" in:fade>
			<div class="text-8xl">👻</div>
			<div class="max-w-md space-y-2">
				<h2 class="text-2xl font-bold">Vous êtes invisible</h2>
				<p class="text-gray-500">
					Activez la visibilité pour voir les profils des personnes voyageant avec vous et être mis en relation.
				</p>
			</div>
			<button
				onclick={() => currentUser.update((u) => ({ ...u, visible: true }))}
				class="rounded-2xl bg-black px-12 py-4 text-lg font-bold text-white transition-all hover:bg-gray-800 active:scale-95 shadow-xl"
			>
				Devenir visible
			</button>
			<a href="{base}/" class="font-bold text-gray-400 hover:text-gray-600">Retour à l'accueil</a>
		</div>
	{/if}

	{#if $currentUser.visible}
		<!-- Mobile Floating Button -->
		<div class="fixed bottom-6 left-1/2 w-full max-w-xs -translate-x-1/2 px-4 sm:hidden">
			<a
				href="{base}/chat"
				class="flex items-center justify-center gap-2 rounded-full bg-black py-4 font-bold text-white shadow-2xl transition-transform active:scale-95"
			>
				<span>💬</span>
				Voir mes conversations
			</a>
		</div>
	{/if}
</div>
