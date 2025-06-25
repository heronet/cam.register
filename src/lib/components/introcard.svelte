<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import logo from '$lib/assets/Logo.png';
	let { content, viva } = $props();
</script>

<Card.Root class="border-transparent bg-blue-950/60 text-primary-foreground">
	<Card.Header>
		<Card.Title>
			<img src={logo} alt="cam" class="my-4 w-full" />
			<h1 class="text-center text-2xl">Welcome to CAM-SUST</h1>
		</Card.Title>
		<Card.Description class="text-center text-primary-foreground"
			>Become a Member of Copernicus Astronomical Memorial Of SUST !</Card.Description
		>
		<p class="pt-4 text-center text-3xl font-bold">
			{viva ? 'Part 2 - Viva Form' : 'Part 1 - Membership Form'}
		</p>
	</Card.Header>
	<Card.Content>{content}</Card.Content>
</Card.Root>
