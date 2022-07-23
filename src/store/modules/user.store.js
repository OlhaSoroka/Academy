import {
  getAllUsers,
  updateUserByID,
  registerUser,
  deleteUserById,
} from "../../api/user/index";
/* TODO: temporary. remove after Authorization implementation */
const token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmMWMyNzQzYTJhZmY3YmZmZDBmODRhODY0ZTljMjc4ZjMxYmM2NTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4MzE0MTA0LCJ1c2VyX2lkIjoia1RvU0NmUFIyWmJ6RXVabDZpOEllekdUOEhvMiIsInN1YiI6ImtUb1NDZlBSMlpiekV1Wmw2aThJZXpHVDhIbzIiLCJpYXQiOjE2NTgzMTQxMDQsImV4cCI6MTY1ODMxNzcwNCwiZW1haWwiOiJzX3NtaXRoQG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNfc21pdGhAbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.BEC8TiV9qMQ-OUvgdUwNTtRAplfhps1YoNGF7SvO8GkDxwXsDY9tE4-lJTFWo_gmXfn2jCOHmLZbds375zqkgIBI3qcatikbKBA8ZlKm0Gx4wbVYM6kU7SqDNoESvWrIvk-nWQCpsHapT1Kwe2kJvYb_wVMG4j6iiOoHOTpl1Dm4CHABdKJUvGIR5UHidGsA0Vf6KMCWLmV3vbJrbD4XB2q3pRBQP2d1xWrHSYdk1ec_exIq2Anz2YeUTArQobI0GG1t90b_oUAc0lSjTWyNxczh5LPfhKXf1vK_QUpDOkxS1JWH6VZY6v6DWwJ4LmkcR13CyP8-Ts8hsXOCjuzk-g";

export default {
  state: {
    user: null,
    users: null,
    isImageLoading: true,
    isUsersLoading: true,
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
    SET_LOADIN_STATUS(state) {
      state.isUsersLoading = !state.isUsersLoading;
    },
  },
  namespaced: true,
};
