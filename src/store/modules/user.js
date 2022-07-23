import { getAuth, signOut } from 'firebase/auth'

export default {
  //namespaced: true,
  state: {
    user: {},
    accessToken: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
    accessToken: (state) => state.accessToken,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_ACCESS_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
    },
  },
  actions: {
    setUser(store, user) {
      store.commit("SET_USER", user);
      store.commit("SET_ACCESS_TOKEN", user.accessToken);
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
