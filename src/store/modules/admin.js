import { getAllUsers, updateUserByID } from "../../api/user/index";
const token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVhNWY2NDYxMjA4Y2ZmMGVlYzgwZDFkYmI1MjgyZTkyMDY0MjAyNWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU3Nzg5ODU5LCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTc3ODk4NTksImV4cCI6MTY1Nzc5MzQ1OSwiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.pXzY562SWUe22mW-6CvO7hjLIgtNxG-_UV_cyj8fGxvXPAA93i_vTnMUh8yhCCnehO8oauHspvTe_Duelv5KdQuSG5RJaI4m0iODhB7wbxYcUb4uwP6SPPqDru-MUsWZaE33Hfp41KfzC13k_ZmaI7pRpQkj-FyD139JL1Kz5onfJGUsmV0rFwxkjbTrWwjOZel4UHo2juY32E2EM90WGtFLAeTPHo6UYR2cRboQYnwTuEYBu2Y_hUWKcgehmPos82SKbZY1DfE4x3IZDgEXDgzUbWP-Ojnsvuh-yJcd_bN08X62wuGaJNStaH_T6-b-oBUgN68ROthJfF8JQFwvGA";

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
    changeLoadingStatus(state) {
      state.isLoading = !state.isLoading;
    },
  },

  actions: {
    async fetchUsers(store) {
      const users = await getAllUsers(token);
      store.commit("SET_USERS", users);
      //commit("TOGGLE_LOADING", true);
    },
    async updateUser(store, data) {
      const user = await updateUserByID(store.state.user.id, data, token);
      console.log(user, "user in API");
      store.dispatch("fetchUsers");
    },
  },
};
