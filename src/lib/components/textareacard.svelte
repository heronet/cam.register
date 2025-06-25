<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Textarea from './ui/textarea/textarea.svelte';

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
		<Textarea
			class=""
			rows={4}
			bind:value={text}
			placeholder={`${title.length > 200 ? title.slice(0, 200) + '...' : title}`}
			required
		/>
	</Card.Content>
</Card.Root>
