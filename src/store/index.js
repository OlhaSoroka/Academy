import Vue from 'vue'
import Vuex from 'vuex'
import courses from './modules/courses'
import adminMembers from "./modules/adminMembers";
import user from './modules/user.store';

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
    adminMembers,
    user
  }
})
