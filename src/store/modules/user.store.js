import { gethUserByID, updateUserByID } from '@/api/user';
/* TODO: temporary. remove after Authorization implementation */
const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmMWMyNzQzYTJhZmY3YmZmZDBmODRhODY0ZTljMjc4ZjMxYmM2NTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4MjY0OTI1LCJ1c2VyX2lkIjoiVGNkVVRqTUpHQVBzQnZ2Um5MQmxCaGtTMjRjMiIsInN1YiI6IlRjZFVUak1KR0FQc0J2dlJuTEJsQmhrUzI0YzIiLCJpYXQiOjE2NTgyNjQ5MjUsImV4cCI6MTY1ODI2ODUyNSwiZW1haWwiOiJvc29yb2thMDgwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsib3Nvcm9rYTA4MDJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ffoqGjBKTGjzSxoFk-EmTTB6GbheaPwBTG03nCDM9HGlRWZ1YUgRz9FmBsBYYdfdNYQ2FouC-I7ZbBxKxljANOje2viIbmWYCDyeeoNc4ugFhiHKrgEi-ezNNVhSN9fPRS5fHWsQGEfkB1jVy2UsyU5eUEutZ9o9JXQKDszm94zX30Epar1-Wu7WRmca8uf1oJHweLq-Zm_K19-_PmKpZ12Fc3UywEa8tR1vm3bYm4gThP9dcn3mG3Sm_mSzVY1SQ-J9aXCp-JlL62PlcetmAOyC577QSKUIWW3vuxuFlnGITpLPQtB1FSUojKa9eLx8hjIKqVKX3mV8s0lRjdOblA';

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
