<script lang="ts">
	import { goto } from '$app/navigation';
	import Introcard from '$lib/components/introcard.svelte';
	import Selectcard from '$lib/components/selectcard.svelte';
	import Textareacard from '$lib/components/textareacard.svelte';
	import Textcard from '$lib/components/textcard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let isLoading: boolean = $state(false);
	const sheetId = '1v75PV34NWgjXAZLwKK6Yc5LlNoXoLI19mw4m4N9jI4w';

	let email: string = $state('');
	let membership: string = $state('');

	// New state variables for the correct form fields
	let lastBookRead: string = $state('');
	let daysAgoFinishedBook: string = $state('');
	let typesOfBooksRead: string = $state('');
	let booksPerMonth: string = $state('');
	let readAstronomyBook: string = $state('');
	let astronomyTopicsOnline: string = $state('');
	let readingVideoRatio: string = $state('');
	let mostInterestingAstronomyField: string = $state('');
	let volunteeringExperience: string = $state('');
	let readConstitution: string = $state('');
	let expectationsFromCAMSUST: string = $state('');
	let trainDilemmaResponse: string = $state('');

	let disabled = $derived(
		isLoading ||
			!email ||
			!membership ||
			!lastBookRead ||
			!daysAgoFinishedBook ||
			!typesOfBooksRead ||
			!booksPerMonth ||
			!readAstronomyBook ||
			!astronomyTopicsOnline ||
			!readingVideoRatio ||
			!mostInterestingAstronomyField ||
			!volunteeringExperience ||
			!readConstitution ||
			!expectationsFromCAMSUST ||
			!trainDilemmaResponse
	);

	function addEntry() {
		if (disabled) return;

		isLoading = true;
		const data = {
			email: email || 'N/A',
			membership: membership || 'N/A',
			lastBookRead: lastBookRead || 'N/A',
			daysAgoFinishedBook: daysAgoFinishedBook || 'N/A',
			typesOfBooksRead: typesOfBooksRead || 'N/A',
			booksPerMonth: booksPerMonth || 'N/A',
			readAstronomyBook: readAstronomyBook || 'N/A',
			astronomyTopicsOnline: astronomyTopicsOnline || 'N/A',
			readingVideoRatio: readingVideoRatio || 'N/A',
			mostInterestingAstronomyField: mostInterestingAstronomyField || 'N/A',
			volunteeringExperience: volunteeringExperience || 'N/A',
			readConstitution: readConstitution || 'N/A',
			expectationsFromCAMSUST: expectationsFromCAMSUST || 'N/A',
			trainDilemmaResponse: trainDilemmaResponse || 'N/A'
		};

		fetch('/api/viva', {
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
</script>

<svelte:head>
	<title>Member Registration | CAM-SUST</title>
	<meta
		property="og:image"
		content="https://cam-sust.org/wp-content/uploads/2020/05/512px-Black.png"
	/>
</svelte:head>
<div
	class="relative flex h-dvh w-full overflow-y-auto bg-[url(lib/assets/background.png)] bg-cover bg-center bg-no-repeat p-4"
>
	<div class="mx-auto flex w-full max-w-xl flex-col gap-4">
		<Introcard
			content={'This form is mandatory for the completion of your registration. Please take some times to fill up this form and then submit it.'}
			viva={true}
		/>
		<Textcard
			bind:text={email}
			title={'Email'}
			desc="Please Enter Your E-mail Address Again"
			required={true}
		/>
		<Selectcard
			onSelect={(e: string) => {
				membership = e;
			}}
			title={'Membership type'}
			desc="Please specify your membership type"
			selections={['General Member', 'Special Member']}
			required={true}
		/>

		<Textcard
			bind:text={lastBookRead}
			title={'তোমার পড়া শেষ বই কোনটি? '}
			desc="(What is the last book you read?)"
			required={true}
		/>
		<Textcard
			bind:text={daysAgoFinishedBook}
			title={'আনুমানিক কতদিন আগে শেষ বইটি পড়া হয়েছে?'}
			desc="(About how many days ago did you finish that book?)"
			required={true}
		/>
		<Textcard
			bind:text={typesOfBooksRead}
			title={'একাডেমিক বইয়ের বাইরে কোন ধরণের বই বেশি পড়া হয়?'}
			desc="(What types of books do you read mostly other than academic books?)"
			required={true}
		/>
		<Textcard
			bind:text={booksPerMonth}
			title={'প্রতি মাসে গড়ে কয়টি বই পড়া হয়?'}
			desc="(How many books do you read per month on average?)"
			required={true}
		/>
		<Textcard
			bind:text={readAstronomyBook}
			title={'জ্যোতির্বিজ্ঞানের কোনো বই পড়া হয়েছে কি?'}
			desc="(Did you read any book about astronomy?)"
			required={true}
		/>
		<Textcard
			bind:text={astronomyTopicsOnline}
			title={'জ্যোতির্বিজ্ঞানের কী ধরনের বিষয় অনলাইনে পড়া হয়েছে?'}
			desc="(What topics of astronomy have you studied online?)"
			required={true}
		/>
		<Textcard
			bind:text={readingVideoRatio}
			title={'জ্ঞান অর্জনে, তোমার পড়া এবং ভিডিও দেখার আনুমানিক অনুপাত কত?'}
			desc="(What is the approximate ratio of reading and watching videos about a certain topic when you want to learn about it?)"
			required={true}
		/>
		<Textcard
			bind:text={mostInterestingAstronomyField}
			title={'জ্যোতির্বিজ্ঞানের কোন ক্ষেত্রটি তোমার সবচেয়ে ইন্টারেস্টিং মনে হয়?'}
			desc="(What is the most interesting field in astronomy in your opinion?)"
			required={true}
		/>
		<Textcard
			bind:text={volunteeringExperience}
			title={'পূর্বের কোন স্বেচ্ছাশ্রমের বা দলগত কাজের অভিজ্ঞতা রয়েছে?'}
			desc="(Do you have any previous volunteering/teamwork experience?)"
			required={true}
		/>
		<Selectcard
			onSelect={(e: string) => {
				readConstitution = e;
			}}
			title={'তুমি কি ক্যাম-সাস্টের সংবিধান পড়েছো?'}
			desc="(Have you read CAM-SUST's constitution?)"
			selections={['Yes', 'No']}
			required={true}
		/>
		<Textareacard
			bind:text={expectationsFromCAMSUST}
			title={'ক্যাম-সাস্ট থেকে তোমার প্রত্যাশা কি?'}
			desc="(What are your expectations from CAM-SUST in general?)"
			required={true}
		/>
		<Textareacard
			bind:text={trainDilemmaResponse}
			title={'মনে করো, তুমি একটি ট্রেনের চালক। চলতি পথে হঠাৎ দেখতে পেলে রেললাইনের উপর ১০ জন লোক ঘুমাচ্ছে, ট্রেন ব্রেক করে বা অন্যকোনভাবে দুর্ঘটনা আটকানো সম্ভব না। তবে একটি বাইপাস ট্র্যাক আছে, চাইলে তাৎক্ষণিকভাবে রুট পরিবর্তন করে ঐ লাইনে যেতে পারো। তবে ঐ লাইনে দেখা যাচ্ছে ১ জন মানুষ ঘুমাচ্ছে। বাইপাস রুটে আপাতত অন্য কোন ট্রেন আসার সম্ভাবনা নাই। কিন্তু রেলওয়ের সংবিধান অনুযায়ী রুট পরিবর্তন করা যাবে না। এ পরিস্থিতিতে তুমি কোন পথে যাবে এবং কেন?'}
			desc="(Suppose that you are a driver at a railway. One day while driving the train you notice 10 people are sleeping on the railtrack on which you are driving. The train is moving at a high speed so even if you push the brakes the train will not stop in due time to save those people. But there is a bypass track that you can drive your train in at that moment . On that bypass track there is 1 person sleeping on the railway track. The railway constitution forbids using any bypass tracks during journey. In this circumstance, which path will you choose and why?)"
			required={true}
		/>

		<div>
			<Button
				onclick={addEntry}
				class="mb-4 w-full border border-transparent bg-gradient-to-r from-blue-950 via-blue-500 to-blue-950  disabled:opacity-100"
				{disabled}>{isLoading ? 'Please wait...' : 'Submit'}</Button
			>
		</div>
	</div>
</div>
