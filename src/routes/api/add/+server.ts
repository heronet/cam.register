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

	const headerRange = 'Sheet1!A1:E1';
	const headerValues = [['Full Name', 'Email', 'Phone', 'Department', 'Registration']];

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

		const values = [[entry.name, entry.email, entry.phone, entry.department, entry.registration]];

		const resource = {
			values
		};
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
