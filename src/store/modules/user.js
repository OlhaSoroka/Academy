import { gethUserByID, updateUserByID } from '@/api/user';
import { getAuth, signOut } from 'firebase/auth';

const token = localStorage.getItem('accessToken');

export default {
	state: {
		user: null,
		isImageLoading: false,
	},
	getters: {
		user: (state) => state.user,
		isImageLoading: (state) => state.isImageLoading,
		accessToken() {
			return token;
		},
	},
	actions: {
		setUser({ commit }, user) {
			commit('SET_USER', user);
		},
		async fetchUser(store, id) {
			try {
				const user = await gethUserByID(id, token);
				store.commit('SET_USER', user);
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.response.data.message;
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
				store.dispatch('toast/show', { message: 'Password succesfully changed', type: 'success' }, { root: true });
			} catch (error) {				
				const errorMessage = error.response?.data?.error || error.response.data.message;
				store.dispatch('toast/show', { message: errorMessage, type: 'error' }, { root: true });
			}
		},
		async changeProfileImage(store, image) {
			try {
				store.commit('TOGGLE_IMAGE_LOADING');
				const formData = new FormData();
				formData.append('avatar', image);
				await updateUserByID(store.state.user.id, formData, token);
				store.dispatch('fetchUser', store.state.user.id);
				store.dispatch('toast/show', { message: 'Profile image succesfully changed', type: 'success' }, { root: true });
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.response.data.message;
				store.dispatch('toast/show', { message: errorMessage, type: 'error' }, { root: true });
			}
		},
		async logoutUser(store) {
			try {
				localStorage.removeItem('accessToken');
				const auth = getAuth();
				await signOut(auth);
				store.dispatch('setUser', null);
			} catch (error) {
				store.dispatch('toast/show', { message: error.response.data.message, type: 'error' }, { root: true });
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
