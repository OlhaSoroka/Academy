export default {
	state: {
		user: {
			// mock user
			avatarUrl: 'http://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg',
			id: '136b7a6d-6026-4742-bc32-32596497927b',
			fullName: 'Allen Barrey',
			email: 'allen@test.com',
			course: 'Java',
			initialScore: 50,
			role: 'user',
		},
	},
	getters: {
		user: (state) => state.user,
	},
	actions: {
		async fetchUser(store, id) {
			console.log(store, id);
			// make get request for user here
			// store.commit('SET_USER', response.data);
		},
		async changePassword(store, passwords) {
			console.log(store, passwords);
			// make put request to change a user password
		},
		async changeProfileImage(store, image) {
			console.log(store, image);
			// make put request to change a user profile image
		},
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user;
		},
	},
	namespaced: true,
};
