import Vue from 'vue';
import Vuex from 'vuex';
import courses from './modules/courses';
import user from './modules/user.store';
import managers from './modules/managers.store';
import toast from './modules/toast.store';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		courses,
		user,
		managers,
		toast,
	},
});
