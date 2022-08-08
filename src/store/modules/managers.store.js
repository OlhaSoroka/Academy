/* eslint-disable no-console */
import {
	getAllUsers,
	registerUser,
	deleteUserById,
	updateUserByID,
} from "@/api/user"
import { MANAGER_ROLE } from "@/constants/roles.constant"

export default {
	state: {
		managers: [],
		isManagersLoading: false,
	},
	getters: {
		managers: (state) => state.managers,
		isManagersLoading: (state) => state.isManagersLoading,
	},
	actions: {
		fetchManagers: async (store) => {
			const token = localStorage.getItem("accessToken")

			try {
				store.commit("TOGGLE_MANAGERS_LOADING")
				const users = await getAllUsers(token)
				const managers = users.filter((user) => user.role === MANAGER_ROLE)
				store.commit("SET_MANAGERS", managers)
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.response.data.message
				store.dispatch(
					"toast/show",
					{ message: errorMessage, type: "error" },
					{ root: true }
				)
			} finally {
				store.commit("TOGGLE_MANAGERS_LOADING")
			}
		},
		createManager: async (store, manager) => {
			const token = localStorage.getItem("accessToken")

			try {
				store.commit("TOGGLE_MANAGERS_LOADING")
				await registerUser(manager, token)
				store.dispatch(
					"toast/show",
					{ message: "User succesfully created", type: "success" },
					{ root: true }
				)
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.response.data.message
				store.dispatch(
					"toast/show",
					{ message: errorMessage, type: "error" },
					{ root: true }
				)
			} finally {
				store.commit("TOGGLE_MANAGERS_LOADING")
				store.dispatch("fetchManagers")
			}
		},
		deleteManager: async (store, id) => {
			const token = localStorage.getItem("accessToken")

			try {
				store.commit("TOGGLE_MANAGERS_LOADING")
				await deleteUserById(id, token)
				store.dispatch(
					"toast/show",
					{ message: "User succesfully deleted", type: "success" },
					{ root: true }
				)
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.response.data.message
				store.dispatch(
					"toast/show",
					{ message: errorMessage, type: "error" },
					{ root: true }
				)
			} finally {
				store.commit("TOGGLE_MANAGERS_LOADING")
				store.dispatch("fetchManagers")
			}
		},
		updateManager: async (store, managerData) => {
			const token = localStorage.getItem("accessToken")

			try {
				store.commit("TOGGLE_MANAGERS_LOADING")
				await updateUserByID(managerData.id, managerData, token)
				store.dispatch(
					"toast/show",
					{ message: "User succesfully updated", type: "success" },
					{ root: true }
				)
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.response.data.message
				store.dispatch(
					"toast/show",
					{ message: errorMessage, type: "error" },
					{ root: true }
				)
			} finally {
				store.commit("TOGGLE_MANAGERS_LOADING")
				store.dispatch("fetchManagers")
			}
		},
	},
	mutations: {
		SET_MANAGERS: (state, managers) => {
			state.managers = managers
		},
		TOGGLE_MANAGERS_LOADING: (state) => {
			state.isManagersLoading = !state.isManagersLoading
		},
	},
	namespaced: true,
}
