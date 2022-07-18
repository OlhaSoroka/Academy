import { gethUserByID, updateUserByID } from '@/api/user';
/* TODO: temporary. remove after Authorization implementation */
const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVhNWY2NDYxMjA4Y2ZmMGVlYzgwZDFkYmI1MjgyZTkyMDY0MjAyNWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4MTUyOTc3LCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTgxNTI5NzcsImV4cCI6MTY1ODE1NjU3NywiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.jJTz-x99_I6UGfkr5bi1ZYhrK9CQ_z9JHqTmQxKike39NTVBq8tGc-uuxhlJXJMiWsG3bD-Xz1FHuhDHBfAPUfLKcdfYdgdrk0h4kv2-87tO747lAEVjOMfoQq7BlAj1NHpAjJGElSzY8wVEdwmvcsvk0Osbthp5acll55luNlI1kfeF91rLWWRyXHMPbRI_YdfYTAzIHTedmMuP3vU3WGIj2YEDxYoPe_GIfnskgB3wHluW7meLvudaCfonWgYW0m-1Yon5ft9WJDlDjVtacIl2pF_RjITLe2tAcoPRyhOHAdOCUU6CANmS3PYvzQaBw183G53zs8tG7Fx2ixb3uw';

/* eslint-disable no-console */
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
			store.commit('TOGGLE_IMAGE_LOADING');
		},
		async changePassword(store, passwords) {
			console.log(store, passwords);
			// make put request to change a user password
		},
		async changeProfileImage(store, image) {
			store.commit('TOGGLE_IMAGE_LOADING');
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
		TOGGLE_IMAGE_LOADING(state) {
			state.isImageLoading = !state.isImageLoading;
		},
	},
	namespaced: true,
};
