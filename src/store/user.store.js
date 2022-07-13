import { gethUserByID, updateUserByID } from '@/api/user';

const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVhNWY2NDYxMjA4Y2ZmMGVlYzgwZDFkYmI1MjgyZTkyMDY0MjAyNWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU3Njk4ODYxLCJ1c2VyX2lkIjoiVGNkVVRqTUpHQVBzQnZ2Um5MQmxCaGtTMjRjMiIsInN1YiI6IlRjZFVUak1KR0FQc0J2dlJuTEJsQmhrUzI0YzIiLCJpYXQiOjE2NTc2OTg4NjEsImV4cCI6MTY1NzcwMjQ2MSwiZW1haWwiOiJvc29yb2thMDgwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsib3Nvcm9rYTA4MDJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.F0oLnlcnmz4skvQMUCS3FBUCI-vW1QnYoA3asPoeNK6-VaTH9Zf1XBSukYtzGCv6ijhQNCydZUDt7Rf6m3mQGisB-fV1GLTP4uFt51zPOYMj0s7-aUIrabx6NxLOrnqQ_AYuFyUiyaEgAWaHNt2YLRnfFNvU0GUoO6g4tJynnFIyPYQ0GK074HduevWITo7AgBJTHz1ulkaN7JhFTTDvlK68tVOrETpccCc8W8KXDWd3fnHWr_A3SSVP4xxM9KOdmja5Ek_iPRGw9MYZMO9dywP37AsPs-hMgN3tuGtgwsrgkuQKxQpgm40AEu0FFtzR42KN9ttF8ons1LqDAMqG9g';

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
