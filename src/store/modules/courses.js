/* import axios from "axios" */
import axiosCall from "./service/coursesService"


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
      axiosCall
      .then((response) => commit('setCourses', response.data))
      .catch(error => {console.log(error)})
      .finally(() => commit('chengeLoadingStatus'))
  }
}}
  
