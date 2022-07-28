import { gethUserByID, updateUserByID } from '@/api/user';
/* TODO: temporary. remove after Authorization implementation */
const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhZjYwYzE3ZTJkNmY4YWQ1MzRjNDAwYzVhMTZkNjc2ZmFkNzc3ZTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU5MDQwMDU3LCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTkwNDAwNTcsImV4cCI6MTY1OTA0MzY1NywiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.fKc-rp50ul7ou7iBK2OvoZ2CWwwSTB-cYlxng3p2ENn8WOTSm_WgpGbqWvFLXK9UKdm1KjQuRqxNScmjT8ilCw6g-0cqljartPrIe-5VxgV0VGhAUwY75no-jDa8B_utakiRRlajH65qzBVhygh6H-ZbSwIqI3VdpeagPUMLBTkkr3msg5hvzbOYc4GpVG-CKIiM0jVNATxy1QD-aO7tABcRHQo-xr9iIky1nf15yK5FfeTnxWD4qKekNkjm1KOLEKY0ggMpmefQsZ3ZDFMHKYZTyXrIa7q7hAWT47SZc8lKCn_OyRs5IUUzXY2SIqD4apYR9LdPBQhoFsAcWymcjg';

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
			try {
				const user = await gethUserByID(id, token);
				store.commit('SET_USER', user);
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.message;
				store.dispatch('toast/show', { message: errorMessage, type: 'error' }, { root: true });
			} finally {
				if (store.getters.isImageLoading) {
					store.commit('TOGGLE_IMAGE_LOADING');
				}
			}
		},
		async changePassword(store, password) {
			try {
				await updateUserByID(
					store.state.user.id,
					{
						password,
						email: store.state.user.email,
					},
					token
				);
				store.dispatch('toast/show', { message: 'Password succesfully updated', type: 'success' }, { root: true });
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.message;
				store.dispatch('toast/show', { message: errorMessage, type: 'error' }, { root: true });
			}
		},
		async changeProfileImage(store, image) {
			try {
				store.commit('TOGGLE_IMAGE_LOADING');
				const formData = new FormData();
				formData.append('avatar', image);
				store.dispatch('fetchUser', store.state.user.id);
				await updateUserByID(store.state.user.id, formData, token);
				store.dispatch('toast/show', { message: 'Profile image succesfully updated', type: 'success' }, { root: true });
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.message;
				store.dispatch('toast/show', { message: errorMessage, type: 'error' }, { root: true });
			}
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
