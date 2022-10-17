import { getAllUsers, updateUserByID, registerUser, deleteUserById } from '../../api/user/index';
import { STUDENTS_ROLE } from '@/constants/roles.constant';
import { getAllCourses, updateCourseById } from '@/api/course';
import { createGroupMember, updateGroupMember } from '@/helpers/createUpdateGroupMember';
import { createResultMember , updateResultMember } from '@/helpers/createUpdateResultMember'; 
import { createHomeworkResaltsMember, updateHomeworkResaltsMember } from '@/helpers/createNewHomeworkResultsMember'; 

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
			try {
				store.commit('TOGGLE_LOADING_STATUS');
				const allUsers = await getAllUsers();
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
			try {
				store.commit('TOGGLE_LOADING_STATUS');
				const email = await updateUserByID(data.id, data);
				const allUsers = await getAllUsers();
				const student = allUsers.find((user) => user.email === email);
				const allCourses = await getAllCourses();
				const studentsCourse = allCourses.find((course) => course.name === student.course);
				if (studentsCourse) {
					const groupMember = studentsCourse.group.find(member => member.email === student.email);
					const resultMember = studentsCourse.results.find(member => member.email === student.email);
					const resultHomeworkMember = studentsCourse.homework_results.find(member => member.id === student.id);
					const updatedGroupMember = {
						...groupMember,
						...updateGroupMember(student)
					};
					const updatedResultMember = {
						...resultMember,
						...updateResultMember(student)
					};
					const updatedHomeworkResultMember = {
						...resultHomeworkMember,
						...updateHomeworkResaltsMember(student)
					};
					const indexToUpdateGroupMember = studentsCourse.group.findIndex(member => member.email === student.email);
					const indexToUpdateResultMember = studentsCourse.results.findIndex(member => member.email === student.email);
					const indexToUpdateHomeworkResultMember = studentsCourse.homework_results.findIndex(member => member.id === student.id);
					studentsCourse.group.splice(indexToUpdateGroupMember, 1, updatedGroupMember);
					studentsCourse.results.splice(indexToUpdateResultMember, 1, updatedResultMember);
					studentsCourse.homework_results.splice(indexToUpdateHomeworkResultMember, 1, updatedHomeworkResultMember);
					await updateCourseById(studentsCourse.id, studentsCourse);
				}
				store.dispatch('toast/show', { message: 'User successfully updated', type: 'success' }, { root: true });
			} catch (error) {
				const errorMessage = error.response?.data?.error || error.response?.data?.message;
				store.dispatch('toast/show', { message: errorMessage, type: 'error' }, { root: true });
			} finally {
				store.commit('TOGGLE_LOADING_STATUS');
				store.dispatch('fetchStudents');
			}
		},
		createNewStudent: async (store, data) => {
			try {
				store.commit('TOGGLE_LOADING_STATUS');
				const student =  await registerUser(data);
				const allCourses = await getAllCourses();
				const studentsCourse = allCourses.find((course) => course.name === student.course);
				if (studentsCourse) {
					let homework = [];
					if (studentsCourse.homework_results[0]) {
					homework=JSON.parse(JSON.stringify(studentsCourse.homework_results[0].homework));
					homework.forEach(element => {
						element.rate = 0;
						element.link = '';
					})}
					const groupMember = createGroupMember(student);
					const resultMember = createResultMember(student);
                    const resultHomeworkMember = createHomeworkResaltsMember(student, homework);
					studentsCourse.group.push(groupMember);
					studentsCourse.results.push(resultMember);
					studentsCourse.homework_results.push(resultHomeworkMember);
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
			try {
				store.commit('TOGGLE_LOADING_STATUS');
				await deleteUserById(id);
				store.dispatch('toast/show', { message: 'User successfully deleted', type: 'success' }, { root: true });
			} catch (error) {
				console.log({error});
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
