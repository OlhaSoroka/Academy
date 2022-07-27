import { gethUserByID, updateUserByID } from '@/api/user';
/* TODO: temporary. remove after Authorization implementation */
const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhZjYwYzE3ZTJkNmY4YWQ1MzRjNDAwYzVhMTZkNjc2ZmFkNzc3ZTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4OTUzMDEyLCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTg5NTMwMTIsImV4cCI6MTY1ODk1NjYxMiwiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.RjO0_3jfyPVp-mkP_Isbgx8J8m1zA2KZ18qlwnsC13jb_tOkzpvqCsaAhp_JHpdnAKb6TT6sHYX1u-FfWgMMDvZGLHFsXvzRDEThm6mlE-vTGjMiCKd90RllUmtowP5XEHcTHRHHhNAJrn2nFNiVSbsin9MXTF7ga338X4_qaKUdz76Ah4xjOuOLaWrT2HPc7v-_0lZIrfM9ZMuAQpsDAU8uvy20OgMlWlTvdA3mOn-s4sHzc-6Jcygc8zaVO_zWFqBvzZsLAgSNBSpED9DVRd9qgn2lp1X5KR9cDc0JnM_eR_pT9a3asC8lx-epOe-X7yIsGiF7yMebQ7Oc8FFWqg';

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
