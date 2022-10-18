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
      try {
        store.commit("TOGGLE_ADMINS_LOADING");
        const users = await getAllUsers();
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
      try {
        store.commit("TOGGLE_ADMINS_LOADING");
        await registerUser(admin);
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
      try {
        store.commit("TOGGLE_ADMINS_LOADING");
        await deleteUserById(id);
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

      try {
        store.commit("TOGGLE_ADMINS_LOADING");
        await updateUserByID(adminData.id, adminData);
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
