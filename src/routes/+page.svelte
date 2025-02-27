<script lang="ts">
	import { goto } from '$app/navigation';
	import Checkboxcard from '$lib/components/checkboxcard.svelte';
	import Introcard from '$lib/components/introcard.svelte';
	import Selectcard from '$lib/components/selectcard.svelte';
	import Textcard from '$lib/components/textcard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let isLoading: boolean = $state(false);
	const sheetId = '1Cp3m9Ldt0w_Ox_bkdek_desndGIrKGNLTKQSwo-6R8c';

	let name: string = $state('');
	let email: string = $state('');
	let phone: string = $state('');
	let blood: string = $state('');
	let hometown: string = $state('');
	let membership: string = $state('');
	let hobbies: string = $state('');
	let whyUInterested: string = $state('');
	let department: string = $state('');
	let session: string = $state('');
	let paymentMethod: string = $state('');
	let bkashNumber: string = $state('');
	let bkashTrxID: string = $state('');
	let rocketNumber: string = $state('');
	let rocketTrxID: string = $state('');
	let eduLevel: string = $state('');
	let institute: string = $state('');
	let howUKnow: string = $state('');
	let agreed: boolean = $state(false);

	let disabled = $derived(isLoading || !name || !phone || !email || !department || !agreed);

	function addEntry() {
		if (disabled) return;
		isLoading = true;
		const data: Entry = {
			name: name || 'None',
			email: email || 'None',
			phone: phone || 'None',
			blood: blood || 'None',
			hometown: hometown || 'None',
			membership: membership || 'None',
			hobbies: hobbies || 'None',
			whyUInterested: whyUInterested || 'None',
			department: department || 'None',
			session: session || 'None',
			paymentMethod: paymentMethod || 'None',
			bkashNumber: bkashNumber || 'None',
			bkashTrxID: bkashTrxID || 'None',
			rocketNumber: rocketNumber || 'None',
			rocketTrxID: rocketTrxID || 'None',
			eduLevel: eduLevel || 'None',
			institute: institute || 'None',
			howUKnow: howUKnow || 'None'
		};

		fetch('/api/add', {
			method: 'POST',
			body: JSON.stringify({ spreadsheetId: sheetId, entry: data })
		})
			.then((res) => res.json())
			.then((res) => {
				goto('/success');
			})
			.catch((e) => console.log(e))
			.finally(() => {
				isLoading = false;
			});
	}

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
			body: JSON.stringify({ email: '', spreadsheetId: sheetId })
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

<div class="relative flex h-dvh w-full p-4">
	<div class="mx-auto flex w-full max-w-xl flex-col gap-4">
		<Introcard />
		<Textcard bind:text={name} title={'Name'} desc="Enter your Fullname" required={true} />
		<Textcard bind:text={email} title={'Email'} desc="Enter your Email" required={true} />
		<Textcard bind:text={phone} title={'Phone'} desc="Enter your Mobile number" required={true} />
		<Textcard bind:text={blood} title={'Blood Group'} desc="Enter your Blood Group" />
		<Textcard bind:text={hometown} title={'Hometown'} desc="Enter your Hometown" />
		<Selectcard
			onSelect={(e: string) => {
				membership = e;
			}}
			title={'Membership type'}
			desc="Please specify your membership type"
			selections={['General Member', 'Special Member']}
			required={true}
		/>
		{#if membership === 'General Member'}
			<Textcard
				bind:text={department}
				title={'Department'}
				desc="Enter your Department"
				required={true}
			/>
			<Textcard bind:text={session} title={'Session'} desc="Enter your session" required={true} />
		{:else if membership === 'Special Member'}
			<Selectcard
				onSelect={(e: string) => {
					eduLevel = e;
				}}
				title={'Education Level'}
				desc="Please specify your Education Level"
				selections={['School', 'College', 'Undergraduate']}
				required={true}
			/>
			<Textcard bind:text={institute} title={'Institute Name'} desc="Enter your Institute" />
		{/if}
		<Textcard bind:text={hobbies} title={'Hobbies'} desc="Enter your Hobbies" />
		<Textcard
			bind:text={whyUInterested}
			title={'Why are you interested?'}
			desc="Why are you interested?"
		/>

		{#if membership === 'General Member'}
			<Selectcard
				onSelect={(e: string) => {
					paymentMethod = e;
				}}
				title={'Payment Method'}
				desc="Pay your registration fee Tk. 100/- to the following number: 01842267878 through bKash/Rocket with 'send money' option. Please save the transaction id that you got from bKash/Rocket after sending the money."
				selections={['Bkash', 'Rocket']}
				required={true}
			/>
			{#if paymentMethod === 'Bkash'}
				<Textcard bind:text={bkashNumber} title={'Bkash Number'} desc="Enter your Bkash Number" />
				<Textcard
					bind:text={bkashTrxID}
					title={'Bkash Transaction ID'}
					desc="Enter your Bkash Transaction ID"
				/>
			{:else if paymentMethod === 'Rocket'}
				<Textcard
					bind:text={rocketNumber}
					title={'Rocket Number'}
					desc="Enter your Rocket Number"
				/>
				<Textcard
					bind:text={rocketTrxID}
					title={'Rocket Transaction ID'}
					desc="Enter your Rocket Transaction ID"
				/>
			{/if}
		{:else if membership === 'Special Member'}
			<Textcard
				bind:text={howUKnow}
				title={'How did you know about us?'}
				desc="How did you know about us?"
			/>
		{/if}

		<Checkboxcard bind:checked={agreed} />
		<div>
			<Button
				onclick={addEntry}
				class="mb-4 w-full border border-transparent bg-gradient-to-r from-blue-950 via-blue-500 to-blue-950  disabled:opacity-100"
				{disabled}>{isLoading ? 'Please wait...' : 'Submit'}</Button
			>
		</div>
	</div>
</div>
