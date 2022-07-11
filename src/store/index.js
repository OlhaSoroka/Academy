import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {      
    }
  },
  getters: {},
  mutations: {
    setUser(state, user){
      state.user = user
    }
  },
  actions: {
    setUserToState({commit}, user){
      commit('setUser', user)      
      console.log(user);
    }
  },
  modules: {},
});
