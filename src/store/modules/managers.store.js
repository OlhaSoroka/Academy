/* eslint-disable no-console */
import {
  getAllUsers,
  registerUser,
  deleteUserById,
  updateUserByID,
} from "@/api/user";
import { MANAGER_ROLE } from "@/constants/roles.constant";

const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhZjYwYzE3ZTJkNmY4YWQ1MzRjNDAwYzVhMTZkNjc2ZmFkNzc3ZTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU5MDQwMDU3LCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTkwNDAwNTcsImV4cCI6MTY1OTA0MzY1NywiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.fKc-rp50ul7ou7iBK2OvoZ2CWwwSTB-cYlxng3p2ENn8WOTSm_WgpGbqWvFLXK9UKdm1KjQuRqxNScmjT8ilCw6g-0cqljartPrIe-5VxgV0VGhAUwY75no-jDa8B_utakiRRlajH65qzBVhygh6H-ZbSwIqI3VdpeagPUMLBTkkr3msg5hvzbOYc4GpVG-CKIiM0jVNATxy1QD-aO7tABcRHQo-xr9iIky1nf15yK5FfeTnxWD4qKekNkjm1KOLEKY0ggMpmefQsZ3ZDFMHKYZTyXrIa7q7hAWT47SZc8lKCn_OyRs5IUUzXY2SIqD4apYR9LdPBQhoFsAcWymcjg';

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
			try {
				store.commit('TOGGLE_MANAGERS_LOADING');
				const users = await getAllUsers(token);
				const managers = users.filter((user) => user.role === MANAGER_ROLE);
				store.commit('SET_MANAGERS', managers);
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.message;
				store.dispatch('toast/show', { message: errorMessage, type: 'error' }, { root: true });
			} finally {
				store.commit('TOGGLE_MANAGERS_LOADING');
			}
		},
		createManager: async (store, manager) => {
			try {
				store.commit('TOGGLE_MANAGERS_LOADING');
				await registerUser(manager);
				store.dispatch('toast/show', { message: 'User succesfully created', type: 'success' }, { root: true });
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.message;
				store.dispatch('toast/show', { message: errorMessage, type: 'error' }, { root: true });
			} finally {
				store.commit('TOGGLE_MANAGERS_LOADING');
				store.dispatch('fetchManagers');
			}
		},
		deleteManager: async (store, id) => {
			try {
				store.commit('TOGGLE_MANAGERS_LOADING');
				await deleteUserById(id, token);
				store.dispatch('toast/show', { message: 'User succesfully deleted', type: 'success' }, { root: true });
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.message;
				store.dispatch('toast/show', { message: errorMessage, type: 'error' }, { root: true });
			} finally {
				store.commit('TOGGLE_MANAGERS_LOADING');
				store.dispatch('fetchManagers');
			}
		},
		updateManager: async (store, managerData) => {
			try {
				store.commit('TOGGLE_MANAGERS_LOADING');
				await updateUserByID(managerData.id, managerData, token);
				store.dispatch('toast/show', { message: 'User succesfully updated', type: 'success' }, { root: true });
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.message;
				store.dispatch('toast/show', { message: errorMessage, type: 'error' }, { root: true });
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
	},
	namespaced: true,
};
