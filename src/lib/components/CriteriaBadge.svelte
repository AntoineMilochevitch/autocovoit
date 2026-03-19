<script lang="ts">
	let { type, value }: {
		type: 'music' | 'chat' | 'punctuality' | 'detour';
		value: string | number;
	} = $props();

	const labels: Record<string, string> = {
		none: 'Aucun',
		quiet: 'Calme',
		rock: 'Rock',
		pop: 'Pop',
		any: 'Tous types',
		some: 'Parfois',
		very: 'Beaucoup',
		relaxed: 'Détendu',
		'on-time': 'À l\'heure',
		early: 'En avance'
	};

	const icons: Record<string, string> = {
		music: '🎵',
		chat: '💬',
		punctuality: '🕒',
		detour: '🗺️'
	};
</script>

<div class="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
	<span>{icons[type]}</span>
	<span>{type === 'detour' ? `${value} min max` : labels[value as string] || value}</span>
</div>
