<script lang="ts">
	import { currentUser } from '$lib/store';
	import { fade, slide } from 'svelte/transition';
	import { base } from '$app/paths';

	function setVisibility(visible: boolean) {
		currentUser.update((u) => ({ ...u, visible }));
	}
</script>

<div class="flex min-h-[calc(100vh-140px)] w-full flex-col items-center justify-center gap-6 py-4 text-center overflow-x-hidden">
	<div class="relative">
		<div class="absolute -inset-4 animate-pulse rounded-full bg-orange-orange/10 ring-1 ring-orange-orange/20 sm:-inset-6"></div>
		<div class="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-orange-orange sm:h-28 sm:w-28">
			<span class="text-4xl sm:text-5xl">📍</span>
		</div>
	</div>

	<div class="max-w-2xl space-y-3 px-6" in:fade={{ delay: 200 }}>
		<h1 class="text-2xl font-black leading-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
			Nous avons détecté <span class="text-orange-orange">3 personnes</span> faisant régulièrement le trajet
			<span class="block text-gray-400">Dijon ↔ Belfort</span>
			aux mêmes horaires que vous.
		</h1>
		<p class="text-base text-gray-500 sm:text-lg">
			Votre profil est actuellement <strong>{$currentUser.visible ? 'Visible' : 'Invisible'}</strong>.
		</p>
	</div>

	<div class="w-full max-w-lg px-6" in:slide={{ delay: 400 }}>
		<div class="flex flex-col gap-3 sm:flex-row">
			<a
				href="{base}/discovery"
				onclick={() => setVisibility(true)}
				class="flex flex-1 items-center justify-center rounded-xl bg-black py-4 text-base font-bold text-white transition-all hover:bg-gray-800 active:scale-95 shadow-md"
			>
				Découvrir les profils
			</a>
			<button
				onclick={() => setVisibility(false)}
				class="flex-1 rounded-xl border-2 border-gray-100 py-3 text-base font-bold text-gray-400 transition-all hover:bg-gray-50 active:scale-95"
			>
				Ignorer (Rester invisible)
			</button>
		</div>
	</div>
</div>
