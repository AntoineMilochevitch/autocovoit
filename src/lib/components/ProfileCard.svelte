<script lang="ts">
	import type { AnonymousProfile } from '$lib/data';
	import { connectionRequests } from '$lib/store';

	let { profile }: { profile: AnonymousProfile } = $props();

	let requested = $derived($connectionRequests.includes(profile.id));

	function requestConnection() {
		if (!requested) {
			connectionRequests.update((reqs) => [...reqs, profile.id]);
		}
	}
</script>

<div class="flex flex-col gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
	<div class="flex items-center gap-5">
		<div class="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-4xl border border-gray-50">
			{profile.avatar}
		</div>
		<div class="flex-1">
			<h3 class="font-black text-gray-900 text-xl">{profile.pseudo_anonyme}</h3>
			<p class="text-sm font-medium text-gray-400">Profil vérifié par Orange</p>
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
		<p class="mt-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-tight">
			L'anonymat est levé uniquement après acceptation mutuelle.
		</p>
	</div>
</div>
