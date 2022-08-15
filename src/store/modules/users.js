import {
  getAllUsers,
  updateUserByID,
  registerUser,
  deleteUserById,
} from "../../api/user/index";
import { USER_ROLE } from "@/constants/roles.constant";

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
    fetchUsers: async (store) => {
      const token = localStorage.getItem("accessToken");
      try {
        store.commit("TOGGLE_LOADIN_STATUS");
        const allUsers = await getAllUsers(token);
        const users = allUsers.filter((user) => user.role === USER_ROLE);
        store.commit("SET_USERS", users);
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true }
        );
      } finally {
        store.commit("TOGGLE_LOADIN_STATUS");
      }
    },
    updateUser: async (store, data) => {
      const token = localStorage.getItem("accessToken");
      try {
        store.commit("TOGGLE_LOADIN_STATUS");
        await updateUserByID(data.id, data, token);
        store.dispatch(
          "toast/show",
          { message: "User succesfully updated", type: "success" },
          { root: true }
        );
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true }
        );
      } finally {
        store.commit("TOGGLE_LOADIN_STATUS");
        store.dispatch("fetchUsers");
      }
    },
    createNewUser: async (store, data) => {
      const token = localStorage.getItem("accessToken");
      try {
        store.commit("TOGGLE_LOADIN_STATUS");
        await registerUser(data, token);
        store.dispatch(
          "toast/show",
          { message: "User succesfully created", type: "success" },
          { root: true }
        );
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true }
        );
      } finally {
        store.commit("TOGGLE_LOADIN_STATUS");
        store.dispatch("fetchUsers");
      }
    },
    deleteUser: async (store, id) => {
      const token = localStorage.getItem("accessToken");

      try {
        store.commit("TOGGLE_LOADIN_STATUS");
        await deleteUserById(id, token);
        store.dispatch(
          "toast/show",
          { message: "User succesfully deleted", type: "success" },
          { root: true }
        );
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true }
        );
      } finally {
        store.commit("TOGGLE_LOADIN_STATUS");
        store.dispatch("fetchUsers");
      }
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
