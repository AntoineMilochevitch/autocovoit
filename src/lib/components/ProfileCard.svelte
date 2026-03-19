<script lang="ts">
	import type { AnonymousProfile } from '$lib/data';
	import { connectionRequests } from '$lib/store';
	import CriteriaBadge from './CriteriaBadge.svelte';

	let { profile }: { profile: AnonymousProfile } = $props();

	let requested = $derived($connectionRequests.includes(profile.id));

	// Conversion du pourcentage en libellé anonymisé
	const getMatchLabel = (percent: number) => {
		if (percent >= 90) return 'Excellente';
		if (percent >= 80) return 'Très bonne';
		if (percent >= 70) return 'Bonne';
		return 'Potentielle';
	};

	function requestConnection() {
		if (!requested) {
			connectionRequests.update((reqs) => [...reqs, profile.id]);
		}
	}
</script>

<div class="flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-4">
			<div class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-3xl border border-gray-50">
				{profile.avatar}
			</div>
			<div>
				<h3 class="font-black text-gray-900 text-lg">{profile.pseudo_anonyme}</h3>
				<div class="flex items-center gap-2">
					<span class="inline-block h-2 w-2 rounded-full bg-orange-orange"></span>
					<span class="text-sm font-bold text-orange-orange uppercase tracking-wider">Compatibilité : {getMatchLabel(profile.match_percentage)}</span>
				</div>
			</div>
		</div>
	</div>

	<div class="space-y-3">
		<p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Préférences de voyage anonymisées</p>
		<div class="flex flex-wrap gap-2">
			<CriteriaBadge type="music" value={profile.criteria.music} />
			<CriteriaBadge type="chat" value={profile.criteria.chat} />
			<CriteriaBadge type="punctuality" value={profile.criteria.punctuality} />
			<CriteriaBadge type="detour" value={profile.criteria.maxDetour} />
		</div>
	</div>

	<div class="pt-2">
		<button
			onclick={requestConnection}
			class="w-full rounded-2xl py-4 text-sm font-black uppercase tracking-widest transition-all {requested
				? 'bg-gray-100 text-gray-400 cursor-default'
				: 'bg-black text-white hover:bg-gray-800 active:scale-95 shadow-lg'}"
			disabled={requested}
		>
			{requested ? 'Demande envoyée' : 'Demander la mise en relation'}
		</button>
		<p class="mt-3 text-center text-[10px] font-medium text-gray-400">
			Vos identités ne seront révélées qu'après acceptation mutuelle.
		</p>
	</div>
</div>
