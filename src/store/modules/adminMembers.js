import {
  getAllUsers,
  updateUserByID,
  registerUser,
  deleteUserById,
} from "../../api/user/index";
const token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVhNWY2NDYxMjA4Y2ZmMGVlYzgwZDFkYmI1MjgyZTkyMDY0MjAyNWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU3ODg3MDQxLCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTc4ODcwNDEsImV4cCI6MTY1Nzg5MDY0MSwiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.siFv5R_nJh8V3qoEHfWdyGZ15Pm-qiopG1kXvry_dKFb5p4mnZXtrmHke7bDrOggZ0QshjZeck6udYLu0KLxJHR1ue8P3G1qFc38LJXbsWBhBurb14IYzta8YPtj8z1jaoVM4FnDsD6LfWFWDesz3aMAJc2QmJ7LQApdegHgc66u3v98ZX4MUEag3KXRCn-FLWSefX8XmzNsXY-ls8mNgHM0vlX4qNTvLvM19d3SaSHmJgtwLticLoZ_gVTOcU_83vN-W74UAiZlx7XbYy8FfVwCUVTTF5dEsFyHAEoER6727g25MvjdXgE6EVARyZKEi1qpzk_4_rbv7i_odmxgsQ";

export default {
  state() {
    return {
      users: null,
      usersToggleLoading: true,
    };
  },

  getters: {
    users: (state) => state.users,
    usersLoadingStatus: (state) => state.usersToggleLoading,
  },

  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_LOADIN_STATUS(state) {
      state.usersToggleLoading = !state.usersToggleLoading;
    },
  },

  actions: {
    async fetchUsers(store) {
      const users = await getAllUsers(token);
      store.commit("SET_USERS", users);
      store.commit("SET_LOADIN_STATUS");
    },
    async updateUser(store, data) {
      await updateUserByID(data.id, data, token);
      store.dispatch("fetchUsers");
    },
    async createNewUser(store, data) {
      await registerUser(data);
      store.dispatch("fetchUsers");
    },
    async deleteUser(store, id) {
      await deleteUserById(id, token);
      store.dispatch("fetchUsers");
    },
  },
};
