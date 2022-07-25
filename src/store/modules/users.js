import {
  getAllUsers,
  updateUserByID,
  registerUser,
  deleteUserById,
} from "../../api/user/index";

const token = localStorage.getItem("accessToken");

export default {
  state: {
    users: [],
    isUsersLoading: false,
  },
  getters: {
    users: (state) => state.users,
    usersLoadingStatus: (state) => state.isUsersLoading,
  },
  actions: {
    async fetchUsers(store) {
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
    SET_USERS(state, users) {
      state.users = users;
    },
    TOGGLE_LOADIN_STATUS(state) {
      state.isUsersLoading = !state.isUsersLoading;
    },
  },
  namespaced: true,
};
