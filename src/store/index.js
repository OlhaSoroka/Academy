import Vue from 'vue'
import Vuex from 'vuex'
import courses from './modules/courses';
import managers from './managers.store'



Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    courses,
	managers
  }
})

