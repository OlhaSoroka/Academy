/* eslint-disable no-console */
import { getAllUsers, registerUser,deleteUserById } from '@/api/user';
import { MANAGER_ROLE } from '@/constants/roles.constant';

const token =
	'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmMWMyNzQzYTJhZmY3YmZmZDBmODRhODY0ZTljMjc4ZjMxYmM2NTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4MzAxOTk2LCJ1c2VyX2lkIjoia1RvU0NmUFIyWmJ6RXVabDZpOEllekdUOEhvMiIsInN1YiI6ImtUb1NDZlBSMlpiekV1Wmw2aThJZXpHVDhIbzIiLCJpYXQiOjE2NTgzMDE5OTYsImV4cCI6MTY1ODMwNTU5NiwiZW1haWwiOiJzX3NtaXRoQG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNfc21pdGhAbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.hc_LaCXPO2_1BaBlrQ0oJ8JYgnB5YkMGbqEYIXR4AtzKDhLcFWBuw9WhoT6ja-SoPxg8JMH5ZOs_VGzrAiKpezqHdG8B6RloXIKpv8bg5Q8Sry8_dLnOuZjJPo6I0mLATDrs-B_G7V2rSNsdqZEE2T_Q8Hik-uO9iNbg3HM8tpf8Gh2HztKCaEb7yoA6M5KDRzLBhABwOx4l6JxTdxWrt2ecI1SOCub9VzSrNrK38WkbhtMq7x21-Ysz6DTSfGM3-yaoV7b1NGCoMPr2sd7_pY8UwjNqNGGh4-zZOGlAq6VLMPkvRmOOHDJ1NPQRbXkJyBVzmsglIWwl6eh67imXWQ';

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
