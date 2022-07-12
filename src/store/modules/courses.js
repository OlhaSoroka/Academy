import {getAllCourses} from "../../api/course/index"

export default {
    state() {
    return {
         courses: [],
         isLoading: true
    }
  },
  getters: {
    courses(state) {
      return state.courses
    },
    sortedCourses(state) {
      return state.courses.sort((a, b) => a.date > b.date ? 1 : -1)
    },
    loadingStatus(state){
      return state.isLoading
    }},
  mutations: {
    setCourses(state, courses){
        state.courses = courses
      },
    chengeLoadingStatus(state)
      {state.isLoading = false}
  },
  actions: {
    getCourses({commit}){
      getAllCourses()
      .then((data) => commit('setCourses', data))
      .catch(error => {this.$router.push({ path: '/404', params: {error: error}})})
      .finally(() => commit('chengeLoadingStatus'))
  }
}}
  
