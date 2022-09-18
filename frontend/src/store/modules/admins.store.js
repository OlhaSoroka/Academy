/* eslint-disable no-console */
import {
  getAllUsers,
  registerUser,
  deleteUserById,
  updateUserByID,
} from "@/api/user";
import { ADMIN_ROLE } from "@/constants/roles.constant";

export default {
  state: {
    admins: [],
    isAdminsLoading: false,
  },
  getters: {
    admins: (state) => state.admins,
    isAdminsLoading: (state) => state.isAdminsLoading,
  },
  actions: {
    fetchAdmins: async (store) => {
      const token = localStorage.getItem("accessToken");

      try {
        store.commit("TOGGLE_ADMINS_LOADING");
        const users = await getAllUsers(token);
        const admins = users.filter((user) => user.role === ADMIN_ROLE);
        store.commit("SET_ADMINS", admins);
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true }
        );
      } finally {
        store.commit("TOGGLE_ADMINS_LOADING");
      }
    },
    createAdmin: async (store, admin) => {
      const token = localStorage.getItem("accessToken");

      try {
        store.commit("TOGGLE_ADMINS_LOADING");
        await registerUser(admin, token);
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
        store.commit("TOGGLE_ADMINS_LOADING");
        store.dispatch("fetchAdmins");
      }
    },
    deleteAdmin: async (store, id) => {
      const token = localStorage.getItem("accessToken");

      try {
        store.commit("TOGGLE_ADMINS_LOADING");
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
        store.commit("TOGGLE_ADMINS_LOADING");
        store.dispatch("fetchAdmins");
      }
    },
    updateAdmin: async (store, adminData) => {
      const token = localStorage.getItem("accessToken");

      try {
        store.commit("TOGGLE_ADMINS_LOADING");
        await updateUserByID(adminData.id, adminData, token);
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
        store.commit("TOGGLE_ADMINS_LOADING");
        store.dispatch("fetchAdmins");
      }
    },
  },
  mutations: {
    SET_ADMINS: (state, admins) => {
      state.admins = admins;
    },
    TOGGLE_ADMINS_LOADING: (state) => {
      state.isAdminsLoading = !state.isAdminsLoading;
    },
  },
  namespaced: true,
};
