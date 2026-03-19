<script lang="ts">
	import { currentUser } from '$lib/store';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	const avatars = ['👤', '🦊', '🐱', '🐼', '🐨', '🐯'];

	function saveProfile() {
		// Mock save
		goto(`${base}/`);
	}
</script>

<div class="space-y-8 pb-10">
	<header class="space-y-2">
		<h1 class="text-3xl font-black text-gray-900">Mon Profil Anonyme</h1>
		<p class="text-gray-500">Personnalisez comment les autres vous voient.</p>
	</header>

	<section class="space-y-4">
		<h2 class="text-sm font-bold uppercase tracking-wider text-gray-400">Avatar & Pseudo</h2>
		<div class="flex flex-wrap gap-4">
			{#each avatars as avatar}
				<button
					onclick={() => currentUser.update((u) => ({ ...u, avatar }))}
					class="flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-all {$currentUser.avatar === avatar ? 'bg-[#FF7900] shadow-lg ring-4 ring-[#FF7900]/20' : 'bg-gray-100 hover:bg-gray-200'}"
				>
					{avatar}
				</button>
			{/each}
		</div>
		<input
			type="text"
			bind:value={$currentUser.pseudo}
			placeholder="Votre pseudo"
			class="w-full rounded-xl border-2 border-gray-100 bg-gray-50 p-4 font-semibold text-gray-900 outline-none focus:border-[#FF7900]"
		/>
	</section>

	<section class="space-y-6">
		<h2 class="text-sm font-bold uppercase tracking-wider text-gray-400">Mes Critères de Voyage</h2>

		<div class="space-y-4">
			<label class="block space-y-2">
				<span class="text-sm font-bold text-gray-700">Niveau de discussion</span>
				<select
					bind:value={$currentUser.criteria.chat}
					class="w-full rounded-xl border-2 border-gray-100 bg-gray-50 p-4 font-semibold outline-none focus:border-[#FF7900]"
				>
					<option value="none">Silencieux 🤫</option>
					<option value="some">Un peu 💬</option>
					<option value="very">Bavard 🗣️</option>
				</select>
			</label>

			<label class="block space-y-2">
				<span class="text-sm font-bold text-gray-700">Préférence musicale</span>
				<select
					bind:value={$currentUser.criteria.music}
					class="w-full rounded-xl border-2 border-gray-100 bg-gray-50 p-4 font-semibold outline-none focus:border-[#FF7900]"
				>
					<option value="none">Pas de musique 🔇</option>
					<option value="quiet">Musique calme 🌿</option>
					<option value="rock">Rock 🤘</option>
					<option value="pop">Pop ✨</option>
					<option value="any">Peu importe 🎧</option>
				</select>
			</label>

			<label class="block space-y-2">
				<span class="text-sm font-bold text-gray-700">Ponctualité</span>
				<select
					bind:value={$currentUser.criteria.punctuality}
					class="w-full rounded-xl border-2 border-gray-100 bg-gray-50 p-4 font-semibold outline-none focus:border-[#FF7900]"
				>
					<option value="relaxed">Détendu ⛱️</option>
					<option value="on-time">À l'heure ⏰</option>
					<option value="early">En avance 🚀</option>
				</select>
			</label>

			<label class="block space-y-2">
				<span class="flex justify-between text-sm font-bold text-gray-700">
					<span>Détour maximum</span>
					<span class="text-[#FF7900]">{$currentUser.criteria.maxDetour} min</span>
				</span>
				<input
					type="range"
					min="0"
					max="30"
					step="5"
					bind:value={$currentUser.criteria.maxDetour}
					class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
				/>
			</label>
		</div>
	</section>

	<button
		onclick={saveProfile}
		class="w-full rounded-2xl bg-[#FF7900] py-5 text-lg font-black text-white shadow-xl shadow-[#FF7900]/20 transition-transform active:scale-95"
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
