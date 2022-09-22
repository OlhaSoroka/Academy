import { getAllUsers, updateUserByID, registerUser, deleteUserById } from '../../api/user/index';
import { STUDENTS_ROLE } from '@/constants/roles.constant';
import { getAllCourses, updateCourseById } from '@/api/course';
import { createGroupMember, updateGroupMember } from '@/helpers/createUpdateGroupMember';
import { createResultMember , updateResultMember } from '@/helpers/createUpdateResultMember'; 

export default {
	state: {
		students: [],
		isStudentLoading: false,
	},
	getters: {
		students: (state) => state.students,
		studentsLoadingStatus: (state) => state.isStudentLoading,
	},
	actions: {
		fetchStudents: async (store) => {
			const token = localStorage.getItem('accessToken');
			try {
				store.commit('TOGGLE_LOADING_STATUS');
				const allUsers = await getAllUsers(token);
				const students = allUsers.filter((user) => user.role === STUDENTS_ROLE);
				store.commit('SET_STUDENTS', students);
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.response.data.message;
				store.dispatch('toast/show', { message: errorMessage, type: 'error' }, { root: true });
			} finally {
				store.commit('TOGGLE_LOADING_STATUS');
			}
		},
		updateStudent: async (store, data) => {
			const token = localStorage.getItem('accessToken');
			try {
				store.commit('TOGGLE_LOADING_STATUS');
				const email = await updateUserByID(data.id, data, token);
				const allUsers = await getAllUsers(token);
				const student = allUsers.find((user) => user.email === email);
				const allCourses = await getAllCourses();
				const studentsCourse = allCourses.find((course) => course.name === student.course);
				if (studentsCourse) {
					const groupMember = studentsCourse.group.find(member => member.email === student.email);
					const resultMember = studentsCourse.group.find(member => member.email === student.email);
					const updatedGroupMember = {
						...groupMember,
						...updateGroupMember(student)
					};
					const updatedResultMember = {
						...resultMember,
						...updateResultMember(student)
					};
					const indexToUpdateGroupMember = studentsCourse.group.find(member => member.email === student.email);
					const indexToUpdateResultMember = studentsCourse.results.find(member => member.email === student.email);
					studentsCourse.group.splice(indexToUpdateGroupMember, 1, updatedGroupMember);
					studentsCourse.results.splice(indexToUpdateResultMember, 1, updatedResultMember);
					await updateCourseById(studentsCourse.id, studentsCourse);
				}
				store.dispatch('toast/show', { message: 'User successfully updated', type: 'success' }, { root: true });
			} catch (error) {
				console.log(error);
				const errorMessage = error.response?.data?.error || error.response?.data?.message;
				store.dispatch('toast/show', { message: errorMessage, type: 'error' }, { root: true });
			} finally {
				store.commit('TOGGLE_LOADING_STATUS');
				store.dispatch('fetchStudents');
			}
		},
		createNewStudent: async (store, data) => {
			const token = localStorage.getItem('accessToken');
			try {
				store.commit('TOGGLE_LOADING_STATUS');
				const response = await registerUser(data, token);
				const allUsers = await getAllUsers(token);
				const student = allUsers.find((user) => user.email === response.email);
				const allCourses = await getAllCourses();
				const studentsCourse = allCourses.find((course) => course.name === student.course);
				if (studentsCourse) {
					const groupMember = createGroupMember(student);
					const resultMember = createResultMember(student);
					studentsCourse.group.push(groupMember);
					studentsCourse.results.push(resultMember);
					await updateCourseById(studentsCourse.id, studentsCourse);
				}
				store.dispatch('toast/show', { message: 'User successfully created', type: 'success' }, { root: true });
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.response?.data?.message;
				store.dispatch('toast/show', { message: errorMessage, type: 'error' }, { root: true });
			} finally {
				store.commit('TOGGLE_LOADING_STATUS');
				store.dispatch('fetchStudents');
			}
		},
		deleteStudent: async (store, id) => {
			const token = localStorage.getItem('accessToken');

			try {
				store.commit('TOGGLE_LOADING_STATUS');
				await deleteUserById(id, token);
				store.dispatch('toast/show', { message: 'User successfully deleted', type: 'success' }, { root: true });
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.response.data.message;
				store.dispatch('toast/show', { message: errorMessage, type: 'error' }, { root: true });
			} finally {
				store.commit('TOGGLE_LOADING_STATUS');
				store.dispatch('fetchStudents');
			}
		},
	},
	mutations: {
		SET_STUDENTS(state, students) {
			state.students = students;
		},
		TOGGLE_LOADING_STATUS(state) {
			state.isStudentLoading = !state.isStudentLoading;
		},
	},
	namespaced: true,
};
