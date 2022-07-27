import { gethUserByID, updateUserByID } from '@/api/user';
/* TODO: temporary. remove after Authorization implementation */
const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhZjYwYzE3ZTJkNmY4YWQ1MzRjNDAwYzVhMTZkNjc2ZmFkNzc3ZTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4OTA5OTQxLCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTg5MDk5NDEsImV4cCI6MTY1ODkxMzU0MSwiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.eUqEcTrXUlTAzyiPs2a2NJ-i_x3kB7Ias9n8XOfgQ5imLUhh4voBjvZAUmwyYAN9_tZG5Bl1VuXee5tqmU0vNX5j16kbyKneGN8sharkSMZvpF-ZWTS5FBmZTIS-doFYBm3CwtRxhD9zukgsBso-Zn5HeYkoLOmK-qutcsd0WmKoHwfjXqfBIKHtG_PnOcNpyQDNoMFD_N2WRtsBwvvC5QuG2bkHB7AzWrSuKitZ0VOevoPNcmKbFTwTT-qc9aEZM7a6_u6VwldEzx3SSiRE5FNtTzPfF6Usx2MKnFMdRZ8aux9mKuNDQpbwXEPA9220zi4NLDlgV8WTRO7_GvfM-Q';

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
