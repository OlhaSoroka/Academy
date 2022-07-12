import axios from "axios"
import {getAllCourses, COURSES_URL} from "../../api/course/index"

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
    loadingStatus(state){
      return state.isLoading
    },
    courseById(state){
        return id => {
        return state.courses.find(course => course.id === id)
    }
  },
    courseIndex(state) {
      return courseItem => {return state.courses.indexOf(courseItem)}
    },
    nextCourseId(state){
        return courseIndex => {if (courseIndex<state.courses.length-1){
          return state.courses[courseIndex+1].id} else {
            return state.courses[0].id
          }
    }
}},
  mutations: {
    setCourses(state, courses){
        state.courses = courses
      },
    changeLoadingStatus(state)
      {state.isLoading = !state.isLoading}
  },
  actions: {
    getCourses({commit}){
      commit('changeLoadingStatus')
      getAllCourses()
      .then((data) => commit('setCourses', data))
      // eslint-disable-next-line
      .catch(error => {console.log(error)})
      .finally(() => commit('changeLoadingStatus'))
  },
  newComment(context, payload){
    axios.put(`${COURSES_URL}/posts/${payload.id}`, payload.newCourseItem)
    // eslint-disable-next-line
    .catch(error => {console.log(error)})
    .then((response) => {
    if (response.status === 201) {context.dispatch('getCourses')}})
  },
}}