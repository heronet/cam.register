<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const sheetId = '1Cp3m9Ldt0w_Ox_bkdek_desndGIrKGNLTKQSwo-6R8c';
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
