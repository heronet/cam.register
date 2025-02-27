<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Input from './ui/input/input.svelte';

	export let required: boolean = false;
	export let text: string;
	export let title: string;
	export let desc: string;
</script>

<Card.Root class="border-transparent bg-blue-950/60">
	<Card.Header>
		<Card.Title class="text-base text-primary-foreground"
			>{title} <span class="text-red-600">{required ? '*' : ''}</span></Card.Title
		>
		<Card.Description class="text-primary-foreground">{desc}</Card.Description>
	</Card.Header>
	<Card.Content>
		<Input class="" bind:value={text} placeholder={title} required />
	</Card.Content>
</Card.Root>
