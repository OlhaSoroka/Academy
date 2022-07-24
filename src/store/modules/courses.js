import { getAllCourses, COURSES_URL } from "../../api/course/index"
import axios from 'axios'

export default {
  state() {
    return {
      courses: [],
      isLoading: false
    }
  },
  getters: {
    courses(state) {
      return state.courses
    },
    sortedCourses(state) {
      return state.courses.sort((a, b) => a.date > b.date ? 1 : -1)
    },
    loadingStatus(state) {
      return state.isLoading
    }
  },
  mutations: {
    setCourses(state, courses) {
      state.courses = courses
    },
    addCourse(state, course) {
      axios.post(`${COURSES_URL}/posts`, course).then(
       state.courses.push(course)
      );
    },
    changeLoadingStatus(state) { state.isLoading = !state.isLoading }
  },
  actions: {
    getCourses({ commit }) {
      commit('changeLoadingStatus')
      getAllCourses()
        .then((data) => commit('setCourses', data))
        // eslint-disable-next-line
        .catch(error => { console.log(error) })
        .finally(() => commit('changeLoadingStatus'))
    },
    addCourseToState({commit}, course){
      commit('addCourse', course)
    },

  }
}