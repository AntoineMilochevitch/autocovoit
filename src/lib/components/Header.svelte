<script lang="ts">
	import { currentUser } from '$lib/store';
	import { base } from '$app/paths';
</script>

<header class="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
		<a href="{base}/" class="flex items-center gap-3">
			<img src="{base}/Orange_logo.svg.png" alt="Orange" class="h-10 w-10 object-contain" />
			<span class="hidden text-xl font-bold tracking-tight text-black sm:block">
				Auto-Carpooling
			</span>
		</a>
		<div class="flex items-center gap-4">
			<a
				href="{base}/chat"
				class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg transition-colors hover:bg-gray-200"
				title="Messages"
			>
				💬
			</a>
			<a
				href="{base}/profile"
				class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl transition-colors hover:bg-gray-200"
				title="Profil"
			>
				{$currentUser.avatar}
			</a>
		</div>
	</div>
</header>
