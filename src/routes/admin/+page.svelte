<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const sheetId = '1v75PV34NWgjXAZLwKK6Yc5LlNoXoLI19mw4m4N9jI4w';
	let isLoading: boolean = $state(false);

	function createForm() {
		fetch('/api/create', {
			method: 'POST'
		})
			.then((res) => res.json())
			.then((res) => {
				// goto('/success');
				console.log(res);
			})
			.catch((e) => console.log(e))
			.finally(() => {
				isLoading = false;
			});
	}
	function addPermission() {
		fetch('/api/add-permission', {
			method: 'POST',
			body: JSON.stringify({ email: 'sirat4757@gmail.com', spreadsheetId: sheetId })
		})
			.then((res) => res.json())
			.then((res) => {
				// goto('/success');
				console.log(res);
			})
			.catch((e) => console.log(e))
			.finally(() => {
				isLoading = false;
			});
	}
</script>

<main>
	<h1>Admin Page</h1>
	<p>Welcome to the admin page!</p>
	<button onclick={createForm} disabled={isLoading}>
		{isLoading ? 'Creating Form...' : 'Create Form'}
	</button>
	<button onclick={addPermission} disabled={isLoading}>
		{isLoading ? 'Adding Permission...' : 'Add Permission'}
	</button>
</main>
