import Vue from "vue";
import Vuex from "vuex";
import courses from "./modules/courses";
import user from "./modules/user"
import users from "./modules/users";
import managers from './modules/managers.store';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    courses,
    user,
    users,
    managers,
  },
});
