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
		scopes: [
			'https://www.googleapis.com/auth/spreadsheets',
			'https://www.googleapis.com/auth/drive'
		]
	});

	const { spreadsheetId, email } = await request.json();

	const drive = google.drive({ version: 'v3', auth });

	try {
		const response = await drive.permissions.create({
			requestBody: {
				type: 'user',
				role: 'writer',
				emailAddress: email
			},
			fileId: spreadsheetId,
			fields: 'id'
		});

		return Response.json(`Permission ID: ${response.data.id}`);
	} catch (err) {
		console.error('Error adding permission:', err);

		return Response.json(err);
	}
};
