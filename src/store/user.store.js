import { gethUserByID, updateUserByID } from '@/api/user';
/* TODO: temporary. remove after Authorization implementation */
const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmMWMyNzQzYTJhZmY3YmZmZDBmODRhODY0ZTljMjc4ZjMxYmM2NTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4MjU5NTMxLCJ1c2VyX2lkIjoiVGNkVVRqTUpHQVBzQnZ2Um5MQmxCaGtTMjRjMiIsInN1YiI6IlRjZFVUak1KR0FQc0J2dlJuTEJsQmhrUzI0YzIiLCJpYXQiOjE2NTgyNTk1MzEsImV4cCI6MTY1ODI2MzEzMSwiZW1haWwiOiJvc29yb2thMDgwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsib3Nvcm9rYTA4MDJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.KVeLUivJQiLudWdQGWKVpeUP2Dn6cujz8tjU-JqLbzNiRv_Of9xOIow8j1CyQtG7cX5eX5l-WEHT4V5IBKC6n64r1VwdrJ8km-4Vd_lwt0sWsIYICSkczEDSLFruaEmTah8VUVEOX5xyYZEp080Ma6D8ognxr3eWCORsyM1qUh3HiyINCUJdHZyz25u5I6iO6zsHxNMnfuzmhVBIxrwd8YG2-8zTMaFJ-hRvhvlAHoREMxaXF7tZ7_afi-r60s9y5weMB_k-rI1m_l4JeF0el_2tZcIM3iCj-p6EnLDxmoVzk5KvJf0wgLOPlyuRdA5GhbK7MWabTfZbifxUiIN21Q';

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
