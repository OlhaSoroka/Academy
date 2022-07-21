import { gethUserByID, updateUserByID } from '@/api/user';
/* TODO: temporary. remove after Authorization implementation */
const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmMWMyNzQzYTJhZmY3YmZmZDBmODRhODY0ZTljMjc4ZjMxYmM2NTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4NDA4NjQ3LCJ1c2VyX2lkIjoia1RvU0NmUFIyWmJ6RXVabDZpOEllekdUOEhvMiIsInN1YiI6ImtUb1NDZlBSMlpiekV1Wmw2aThJZXpHVDhIbzIiLCJpYXQiOjE2NTg0MDg2NDcsImV4cCI6MTY1ODQxMjI0NywiZW1haWwiOiJzX3NtaXRoQG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNfc21pdGhAbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.DRe5zkPOplDNROL-FqCmerzkmJbdPoqt6GkXIeINY4wxJdYET5DE2Ip9fSCF3J5xhaj5pGNbsscC-R2URS9M4qvPMZjCtR05qwRw3weydSzebN2Tti_uJXXqc8gBqAT2aTNs554zX99SssNVjv04QlHvz0vHqIw6x0tWuMer7i-sBPQEQ34yYQWd48fnz1w-QsF7cMw5Js32CFq4v3rU4NB-oUWumO_Sz1v5dCkaVYByArs5qjS1Tx03cb6Ne4o8l4fobz8kyd-8_YsPkenMdh2oCM3DiKwOTjAO16rqshbHi4QDahrBrUi2T8-6Y3tGIu2o8CoQ3YI8-fFbZk57lQ';

export default {
	state: {
		user: null,
		isImageLoading: true,
	},
	getters: {
		user: (state) => state.user,
		isImageLoading: (state) => state.isImageLoading,
	},
	actions: {
		async fetchUser(store, id) {
			const user = await gethUserByID(id, token);
			store.commit('SET_USER', user);
			if (store.getters.isImageLoading) {
				store.commit('TOGGLE_IMAGE_LOADING');
			}
		},
		async changePassword(store, password) {
			await updateUserByID(
				store.state.user.id,
				{
					password,
					email: store.state.user.email,
				},
				token
			);
		},
		async changeProfileImage(store, image) {
			store.commit('TOGGLE_IMAGE_LOADING');
			const formData = new FormData();
			formData.append('avatar', image);
			await updateUserByID(store.state.user.id, formData, token);
			store.dispatch('fetchUser', store.state.user.id);
		},
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user;
		},
		TOGGLE_IMAGE_LOADING(state) {
			state.isImageLoading = !state.isImageLoading;
		},
	},
	namespaced: true,
};
