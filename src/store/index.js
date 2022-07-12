import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
  },
  getters: {
    user(state) {
      return state.user;
    },
    accessToken(state) {
      return state.user.stsTokenManager.accessToken;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    setUserToState({ commit }, user) {
      commit("SET_USER", user);
    },
  },
  modules: {},
});
