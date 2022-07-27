/* eslint-disable no-console */
import { getAllUsers, registerUser, deleteUserById, updateUserByID } from '@/api/user';
import { MANAGER_ROLE } from '@/constants/roles.constant';

const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhZjYwYzE3ZTJkNmY4YWQ1MzRjNDAwYzVhMTZkNjc2ZmFkNzc3ZTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4OTA5OTQxLCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTg5MDk5NDEsImV4cCI6MTY1ODkxMzU0MSwiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.eUqEcTrXUlTAzyiPs2a2NJ-i_x3kB7Ias9n8XOfgQ5imLUhh4voBjvZAUmwyYAN9_tZG5Bl1VuXee5tqmU0vNX5j16kbyKneGN8sharkSMZvpF-ZWTS5FBmZTIS-doFYBm3CwtRxhD9zukgsBso-Zn5HeYkoLOmK-qutcsd0WmKoHwfjXqfBIKHtG_PnOcNpyQDNoMFD_N2WRtsBwvvC5QuG2bkHB7AzWrSuKitZ0VOevoPNcmKbFTwTT-qc9aEZM7a6_u6VwldEzx3SSiRE5FNtTzPfF6Usx2MKnFMdRZ8aux9mKuNDQpbwXEPA9220zi4NLDlgV8WTRO7_GvfM-Q';

export default {
	state: {
		managers: [],
		isManagersLoading: false,
		error: null,
	},
	getters: {
		managers: (state) => state.managers,
		isManagersLoading: (state) => state.isManagersLoading,
		error: (state) => state.error,
	},
	actions: {
		fetchManagers: async (store) => {
			try {
				store.commit('TOGGLE_MANAGERS_LOADING');
				const users = await getAllUsers(token);
				const managers = users.filter((user) => user.role === MANAGER_ROLE);
				store.commit('SET_MANAGERS', managers);
			} catch (error) {
				const responseError = error.response?.data?.error || error.message;
				store.commit('SET_ERROR', responseError);
			} finally {
				store.commit('TOGGLE_MANAGERS_LOADING');
			}
		},
		createManager: async (store, manager) => {
			try {
				store.commit('TOGGLE_MANAGERS_LOADING');
				await registerUser(manager);
			} catch (error) {
				const responseError = error.response?.data?.error || error.message;
				store.commit('SET_ERROR', responseError);
			} finally {
				store.commit('TOGGLE_MANAGERS_LOADING');
				store.dispatch('fetchManagers');
			}
		},
		deleteManager: async (store, id) => {
			try {
				store.commit('TOGGLE_MANAGERS_LOADING');
				await deleteUserById(id, token);
			} catch (error) {
				const responseError = error.response?.data?.error || error.message;
				store.commit('SET_ERROR', responseError);
			} finally {
				store.commit('TOGGLE_MANAGERS_LOADING');
				store.dispatch('fetchManagers');
			}
		},
		updateManager: async (store, managerData) => {
			try {
				store.commit('TOGGLE_MANAGERS_LOADING');
				await updateUserByID(managerData.id, managerData, token);
			} catch (error) {
				const responseError = error.response?.data?.error || error.message;
				store.commit('SET_ERROR', responseError);
			} finally {
				store.commit('TOGGLE_MANAGERS_LOADING');
				store.dispatch('fetchManagers');
			}
		},
	},
	mutations: {
		SET_MANAGERS: (state, managers) => {
			state.managers = managers;
		},
		TOGGLE_MANAGERS_LOADING: (state) => {
			state.isManagersLoading = !state.isManagersLoading;
		},
		SET_ERROR: (state, error) => {
			state.error = error;
		},
	},
	namespaced: true,
};
