import { getAuth, signOut } from 'firebase/auth'

export default {
  state: {
    user: {},
    accessToken: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
    //accessToken: (state) => state.accessToken,
    accessToken(state) {
      console.log(state.accessToken, "token in user.js store");
      return state.accessToken;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_ACCESS_TOKEN(state, accessToken) {
      console.log(accessToken, "SET_ACCESS_TOKEN");
      state.accessToken = accessToken;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("SET_USER", user);
      commit("SET_ACCESS_TOKEN", user.accessToken);
    },
    logoutUser() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          localStorage.removeItem("user");
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
};
