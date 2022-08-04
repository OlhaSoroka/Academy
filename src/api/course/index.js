import axios from "axios"
export const COURSES_URL = `https://fake-server-vue-js-app.herokuapp.com`

export const getAllCourses = async () => {
	const response = await axios.get(`${COURSES_URL}/posts`)
	return await response.data
}
export const updateCourseById = async (id, course) => {
	console.log(id, course)
	const response = axios.put(`${COURSES_URL}/posts/${id}`, course)
	return await response.data
}
