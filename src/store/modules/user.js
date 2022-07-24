import { gethUserByID, updateUserByID } from "@/api/user"
import { getAuth, signOut } from "firebase/auth"

/* TODO: temporary. remove after Authorization implementation */

export default {
	state: {
		user: null,
		isImageLoading: true,
	},
	getters: {
		user: (state) => state.user,
		isImageLoading: (state) => state.isImageLoading,
		accessToken(state) {
			return state.user.stsTokenManager.accessToken
		},
	},
	actions: {
		setUser({ commit }, user) {
			commit("SET_USER", user)
		},
		async fetchUser(store, id) {
			const user = await gethUserByID(
				id,
				store.state.user.stsTokenManager.accessToken
			)
			store.commit("SET_USER", user)
			if (store.getters.isImageLoading) {
				store.commit("TOGGLE_IMAGE_LOADING")
			}
		},
		async changePassword(store, password) {
			await updateUserByID(
				store.state.user.id,
				{
					password,
					email: store.state.user.email,
				},
				store.state.user.stsTokenManager.accessToken
			)
		},
		async changeProfileImage(store, image) {
			store.commit("TOGGLE_IMAGE_LOADING")
			const formData = new FormData()
			formData.append("avatar", image)
			await updateUserByID(
				store.state.user.id,
				formData,
				store.state.user.stsTokenManager.accessToken
			)
			store.dispatch("fetchUser", store.state.user.id)
		},
		async logoutUser(store) {
			const auth = getAuth()
			await signOut(auth).catch((error) => {
				console.log(error.message)
			})
			store.dispatch("setUser", null)
			localStorage.removeItem('accessToken')
		},
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user
		},
		TOGGLE_IMAGE_LOADING(state) {
			state.isImageLoading = !state.isImageLoading
		},
	},
	namespaced: true,
}
