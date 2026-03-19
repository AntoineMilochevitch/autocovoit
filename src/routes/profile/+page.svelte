<script lang="ts">
	import { currentUser } from '$lib/store';
	import type { NotificationSettings } from '$lib/store';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { slide } from 'svelte/transition';

	const avatars = ['👤', '🦊', '🐱', '🐼', '🐨', '🐯'];
	type NotificationChannelKey = keyof NotificationSettings['channels'];
	const notificationChannels: NotificationChannelKey[] = ['push', 'sms', 'email'];

	function saveProfile() {
		// Mock save
		goto(`${base}/`);
	}
</script>

<div class="space-y-10 pb-20">
	<header class="space-y-2">
		<h1 class="text-3xl font-black text-gray-900">Mon Profil Anonyme</h1>
		<p class="text-gray-500 font-medium">Configurez votre identité et vos préférences.</p>
	</header>

	<!-- Avatar & Pseudo Section -->
	<section class="space-y-4">
		<h2 class="text-sm font-black uppercase tracking-widest text-gray-400">Avatar & Pseudo</h2>
		<div class="flex flex-wrap gap-4">
			{#each avatars as avatar}
				<button
					onclick={() => currentUser.update((u) => ({ ...u, avatar }))}
					class="flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-all {$currentUser.avatar === avatar ? 'bg-orange-orange shadow-lg ring-4 ring-orange-orange/20 scale-110' : 'bg-gray-100 hover:bg-gray-200'}"
				>
					{avatar}
				</button>
			{/each}
		</div>
		<input
			type="text"
			bind:value={$currentUser.pseudo}
			placeholder="Votre pseudo"
			class="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 font-bold text-gray-900 outline-none focus:border-orange-orange focus:bg-white transition-all"
		/>
	</section>

	<!-- Trip Criteria Section -->
	<section class="space-y-6">
		<h2 class="text-sm font-black uppercase tracking-widest text-gray-400">Mes Critères de Voyage</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<label class="block space-y-2">
				<span class="text-sm font-bold text-gray-700 ml-1">Niveau de discussion</span>
				<select
					bind:value={$currentUser.criteria.chat}
					class="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 font-bold outline-none focus:border-orange-orange focus:bg-white transition-all appearance-none"
				>
					<option value="none">Silencieux</option>
					<option value="some">Un peu</option>
					<option value="very">Bavard</option>
				</select>
			</label>

			<label class="block space-y-2">
				<span class="text-sm font-bold text-gray-700 ml-1">Préférence musicale</span>
				<select
					bind:value={$currentUser.criteria.music}
					class="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 font-bold outline-none focus:border-orange-orange focus:bg-white transition-all appearance-none"
				>
					<option value="none">Pas de musique</option>
					<option value="quiet">Musique calme</option>
					<option value="rock">Rock</option>
					<option value="pop">Pop</option>
					<option value="any">Peu importe</option>
				</select>
			</label>

			<label class="block space-y-2">
				<span class="text-sm font-bold text-gray-700 ml-1">Ponctualité</span>
				<select
					bind:value={$currentUser.criteria.punctuality}
					class="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 font-bold outline-none focus:border-orange-orange focus:bg-white transition-all appearance-none"
				>
					<option value="relaxed">Détendu</option>
					<option value="on-time">À l'heure</option>
					<option value="early">En avance</option>
				</select>
			</label>

			<label class="block space-y-2">
				<span class="flex justify-between text-sm font-bold text-gray-700 ml-1">
					<span>Détour maximum</span>
					<span class="text-orange-orange">{$currentUser.criteria.maxDetour} min</span>
				</span>
				<div class="px-2 pt-4">
					<input
						type="range"
						min="0"
						max="30"
						step="5"
						bind:value={$currentUser.criteria.maxDetour}
						class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
					/>
				</div>
			</label>
		</div>
	</section>

	<!-- Notifications Section -->
	<section class="space-y-6 bg-gray-50 p-6 rounded-3xl border border-gray-100">
		<div class="flex items-center justify-between">
			<h2 class="text-sm font-black uppercase tracking-widest text-gray-400">Paramètres de Notifications</h2>
			<button
				onclick={() => currentUser.update(u => ({ ...u, notifications: { ...u.notifications, enabled: !u.notifications.enabled } }))}
				aria-label={$currentUser.notifications.enabled ? 'Desactiver les notifications' : 'Activer les notifications'}
				title={$currentUser.notifications.enabled ? 'Desactiver les notifications' : 'Activer les notifications'}
				class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors {$currentUser.notifications.enabled ? 'bg-orange-orange' : 'bg-gray-300'}"
			>
				<span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform {$currentUser.notifications.enabled ? 'translate-x-6' : 'translate-x-1'}"></span>
			</button>
		</div>

		{#if $currentUser.notifications.enabled}
			<div class="space-y-6" in:slide>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<label class="block space-y-2">
						<span class="text-sm font-bold text-gray-700">Fréquence des alertes</span>
						<select
							bind:value={$currentUser.notifications.frequency}
							class="w-full rounded-2xl border-2 border-gray-100 bg-white p-4 font-bold outline-none focus:border-orange-orange transition-all"
						>
							<option value="instant">Instantanée</option>
							<option value="daily">Résumé quotidien</option>
							<option value="weekly">Résumé hebdomadaire</option>
						</select>
					</label>

					<label class="block space-y-2">
						<span class="flex justify-between text-sm font-bold text-gray-700">
							<span>Max notifications / jour</span>
							<span class="text-orange-orange">{$currentUser.notifications.limitPerDay}</span>
						</span>
						<div class="px-2 pt-4">
							<input
								type="range"
								min="1"
								max="20"
								step="1"
								bind:value={$currentUser.notifications.limitPerDay}
								class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
							/>
						</div>
					</label>
				</div>

				<div class="space-y-3">
					<span class="text-sm font-bold text-gray-700">Canaux de réception</span>
					<div class="grid grid-cols-3 gap-3">
						{#each notificationChannels as channel}
							<button
								onclick={() => {
									const channels = { ...$currentUser.notifications.channels, [channel]: !$currentUser.notifications.channels[channel] };
									currentUser.update(u => ({ ...u, notifications: { ...u.notifications, channels } }));
								}}
								class="flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all {$currentUser.notifications.channels[channel] ? 'border-orange-orange bg-orange-orange/5 text-orange-orange' : 'border-gray-100 bg-white text-gray-400'}"
							>
								<span class="text-xs font-black uppercase tracking-widest">{channel}</span>
							</button>
						{/each}
					</div>
				</div>
			</div>
		{:else}
			<p class="text-sm font-medium text-gray-500 italic">
				Les notifications sont désactivées. Vous ne recevrez aucune alerte concernant vos trajets.
			</p>
		{/if}
	</section>

	<button
		onclick={saveProfile}
		class="w-full rounded-2xl bg-orange-orange py-5 text-lg font-black text-white shadow-xl shadow-orange-orange/20 transition-all hover:bg-orange-600 active:scale-95"
	>
		Enregistrer mon profil
	</button>
</div>

<style>
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 24px;
		height: 24px;
		background: #ff7900;
		cursor: pointer;
		border-radius: 50%;
		border: 4px solid white;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}
</style>
