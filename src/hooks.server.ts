import type { UserData } from '$lib/models/UserData';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const user = event.cookies.get('user');
	if (user) event.locals.user = JSON.parse(user);

	// TODO: Remove after backend integration
	const dummyUser: UserData = {
		expiry: '',
		token: 'token',
		user: {
			username: 'Sirat'
		}
	};
	// event.locals.user = dummyUser;

	if (!event.locals.user) {
		let protectedRoute = event.url.pathname.startsWith('/admin');

		if (protectedRoute) {
			throw redirect(303, '/');
		}
	}

	const response = await resolve(event);
	return response;
};
