import axios from "axios"


export default {
    state() {
    return {
         courses: []
    }
  },
  getters: {
    getCourses(state) {
      return state.courses
    },
    getCoursesMainInfoSorted(state) {
        let Arr = [];
        state.courses.map((e)=> {Arr.push(new Object({name:e.name, date:e.date, status:e.status, id:e.id}))})
        return Arr.sort((a, b) => a.date > b.date ? 1 : -1)}
      },
  mutations: {
    SET_COURSES(state, courses){
        state.courses = courses
      }
  },
  actions: {
    GET_COURSES_FROM_API(context){
        axios.get('https://fake-server-vue-js-app.herokuapp.com/posts')
        .then((response) => context.commit('SET_COURSES', response.data))
        .catch(error => {console.log(error)})
  }
}}
  
