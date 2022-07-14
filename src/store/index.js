import Vue from "vue";
import Vuex from "vuex";
import adminMembers from "./modules/adminMembers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    adminMembers,
  },
});
