import {
  getAllUsers,
  updateUserByID,
  registerUser,
  deleteUserById,
  gethUserByID,
} from "../../api/user/index";
/* TODO: temporary. remove after Authorization implementation */
const token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmMWMyNzQzYTJhZmY3YmZmZDBmODRhODY0ZTljMjc4ZjMxYmM2NTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4NjYzMDY3LCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTg2NjMwNjcsImV4cCI6MTY1ODY2NjY2NywiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.L4hl7VNvnTjmmcHDqkWAGOFuztgRn1SDRI3iyfRZkR7eaRTZb5mbJMBIwhk7cNHP5UvUqCRygEUNgEkOOkiawpy9mvTgAiCST--C1ymsvrN_Zp7H39bXsT8kIfb5mAR1ZkztOWXcXTlLtcfX27PWOEMkLw4A9kTCiQSsStNt2jsjQ7LnLJxOrSrI2StM9vvOOfVbJsBQBdBB1cteFl7CfQ86_IQVLzYmXogEdZh1jI0Pj_q7JIqttgblGHiepG4XaF9iMjq0ANlZs72iI1WgAZNzOq5gFntkxVK-fAy5lSdb_0AxDWGLx-G9RRVUfGGhaCFgVbA1RkqqgTBrJ4J3eg";

export default {
  state: {
    user: null,
    users: [],
    isImageLoading: true,
    isUsersLoading: false,
  },
  getters: {
    user: (state) => state.user,
    users: (state) => state.users,
    isImageLoading: (state) => state.isImageLoading,
    usersLoadingStatus: (state) => state.isUsersLoading,
  },
  actions: {
    async fetchUser(store, id) {
      const user = await gethUserByID(id, token);
      store.commit("SET_USER", user);
      if (store.getters.isImageLoading) {
        store.commit("TOGGLE_IMAGE_LOADING");
      }
    },
    async changePassword(store, password) {
      await updateUserByID(
        store.state.user.id,
        {
          password,
          email: store.state.user.email,
        },
        token
      );
    },
    async changeProfileImage(store, image) {
      store.commit("TOGGLE_IMAGE_LOADING");
      const formData = new FormData();
      formData.append("avatar", image);
      await updateUserByID(store.state.user.id, formData, token);
      store.dispatch("fetchUser", store.state.user.id);
    },
    async fetchUsers(store, token) {
      store.commit("TOGGLE_LOADIN_STATUS");
      await getAllUsers(token)
        .then((data) => store.commit("SET_USERS", data))
        // eslint-disable-next-line
        .catch((error) => {
          console.log(error);
        })
        .finally(() => store.commit("TOGGLE_LOADIN_STATUS"));
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
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    TOGGLE_IMAGE_LOADING(state) {
      state.isImageLoading = !state.isImageLoading;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    TOGGLE_LOADIN_STATUS(state) {
      state.isUsersLoading = !state.isUsersLoading;
    },
  },
  namespaced: true,
};
