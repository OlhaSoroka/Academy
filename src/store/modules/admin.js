import { getAllUsers, updateUserByID } from "../../api/user/index";
const token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVhNWY2NDYxMjA4Y2ZmMGVlYzgwZDFkYmI1MjgyZTkyMDY0MjAyNWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU3Nzg0NjE5LCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTc3ODQ2MTksImV4cCI6MTY1Nzc4ODIxOSwiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.rtCmFNsLJVoWjD1D1ULtAfKLf-kZ-P5mGKfCKqgMwmnOnpJBainreQKQ3xm809dEUhpso30eFin7RpbFR7RAdFFO2oT1XNdUcDPof8QlOwSgl_P_jBj1oQCHZYsAVP0rwCO7o-eXpO0zf143gS3i9_Jjlm4zz8jkrHh1jywEtWuTiu3q5xKhRukXp-8CA8l3VW5GNARaEtJf_y8gJclY54FIrpklwKMhGMiL3XCr9PPNbf8yJ2jUwfmWkLPMPsm4LE34n5ANiXy5kj1AtKPlLayahQcCyV7bRNQezdoKrGNEGWBcHzhzcY5QXyTUOZwIemMLSXYaZDufVei7GCSeoA";

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
