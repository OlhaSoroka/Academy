import Vue from 'vue';
import Vuex from 'vuex';

import managers from './managers.store';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		managers,
	},
});
