/* eslint-disable no-console */
import { getAllUsers, registerUser,deleteUserById } from '@/api/user';
import { MANAGER_ROLE } from '@/constants/roles.constant';

const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVhNWY2NDYxMjA4Y2ZmMGVlYzgwZDFkYmI1MjgyZTkyMDY0MjAyNWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU3OTE4MjQ5LCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTc5MTgyNDksImV4cCI6MTY1NzkyMTg0OSwiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.NsFcw_5lrGBaAAnaTeAwzMZHlqTtkdMWuoWlHEGCB6HjX_HUvne31CYbigRdcc_cYFihlC0RMNC6PsDJS4T7BuqS-CXLFEkp3qRKy28YTPp3IviV9osTBpo2PAtFST5jtm3tffAMlKFlP51iTs2YGaPY_5hxGYltW9AoAG4pxgNkFZhEBmNvF66qJvO5Xkiy6rXeyXir1bEpo79JwoyWqsb_X2_k7DQlaxUaFgKVrgsvAxHCzbTa9hka9iWKBZDIbYEhQd1N8onUa5IYNTk2C56lGIm2aJhI4Jy-BG3x8I5BpDdCCMCqr4g4cp7tLkD7r1Ei0FWqhAV896gBAsbP7Q';

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
			store.commit('SET_MANAGERS_LOADING', true);
			const users = await getAllUsers(token);
			const managers = users.filter((user) => user.role === MANAGER_ROLE);
			store.commit('SET_MANAGERS', managers);
			store.commit('SET_MANAGERS_LOADING', false);
		},
		createManager: async (store, manager) => {
			store.commit('SET_MANAGERS_LOADING', true);
			await registerUser(manager);
			store.dispatch('fetchManagers');
		},
		deleteManager:async (store,id)=>{
			store.commit('SET_MANAGERS_LOADING', true);
			await deleteUserById(id,token);
			store.commit('SET_MANAGERS_LOADING', false);
			store.dispatch('fetchManagers');
		}

	},
	mutations: {
		SET_MANAGERS: (state, managers) => {
			state.managers = managers;
		},
		SET_MANAGERS_LOADING: (state, isManagersLoading) => {
			state.isManagersLoading = isManagersLoading;
		},
	},
	namespaced: true,
};
