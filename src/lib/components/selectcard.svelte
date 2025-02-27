<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';

	let { selections, required = false, title, desc, onSelect } = $props();
</script>

<Card.Root class="border-transparent bg-blue-950/60 text-white">
	<Card.Header>
		<Card.Title class="text-base text-primary-foreground"
			>{title} <span class="text-red-600">{required ? '*' : ''}</span></Card.Title
		>
		<Card.Description class="text-primary-foreground">{desc}</Card.Description>
	</Card.Header>
	<Card.Content>
		<RadioGroup.Root value="option-one" onValueChange={onSelect}>
			{#each selections as selection}
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value={selection} id={selection} class="border-white text-white" />
					<Label for={selection}>{selection}</Label>
				</div>
			{/each}
		</RadioGroup.Root>
	</Card.Content>
</Card.Root>
