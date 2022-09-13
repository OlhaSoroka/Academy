import {
  getAllUsers,
  updateUserByID,
  registerUser,
  deleteUserById,
} from "../../api/user/index";
import { STUDENTS_ROLE } from "@/constants/roles.constant";

export default {
  state: {
    students: [],
    isStudentLoading: false,
  },
  getters: {
    students: (state) => state.students,
    studentsLoadingStatus: (state) => state.isStudentLoading,
  },
  actions: {
    fetchStudents: async (store) => {
      const token = localStorage.getItem("accessToken");
      try {
        store.commit("TOGGLE_LOADING_STATUS");
        const allUsers = await getAllUsers(token);
        const students = allUsers.filter((user) => user.role === STUDENTS_ROLE);
        store.commit("SET_STUDENTS", students);
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true }
        );
      } finally {
        store.commit("TOGGLE_LOADING_STATUS");
      }
    },
    updateStudent: async (store, data) => {
      const token = localStorage.getItem("accessToken");
      try {
        store.commit("TOGGLE_LOADING_STATUS");
        await updateUserByID(data.id, data, token);
        store.dispatch(
          "toast/show",
          { message: "User successfully updated", type: "success" },
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
        store.commit("TOGGLE_LOADING_STATUS");
        store.dispatch("fetchStudents");
      }
    },
    createNewStudent: async (store, data) => {
      const token = localStorage.getItem("accessToken");
      try {
        store.commit("TOGGLE_LOADING_STATUS");
        await registerUser(data, token);
        store.dispatch(
          "toast/show",
          { message: "User successfully created", type: "success" },
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
        store.commit("TOGGLE_LOADING_STATUS");
        store.dispatch("fetchStudents");
      }
    },
    deleteStudent: async (store, id) => {
      const token = localStorage.getItem("accessToken");

      try {
        store.commit("TOGGLE_LOADING_STATUS");
        await deleteUserById(id, token);
        store.dispatch(
          "toast/show",
          { message: "User successfully deleted", type: "success" },
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
        store.commit("TOGGLE_LOADING_STATUS");
        store.dispatch("fetchStudents");
      }
    },
  },
  mutations: {
    SET_STUDENTS(state, students) {
      state.students = students;
    },
    TOGGLE_LOADING_STATUS(state) {
      state.isStudentLoading = !state.isStudentLoading;
    },
  },
  namespaced: true,
};
