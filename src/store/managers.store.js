/* eslint-disable no-console */
import { getAllUsers, registerUser,deleteUserById } from '@/api/user';
import { MANAGER_ROLE } from '@/constants/roles.constant';

const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmMWMyNzQzYTJhZmY3YmZmZDBmODRhODY0ZTljMjc4ZjMxYmM2NTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4Mzk3ODMzLCJ1c2VyX2lkIjoia1RvU0NmUFIyWmJ6RXVabDZpOEllekdUOEhvMiIsInN1YiI6ImtUb1NDZlBSMlpiekV1Wmw2aThJZXpHVDhIbzIiLCJpYXQiOjE2NTgzOTc4MzMsImV4cCI6MTY1ODQwMTQzMywiZW1haWwiOiJzX3NtaXRoQG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNfc21pdGhAbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.GSmpkQMgkjoU7iuKPzMbIWdG8eTTP29rFbcKrtKV-XQAld1mecg23VpsW6vhDD7IspAbwH8e1fZ9P_z2rg0n7Lsb3KeBIWmGaDEZ4zxMGAxUpkK4mlJIoQhiZXTvdkie6KNluc7626oXgIbWuSbMxtmkvq12IvFeYMgbFtZHcVHM8Yvclzu9pIgtCSjJY_PgLl2gy_F61Ve4jmbNyA2JzCyqZIMSsuUr_QrH6WWXDMsyuxMAwoL2GVEeqcNmUli8FSQu_mzejFcHaGii-WDW2CZm-Pu3abyZ8BARiBaEbpo0xnGjVNRI8fgb1XkR5sEUklmaLG2mDDUEKj49hJA2VQ';

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
