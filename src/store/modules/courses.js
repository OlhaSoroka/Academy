import { getAllCourses } from "../../api/course/index";

export default {
  state() {
    return {
      courses: [],
      isLoading: false,
    };
  },
  getters: {
    courses(state) {
      return state.courses;
    },
    sortedCourses(state) {
      return state.courses.sort((a, b) => (a.date > b.date ? 1 : -1));
    },
    loadingStatus(state) {
      return state.isLoading;
    },
    courseById(state) {
      return (id) => {
        return state.courses.find((course) => course.id === +id);
      };
    },
  },
  mutations: {
    setCourses(state, courses) {
      state.courses = courses;
    },
    changeLoadingStatus(state) {
      state.isLoading = !state.isLoading;
    },
  },
  actions: {
    getCourses({ commit }) {
      commit("changeLoadingStatus");
      getAllCourses()
        .then((data) => commit("setCourses", data))
        // eslint-disable-next-line
        .catch((error) => {
          console.log(error);
        })
        .finally(() => commit("changeLoadingStatus"));
    },
  },
};
