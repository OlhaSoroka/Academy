/* eslint-disable no-console */
import { getAllUsers, registerUser, deleteUserById, updateUserByID } from '@/api/user';
import { MANAGER_ROLE } from '@/constants/roles.constant';

const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmMWMyNzQzYTJhZmY3YmZmZDBmODRhODY0ZTljMjc4ZjMxYmM2NTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4ODM1NDI0LCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTg4MzU0MjQsImV4cCI6MTY1ODgzOTAyNCwiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ffMlHMqbYGCxNgUU4vbdGFBjXu_rqSoqLKCvA-FGnTO-eGzttqU23IcphHO5WN-3C0kjukmpSJnxlsoD6lqy7mpBq8mbhhcPKrq4ipBVGG5M9CnpI5Ugu6uFGkUr70I-P8TPvR9nQwAwflyfrQPpNS4CrdS2ALFRHHGa21m9Xj5Qo_Xsy8ieLoQdDKZFyoXlH3zafPFi8hpsHmKZXkgJpmWqYgoeGOpmFQ8BRSIzE28tqrq_djHrR6gOP1jQwsx46erUErRDrZvfr4HxXbAs-iUdddYxqWmq8lG7-w_hY3U0Q0u0zWzaMOt5I2gwKbX7BZ470ltQFn__PkuO7fIufw';

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
