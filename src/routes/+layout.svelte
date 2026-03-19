<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50 font-sans text-gray-900">
	<Header />
	<main class="mx-auto max-w-7xl px-4 pt-16 pb-6 sm:px-6 lg:px-8">
		{@render children()}
	</main>
</div>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
		width: 100%;
		box-sizing: border-box;
	}

	:global(*) {
		box-sizing: border-box;
	}
</style>
