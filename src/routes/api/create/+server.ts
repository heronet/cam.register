import { google } from 'googleapis';
import type { RequestHandler } from './$types';
import {
	AUTH_PROVIDER_X509_CERT_URL,
	AUTH_URI,
	CLIENT_EMAIL,
	CLIENT_ID,
	CLIENT_X509_CERT_URL,
	PRIVATE_KEY,
	PRIVATE_KEY_ID,
	PROJECT_ID,
	TOKEN_URI,
	TYPE,
	UNIVERSE_DOMAIN
} from '$env/static/private';

export const POST: RequestHandler = async () => {
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

	// Spreadsheet creation request body
	const resource = {
		properties: {
			title: 'My New Spreadsheet' // Replace with your desired title
		}
	};

	const res = await sheets.spreadsheets.create({ requestBody: resource });

	return Response.json(res);
};
