import { getAuth, signOut } from "firebase/auth";

export default {
  namespased: true,
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
