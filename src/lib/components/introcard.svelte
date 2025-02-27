<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import logo from '$lib/assets/Logo.png';
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
	</Card.Header>
	<Card.Content>Fillup Up The form!</Card.Content>
</Card.Root>
