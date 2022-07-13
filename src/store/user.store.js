import { gethUserByID, updateUserByID } from '@/api/user';

const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVhNWY2NDYxMjA4Y2ZmMGVlYzgwZDFkYmI1MjgyZTkyMDY0MjAyNWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU3NzAyNTA5LCJ1c2VyX2lkIjoiVGNkVVRqTUpHQVBzQnZ2Um5MQmxCaGtTMjRjMiIsInN1YiI6IlRjZFVUak1KR0FQc0J2dlJuTEJsQmhrUzI0YzIiLCJpYXQiOjE2NTc3MDI1MDksImV4cCI6MTY1NzcwNjEwOSwiZW1haWwiOiJvc29yb2thMDgwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsib3Nvcm9rYTA4MDJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.NFCh4_GzChIQlFjwENO8vwbVOcEe5-m2-6CfIZnBEgi8h-y4vj_H2dtiZw-7t-eSll8K-NAo_a7dgX36eXqAlEUbMTAVV4kHxBkh59MObsZyN6UzeoK7Mb03qj1PNpaCknXh0WHhSNPokmc98vRe-KbkrWSc0jJ0hTyqsq_T1n6-cQiy-v59U6SOBro5qimP9U6vEMCY_eCbj5eDQNPWHtog05Y0WqXHDql6pW0HdPzHlBfzHt2P7SCRiR_UiXf60FWmUh4pojUViYoU_AwiToftD7tMatVZdzxTZzEtZ2Qad-qot9QcO2BEum26GhtyZq-qt4cJrab16RWhxkrAsQ';

/* eslint-disable no-console */
export default {
	state: {
		user: null,
	},
	getters: {
		user: (state) => state.user,
	},
	actions: {
		async fetchUser(store, id) {
			const user = await gethUserByID(id, token);
			console.log({ user });
			store.commit('SET_USER', user);
		},
		async changePassword(store, passwords) {
			console.log(store, passwords);
			// make put request to change a user password
		},
		async changeProfileImage(store, image) {
			await updateUserByID(store.state.user.id, {
				avatarUrl: image,
			}, token);
			store.dispatch("fetchUser",store.state.user.id)
		},
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user;
		},
	},
	namespaced: true,
};
