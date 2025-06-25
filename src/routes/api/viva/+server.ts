import { google } from 'googleapis';
import type { RequestHandler } from './$types';
import {
	TYPE,
	PROJECT_ID,
	PRIVATE_KEY_ID,
	PRIVATE_KEY,
	CLIENT_EMAIL,
	CLIENT_ID,
	AUTH_URI,
	TOKEN_URI,
	AUTH_PROVIDER_X509_CERT_URL,
	CLIENT_X509_CERT_URL,
	UNIVERSE_DOMAIN
} from '$env/static/private';

interface Entry {
	email: string;
	membership: string;
	lastBookRead: string;
	daysAgoFinishedBook: string;
	typesOfBooksRead: string;
	booksPerMonth: string;
	readAstronomyBook: string;
	astronomyTopicsOnline: string;
	readingVideoRatio: string;
	mostInterestingAstronomyField: string;
	volunteeringExperience: string;
	readConstitution: string;
	expectationsFromCAMSUST: string;
	trainDilemmaResponse: string;
}

export const POST: RequestHandler = async ({ request }) => {
	const creds = {
		type: TYPE,
		project_id: PROJECT_ID,
		private_key_id: PRIVATE_KEY_ID,
		private_key: PRIVATE_KEY,
		client_email: CLIENT_EMAIL,
		client_id: CLIENT_ID,
		auth_uri: AUTH_URI,
		token_uri: TOKEN_URI,
		auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: CLIENT_X509_CERT_URL,
		universe_domain: UNIVERSE_DOMAIN
	};

	const auth = new google.auth.GoogleAuth({
		credentials: creds,
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});

	const sheets = google.sheets({
		auth: auth,
		version: 'v4'
	});

	const { spreadsheetId, entry }: { entry: Entry; spreadsheetId: string } = await request.json();

	const headerRange = 'Sheet1!A1:N1';
	const headerValues = [
		[
			'Email',
			'Membership Type',
			'Last Book Read',
			'Days Ago Finished Book',
			'Types of Books Read',
			'Books Per Month',
			'Read Astronomy Book',
			'Astronomy Topics Online',
			'Reading Video Ratio',
			'Most Interesting Astronomy Field',
			'Volunteering Experience',
			'Read Constitution',
			'Expectations from CAM-SUST',
			'Train Dilemma Response'
		]
	];

	const headerResource = {
		values: headerValues
	};

	try {
		// Update the header row
		await sheets.spreadsheets.values.update({
			spreadsheetId,
			range: headerRange,
			valueInputOption: 'RAW',
			requestBody: headerResource
		});

		// Define the range for the data rows
		const range = 'Sheet1!A2'; // Adjust the range as needed

		const values = [
			[
				entry.email || 'N/A',
				entry.membership || 'N/A',
				entry.lastBookRead || 'N/A',
				entry.daysAgoFinishedBook || 'N/A',
				entry.typesOfBooksRead || 'N/A',
				entry.booksPerMonth || 'N/A',
				entry.readAstronomyBook || 'N/A',
				entry.astronomyTopicsOnline || 'N/A',
				entry.readingVideoRatio || 'N/A',
				entry.mostInterestingAstronomyField || 'N/A',
				entry.volunteeringExperience || 'N/A',
				entry.readConstitution || 'N/A',
				entry.expectationsFromCAMSUST || 'N/A',
				entry.trainDilemmaResponse || 'N/A'
			]
		];

		const resource = {
			values
		};
		console.log(resource);

		const response = await sheets.spreadsheets.values.append({
			spreadsheetId,
			range,
			valueInputOption: 'RAW',
			requestBody: resource
		});

		return Response.json({ message: 'Successful!' });
	} catch (err) {
		return Response.json(err);
	}
};
