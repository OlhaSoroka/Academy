/* eslint-disable no-console */
import { getAllUsers, registerUser,deleteUserById, updateUserByID } from '@/api/user';
import { MANAGER_ROLE } from '@/constants/roles.constant';

const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmMWMyNzQzYTJhZmY3YmZmZDBmODRhODY0ZTljMjc4ZjMxYmM2NTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4NDM1ODkwLCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTg0MzU4OTAsImV4cCI6MTY1ODQzOTQ5MCwiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.bxV-jq5P2ir1XkQQREWii2kHEvNLEhHdR0FQTrNnpgRtjf4QtDZTbQBqlrv3lVkPIJzgTpTrZgaqpVpGP2LSpQFHDc2tsAh6kpjxKiQAwu3q8CediNy2ya4bHEyVb6IKY_GMdjjzwh2GPCE4joBDdbVd4xO_NskWe2dwezLpOh_tDVosWkjqGvELjPpiAke2OgXznDjsgvwxoeonktXnEMZsgUeot6Y9e3uFmGEhXO_XegkLuXLFcZ6vVG9ouZGUEqIWxZY_KJqcolp07BSZoZ77Vsctho-BFsUml7oufipLrsQzcjFoIdV0wKWbjNFj2uhESZt3vqDhEY97IMshhA';

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
		},
		updateManager: async (store, managerData) => {
			store.commit('SET_MANAGERS_LOADING', true);
			await updateUserByID(managerData.id, managerData, token);
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
