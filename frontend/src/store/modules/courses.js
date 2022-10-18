import {db} from "../../main";
import {
	getAllCourses,
	deleteCourse,
	updateCourseById,
} from "../../api/course/index"
import {
	setDoc,
	doc,
	updateDoc
  } from "firebase/firestore";

export default {
	namespaced: true,
	state() {
		return {
			courses: [],
			isLoading: false,
		}
	},
	getters: {
		courses(state) {
			return state.courses
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
			state.courses = courses
		},
		changeLoadingStatus(state) {
			state.isLoading = !state.isLoading
		},
		sortCourses(state) {
			state.courses.sort((a, b) => a.date > b.date ? -1: 1)
		},
	},
	actions: {
		sortCourses({ commit }) {
			commit("sortCourses")
		},
		async getCourses({ commit, dispatch }) {
			commit("changeLoadingStatus")
			await getAllCourses()
				.then((data) => commit("setCourses", data))
				.catch((error) => {
					const errorMessage = error.response?.data?.error || error.message
					dispatch(
						"toast/show",
						{ message: errorMessage, type: "error" },
						{ root: true }
					)
				})
				.finally(() => commit("changeLoadingStatus"))
		},
		async createNewCourse( { dispatch }, data) {
			try {await setDoc(doc(db, "courses", `${data.id}`), data)
			.then(dispatch("getCourses"),
			dispatch(
				"toast/show",
				{ message: "Course succesfully created", type: "success" },
				{ root: true }
			))
		} 
			catch (error) {
					dispatch("getCourses")
					const errorMessage = error.response?.data?.error || error.message
					dispatch(
						"toast/show",
						{ message: errorMessage, type: "error" },
						{ root: true }
					)
				}
		},
		async addNewComment({ dispatch }, payload) {
			try { const courseRef = doc(db, "courses", `${payload.id}`);
            await updateDoc(courseRef, payload.currentItemUpdate)
				.then(() => {dispatch("getCourses"),
					dispatch(
							"toast/show",
							{ message: "Comment sent!", type: "success" },
							{ root: true }
						)
			})}
			catch (error) {
					dispatch("getCourses")
					const errorMessage = error.response?.data?.error || error.message
					dispatch(
						"toast/show",
						{ message: errorMessage, type: "error" },
						{ root: true }
					)
				}
		},
		async updateCourse({ dispatch }, payload) {
			try {await updateCourseById(payload.id, payload.course)
				.then(() => {
					dispatch("getCourses")
					dispatch(
						"toast/show",
						{ message: "Course succesfully updated", type: "success" },
						{ root: true }
					)
				})}
			catch (error) {
					dispatch("getCourses")
					const errorMessage = error.response?.data?.error || error.message
					dispatch(
						"toast/show",
						{ message: errorMessage, type: "error" },
						{ root: true }
					)
				}
		},
		deleteCourseFromState({ commit, dispatch }, id) {
			commit("changeLoadingStatus")
			deleteCourse(id)
				.then(() => {
					dispatch(
						"toast/show",
						{ message: "Course succesfully deleted", type: "success" },
						{ root: true }
					)
				})
				.catch((error) => {
					const errorMessage =
						error.response?.data?.error || error.response.data.message
					dispatch(
						"toast/show",
						{ message: errorMessage, type: "error" },
						{ root: true }
					)
				})
				.finally(() => {
					commit("changeLoadingStatus")
					dispatch("getCourses")
				})
		},
		patchCourses({ dispatch }, payload) {
			try {
				console.log(payload.course)
				.then(() => {
					dispatch("getCourses")
					dispatch(
						"toast/show",
						{ message: "Succesfully deleted", type: "success" },
						{ root: true }
					)
				})}
			catch (error)  {
					dispatch("getCourses")
					const errorMessage = error.response?.data?.error || error.message
					dispatch(
						"toast/show",
						{ message: errorMessage, type: "error" },
						{ root: true }
					)
				}
		},
	},
}
