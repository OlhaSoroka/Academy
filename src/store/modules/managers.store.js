/* eslint-disable no-console */
import {
  getAllUsers,
  registerUser,
  deleteUserById,
  updateUserByID,
} from "@/api/user";
import { MANAGER_ROLE } from "@/constants/roles.constant";

const token = localStorage.getItem("accessToken");

export default {
  state: {
    managers: [],
    isManagersLoading: false,
    error: null,
  },
  getters: {
    managers: (state) => state.managers,
    isManagersLoading: (state) => state.isManagersLoading,
    error: (state) => state.error,
  },
  actions: {
    fetchManagers: async (store) => {
      try {
        store.commit("TOGGLE_MANAGERS_LOADING");
        const users = await getAllUsers(token);
        const managers = users.filter((user) => user.role === MANAGER_ROLE);
        store.commit("SET_MANAGERS", managers);
      } catch (error) {
        const responseError = error.response?.data?.error || error.message;
        store.commit("SET_ERROR", responseError);
      } finally {
        store.commit("TOGGLE_MANAGERS_LOADING");
      }
    },
    createManager: async (store, manager) => {
      try {
        store.commit("TOGGLE_MANAGERS_LOADING");
        await registerUser(manager, token);
      } catch (error) {
        const responseError = error.response?.data?.error || error.message;
        store.commit("SET_ERROR", responseError);
      } finally {
        store.commit("TOGGLE_MANAGERS_LOADING");
        store.dispatch("fetchManagers");
      }
    },
    deleteManager: async (store, id) => {
      try {
        store.commit("TOGGLE_MANAGERS_LOADING");
        await deleteUserById(id, token);
      } catch (error) {
        const responseError = error.response?.data?.error || error.message;
        store.commit("SET_ERROR", responseError);
      } finally {
        store.commit("TOGGLE_MANAGERS_LOADING");
        store.dispatch("fetchManagers");
      }
    },
    updateManager: async (store, managerData) => {
      try {
        store.commit("TOGGLE_MANAGERS_LOADING");
        await updateUserByID(managerData.id, managerData, token);
      } catch (error) {
        const responseError = error.response?.data?.error || error.message;
        store.commit("SET_ERROR", responseError);
      } finally {
        store.commit("TOGGLE_MANAGERS_LOADING");
        store.dispatch("fetchManagers");
      }
    },
  },
  mutations: {
    SET_MANAGERS: (state, managers) => {
      state.managers = managers;
    },
    TOGGLE_MANAGERS_LOADING: (state) => {
      state.isManagersLoading = !state.isManagersLoading;
    },
    SET_ERROR: (state, error) => {
      state.error = error;
    },
  },
  namespaced: true,
};
