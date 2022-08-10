import axios from "axios";
import { getAllCourses, COURSES_URL, updateCourseById } from "../../api/course/index";
export default {
  namespaced: true,
  state() {
    return {
      courses: [],
      isLoading: false,
      errorNewComment: "",
    };
  },
  getters: {
		courses(state) {
			return state.courses
		},
		sortedCourses(state) {
			return state.courses.sort((a, b) => (a.date > b.date ? 1 : -1))
		},
		lastCourseId(state) {
			return state.courses[state.courses.length - 1].id
		},
		firstCourseId(state) {
			return state.courses[0].id
		},
		loadingStatus(state) {
			return state.isLoading
		},
		getCourseById(state) {
			return (id) => {
				return state.courses.find((course) => course.id === +id)
			}
		},
		courseIndex(state) {
			return (courseItem) => state.courses.indexOf(courseItem)
		},
		nextCourseId(state, getters) {
			return (id) => {
				let currentIndex = getters.courseIndex(getters.getCourseById(id))
				if (currentIndex < state.courses.length - 1) {
					return state.courses[currentIndex + 1].id
				} else return state.courses[0].id
			}
		},
		getErrorNewComment(state) {
			return state.errorNewComment
		},
		previousCourseId(state, getters) {
			return (id) => {
				let currentIndex = getters.courseIndex(getters.getCourseById(id))
				if (currentIndex > 0) {
					return state.courses[currentIndex - 1].id
				} else return state.courses[state.courses.length - 1].id
			}
		},
	},
  mutations: {
    setCourses(state, courses) {
      state.courses = courses;
    },
    changeLoadingStatus(state) {
      state.isLoading = !state.isLoading;
    },
    setError(state, errorNewComment) {
      state.errorNewComment = errorNewComment;
    },
    deleteCourse(state, id){
      axios.delete(`${COURSES_URL}/posts/${id}`)
      const targetCourse = this.courses.find(course => course.id === id);
      const targetCourseIndex = this.courses.findIndex(targetCourse);
      state.courses.splice(targetCourseIndex, 1);
    },
    addCourse(state, newCourse) {
      axios.post(`${COURSES_URL}/posts`, newCourse).then(
        state.courses.push(newCourse)
      );
    }
  },
  actions: {
    getCourses({ commit, dispatch }) {
      commit("changeLoadingStatus");
      getAllCourses()
        .then((data) => commit("setCourses", data))
        .catch((error) => {
          const errorMessage = error.response?.data?.error || error.message;
          dispatch(
            "toast/show",
            { message: errorMessage, type: "error" },
            { root: true }
          )
        })
        .finally(() => commit("changeLoadingStatus"));
    },
    deleteCourseFromState({commit}, id){
      commit("deleteCourse", id)
    },
    addCourseToState({ commit }, newCourse) {
      commit("addCourse", newCourse)
    },
    addNewComment({ dispatch }, payload) {
      axios
        .put(`${COURSES_URL}/posts/${payload.id}`, payload.currentItemUpdate)
        .then((response) => {
          if (response.status >= 200 && response.status <= 204) {
            dispatch("getCourses");
            dispatch(
              "toast/show",
              { message: "Comment sent!", type: "success" },
              { root: true }
            );
          }
        })
        .catch((error) => {
          dispatch("getCourses");
          const errorMessage = error.response?.data?.error || error.message;
          dispatch(
            "toast/show",
            { message: errorMessage, type: "error" },
            { root: true }
          )
        });
    },
    async addNewApplicant({ dispatch }, payload) {
			const { id, course } = payload
			dispatch("getCourses")
			updateCourseById(id, course)
		},
  },
};
