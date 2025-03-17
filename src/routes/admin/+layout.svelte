<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Navbar from './components/navbar.svelte';
	import Sidebar from './components/sidebar.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<main class="h-full">
	<Navbar />
	<section class="flex h-[calc(100dvh-4rem)]">
		<Sidebar />
		{@render children()}
	</section>
</main>
