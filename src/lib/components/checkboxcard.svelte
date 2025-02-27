<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Checkbox } from './ui/checkbox';
	import { Label } from './ui/label';

	export let checked: boolean = false;
</script>

<Card.Root
	class="flex items-center gap-4 border-transparent bg-blue-950/60 px-6 py-4 text-primary-foreground"
>
	<Checkbox id="terms1" bind:checked class="bg-white" />
	<div class="grid gap-1.5 leading-none">
		<Label
			for="terms1"
			class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			Accept terms and conditions <span class="text-red-600">*</span>
		</Label>
		<p class="text-sm text-primary-foreground">
			<span>You agree to our</span>
			<a href="https://google.com" class="text-blue-300">Terms of Service</a>
			<span>and</span>
			<a href="https://google.com" class="text-blue-300">Privacy Policy</a>
		</p>
	</div>
</Card.Root>
