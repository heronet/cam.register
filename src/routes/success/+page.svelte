<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import logo from '$lib/assets/Logo.png';
	import facebook from '$lib/assets/facebook.svg';
	import linkedin from '$lib/assets/linkedin.svg';
	import instagram from '$lib/assets/instagram.svg';
	import twitter from '$lib/assets/twitter.svg';
	import Social from '$lib/components/social.svelte';
</script>

<svelte:head>
	<title>Success | CAM-SUST</title>
	<meta
		property="og:image"
		content="https://cam-sust.org/wp-content/uploads/2020/05/512px-Black.png"
	/>
</svelte:head>
<section
	class="relative flex h-dvh w-full overflow-y-auto bg-[url(lib/assets/background.png)] bg-cover bg-center bg-no-repeat p-4"
>
	<Card.Root
		class="mx-auto h-fit max-w-xl border-transparent bg-blue-950/60 text-primary-foreground"
	>
		<Card.Header>
			<Card.Title>
				<img src={logo} alt="cam" />
				<h1 class="text-center text-2xl">Welcome to CAM-SUST</h1>
			</Card.Title>
			<Card.Description class="text-center text-primary-foreground">
				Also, you can keep an eye on our social media channels for the next update

				<p class="my-4 mt-6 flex flex-wrap justify-center gap-6 max-sm:gap-2">
					<Social url={'https://www.facebook.com/camsust'} logo={facebook} title="Facebook" />
				</p>
			</Card.Description>
		</Card.Header>
		<Card.Content class="text-center text-primary-foreground"
			>Your submission was successful</Card.Content
		>
	</Card.Root>
</section>
