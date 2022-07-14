import {
  getAllUsers,
  updateUserByID,
  registerUser,
} from "../../api/user/index";
const token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVhNWY2NDYxMjA4Y2ZmMGVlYzgwZDFkYmI1MjgyZTkyMDY0MjAyNWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU3ODA0Nzg3LCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTc4MDQ3ODcsImV4cCI6MTY1NzgwODM4NywiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.p1KmZkBniMDUtQEBHpQsSz_TPQQDxeWeq4ihrw3TA4RWtRkQmaaVz0eiDjqTYFqPPvl9O7i_UqvKTq53mvliw33HuLbtqzbnvv1Zl9a_cnocl172XNPTXCgQtKkE7X2W2TUDNXXLdKBdyS0o9fQICiHLEdFCERP2aQz3Wn41q19QQ2ytItYq5a1iWTs0jiqgwzYLMmrOSq_QMTO5eC_uMS0LtQaBwyOTejfQEBff0w6LeowiD8r3UyonJNb4EMac8l6wBNUMAufz9dtYHePztTHuNXCpXZBOMWJalsq1wPTV9gk84PRdopDDJyjoDyR1-GQ1vBw4y3RAcvYF2AVwMg";

export default {
  state() {
    return {
      users: null,
      isLoading: true,
    };
  },

  getters: {
    users: (state) => state.users,
    loadingStatus: (state) => state.isLoading,
  },

  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_LOADIN_STATUS(state) {
      state.isLoading = !state.isLoading;
    },
  },

  actions: {
    async fetchUsers(store) {
      const users = await getAllUsers(token);
      //console.log(users, "users API");
      store.commit("SET_USERS", users);
      store.commit("SET_LOADIN_STATUS");
    },
    async updateUser(store, data) {
      await updateUserByID(store.state.user.id, data, token);
      store.dispatch("fetchUsers");
    },
    async createNewUser(store, data) {
      await registerUser(data);
      console.log(data, "data APi");
      store.dispatch("fetchUsers");
      store.commit("SET_LOADIN_STATUS");
    },
  },
};
