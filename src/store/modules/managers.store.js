/* eslint-disable no-console */
import { getAllUsers, registerUser,deleteUserById, updateUserByID } from '@/api/user';
import { MANAGER_ROLE } from '@/constants/roles.constant';

const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmMWMyNzQzYTJhZmY3YmZmZDBmODRhODY0ZTljMjc4ZjMxYmM2NTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4NDMyMzQyLCJ1c2VyX2lkIjoia1RvU0NmUFIyWmJ6RXVabDZpOEllekdUOEhvMiIsInN1YiI6ImtUb1NDZlBSMlpiekV1Wmw2aThJZXpHVDhIbzIiLCJpYXQiOjE2NTg0MzIzNDIsImV4cCI6MTY1ODQzNTk0MiwiZW1haWwiOiJzX3NtaXRoQG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNfc21pdGhAbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.PAC_zX2S9owUGv_lAyIn0YSbvR64sl_-bbAr6i9OksahtmFulPdHj1IKqYQGpl_qoin6nZVcwcYQjnDTVoxeryJna8PPMhLC0-dMeDGgmHqn-OMaP8b8CxdWdbFodaqaBHMIkgkQdeGKIlDGTupjHLJiv4auxjteAYuf4GZQgWupYyHdGaR_EBdTyysoOIE8qoGkfkEyn3owz_UQW5wFxdGkJkdOWHIBkFwBjysRmHismw0uWYGleICt63-dyIK7ZJNjHxMYiSrSqFV3yjHFrwRlvW-282xX2fZqqly7zWgHEBpMGHl2wTuSBqNjgjg4SaYssSHgm6dwBrq2Y5-v3g';

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
