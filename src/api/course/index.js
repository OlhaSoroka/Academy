import axios from "axios";
export const COURSES_URL = `https://fake-server-vue-js-app.herokuapp.com`;

export const getAllCourses = async () => {
  const response = await axios.get(`${COURSES_URL}/posts`);
  return await response.data;
};

export const addNewCourse = async(payload, data, token) => {
  const response = await axios
    .post(`${COURSES_URL}/posts/${payload.id}`, data, token)
    .catch((error) => {
      console.log(error)
    })
    return await response.data;
}