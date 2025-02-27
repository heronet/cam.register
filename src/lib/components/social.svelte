<script lang="ts">
	export let logo: string;
	export let url: string;
	export let title: string;
</script>

<a href={url} class="flex w-fit flex-col items-center hover:underline" target="_blank">
	<img src={logo} alt="logo" class="mb-1 w-6 invert" />
	<span>{title}</span>
</a>
