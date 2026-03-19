<script lang="ts">
	import type { AnonymousProfile } from '$lib/data';
	import { connectionRequests } from '$lib/store';
	import CriteriaBadge from './CriteriaBadge.svelte';

	let { profile }: { profile: AnonymousProfile } = $props();

	let requested = $derived($connectionRequests.includes(profile.id));

	function requestConnection() {
		if (!requested) {
			connectionRequests.update((reqs) => [...reqs, profile.id]);
		}
	}
</script>

<div class="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-2xl">
				{profile.avatar}
			</div>
			<div>
				<h3 class="font-bold text-gray-900">{profile.pseudo_anonyme}</h3>
				<span class="text-sm font-semibold text-[#FF7900]">{profile.match_percentage}% compatible</span>
			</div>
		</div>
	</div>

	<div class="flex flex-wrap gap-2">
		<CriteriaBadge type="music" value={profile.criteria.music} />
		<CriteriaBadge type="chat" value={profile.criteria.chat} />
		<CriteriaBadge type="punctuality" value={profile.criteria.punctuality} />
		<CriteriaBadge type="detour" value={profile.criteria.maxDetour} />
	</div>

	<button
		onclick={requestConnection}
		class="mt-2 w-full rounded-xl py-3 text-sm font-bold transition-all {requested
			? 'bg-gray-100 text-gray-500'
			: 'bg-black text-white hover:bg-gray-800'}"
		disabled={requested}
	>
		{requested ? 'Demande envoyée...' : 'Demander la mise en relation'}
	</button>
</div>
