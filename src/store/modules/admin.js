import {
  getAllUsers,
  updateUserByID,
  registerUser,
} from "../../api/user/index";
const token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVhNWY2NDYxMjA4Y2ZmMGVlYzgwZDFkYmI1MjgyZTkyMDY0MjAyNWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU3Nzk5Mjg2LCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTc3OTkyODYsImV4cCI6MTY1NzgwMjg4NiwiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.cRlRUf21s2nmcJALWNUOEjSRbj86k0sBjrg9phSSGE5gET3Pvk_Rn8dSrUu7K48Ax_kBOn2aNtDhapxqQ4UFpucy9pZ4RDxSoVuntrprJq_95V6AhSPLDK4EfGqGkKnHfxl6Uln259UqIG0Ne-AK2eLfppDeviLdTHevN9SbJMudU27lFmaAV80bb3ISEwKEBS51eWoF4HIt5uv4609NbrA-O6acs7EpHvTYYMp56nT6btgcYVKZamsVWHABGfwgfSDVo7b2Me1VBVj7SxFrm9CHtEg1JG2MlaPFjwKXAKQW5EAVamiKP_kJOBWEOVIlx9MMppDSEArAKNjQ2tL3pw";

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
      console.log(users, "users API");
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
