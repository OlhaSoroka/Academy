
export default {
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
    setUser({ commit }, user) {      
      commit("SET_USER", user);
    },
  },
  modules: {},
};
