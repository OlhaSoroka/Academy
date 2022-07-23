import {
  getAllUsers,
  updateUserByID,
  registerUser,
  deleteUserById,
  gethUserByID,
} from "../../api/user/index";
/* TODO: temporary. remove after Authorization implementation */
const token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmMWMyNzQzYTJhZmY3YmZmZDBmODRhODY0ZTljMjc4ZjMxYmM2NTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4NTkwNTYxLCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTg1OTA1NjEsImV4cCI6MTY1ODU5NDE2MSwiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.TDUbeEbnF36ve4h2-to9zdcP7ctIc72Rod0eKrP438ad8O8t4ohuJkD7aIWM3QCS1xaLkmw0XBmF8NVsvTb1LchcRDxWtw-L2vnoZ6qYhjVVvI2AD-j6ULXj2anI5IXxrWIrRXgGk4vw3j8m0JrT1vMGiPv1MYi-SsFAn34i4Smh-nplfQk9lPA8a5LCYkvvUopm92IMSVKWARfXelv1QenOYH8I01RHxG8Bk0ZzuRh3rjIB9DnwpiQvSIAZFZenQBav7aAk-5hG8NqrM87omdVgE9GWi2JKMM2jsUicOTTwyycHFMOHxARDQd84SQ8ZdFJdmOze9N55EJRjf0chdA";

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
    async fetchUsers(store, token) {
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
