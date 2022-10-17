/* eslint-disable no-console */
import {
  getAllUsers,
  registerUser,
  deleteUserById,
  updateUserByID,
} from "@/api/user";
import { MENTOR_ROLE } from "@/constants/roles.constant";

export default {
  state: {
    mentors: [],
    isMentorsLoading: false,
  },
  getters: {
    mentors: (state) => state.mentors,
    isMentorsLoading: (state) => state.isMentorsLoading,
  },
  actions: {
    fetchMentors: async (store) => {
      try {
        store.commit("TOGGLE_MENTORS_LOADING");
        const users = await getAllUsers();
        const mentors = users.filter((user) => user.role === MENTOR_ROLE);
        store.commit("SET_MENTORS", mentors);
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true }
        );
      } finally {
        store.commit("TOGGLE_MENTORS_LOADING");
      }
    },
    createMentor: async (store, mentor) => {
      try {
        store.commit("TOGGLE_MENTORS_LOADING");
        await registerUser(mentor);
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
        store.commit("TOGGLE_MENTORS_LOADING");
        store.dispatch("fetchMentors");
      }
    },
    deleteMentor: async (store, id) => {
      try {
        store.commit("TOGGLE_MENTORS_LOADING");
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
        store.commit("TOGGLE_MENTORS_LOADING");
        store.dispatch("fetchMentors");
      }
    },
    updateMentor: async (store, mentorData) => {

      try {
        store.commit("TOGGLE_MENTORS_LOADING");
        await updateUserByID(mentorData.id, mentorData);
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
        store.commit("TOGGLE_MENTORS_LOADING");
        store.dispatch("fetchMentors");
      }
    },
  },
  mutations: {
    SET_MENTORS: (state, mentors) => {
      state.mentors = mentors;
    },
    TOGGLE_MENTORS_LOADING: (state) => {
      state.isMentorsLoading = !state.isMentorsLoading;
    },
  },
  namespaced: true,
};
