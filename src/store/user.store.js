import { gethUserByID, updateUserByID } from '@/api/user';
/* TODO: temporary. remove after Authorization implementation */
const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVhNWY2NDYxMjA4Y2ZmMGVlYzgwZDFkYmI1MjgyZTkyMDY0MjAyNWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU3NzA2MTg1LCJ1c2VyX2lkIjoiVGNkVVRqTUpHQVBzQnZ2Um5MQmxCaGtTMjRjMiIsInN1YiI6IlRjZFVUak1KR0FQc0J2dlJuTEJsQmhrUzI0YzIiLCJpYXQiOjE2NTc3MDYxODUsImV4cCI6MTY1NzcwOTc4NSwiZW1haWwiOiJvc29yb2thMDgwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsib3Nvcm9rYTA4MDJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.cZoQZ2eIgRR2To0tQ20YNxm1QIS_1dlcxiGVP6wp-wW1v4w4yAnXA4EyWOKsFiGg0ddi9r-uYyH1_mNXCZrLrGXWkkV0mIfK0zaHq0LJyMYLzJixKAUaj8t2l-Wa-DClScu81Ep_CF-aPVxlAH9y-tf6DSo2Tba-40jc1SdknrsGrcvZse73nB2vrrJ4WMXNq_A_Wz1W-7499n5fsGuWE8_8np9cthcf6cl66knFKbE4_2F0q45KJe34Xq09mIS3MiEO2Vp-Jw33hsfFG0UdqB-KVfB1ycBB5MF6YVuVt58sWfgFqPeu51RSVpQ4XN_IbPUB1xvGGZupRsBEAcGbUg';

/* eslint-disable no-console */
export default {
	state: {
		user: null,
		isImageLoading: false,
	},
	getters: {
		user: (state) => state.user,
		isImageLoading: (state) => state.isImageLoading,
	},
	actions: {
		async fetchUser(store, id) {
			const user = await gethUserByID(id, token);
			store.commit('SET_USER', user);
			store.commit('SET_IMAGE_LOADING', false);
		},
		async changePassword(store, passwords) {
			console.log(store, passwords);
			// make put request to change a user password
		},
		async changeProfileImage(store, image) {
			store.commit('SET_IMAGE_LOADING', true);
			await updateUserByID(
				store.state.user.id,
				{
					avatarUrl: image,
				},
				token
			);
			store.dispatch('fetchUser', store.state.user.id);
		},
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user;
		},
		SET_IMAGE_LOADING(state, isImageLoading) {
			state.isImageLoading = isImageLoading;
		},
	},
	namespaced: true,
};
