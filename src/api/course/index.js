import axios from "../index";
export const COURSES_URL = `https://fake-server-vue-js-app.herokuapp.com`;

export const getAllCourses = async () => {
	const response = await axios.get(`${COURSES_URL}/posts`)
	return await response.data
}
export const updateCourseById = async (id, course) => {
	const response = axios.put(`${COURSES_URL}/posts/${id}`, course)
	return await response.data
}

export const patchCourse = async (id, field, value) => {
	const obj = {}
	obj[field] = value
	const response = axios.patch(`${COURSES_URL}/posts/${id}`, obj)
	return await response.data
}
export const deleteCourse = async (id) => {
	const response = axios.delete(`${COURSES_URL}/posts/${id}`)
	return await response.data
}
