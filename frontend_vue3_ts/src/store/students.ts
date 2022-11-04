import { defineStore } from "pinia";
import { getCourseByName, updateCourseById } from "../api/course";
import {
	Course,
	CourseHomeworkResult,
	CourseMember,
	CourseResult,
	Homework,
} from "../api/models/course.model";
import { AppUser, RegisterUserBody } from "../api/models/user.model";
import {
	deleteUserById,
	getUsersByRole,
	registerUser,
	updateUserByID,
} from "../api/user";
import { ROLES } from "../models/router.model";
import { ToastType, useToastStore } from "./toast.store";

interface StudentState {
	students: AppUser[];
	isStudentLoading: boolean;
}

export const useStudentStore = defineStore("students", {
	state: (): StudentState => ({
		students: [],
		isStudentLoading: false,
	}),
	getters: {
		allStudents: (state) => state.students,
		studentsLoadingStatus: (state) => state.isStudentLoading,
		studentById: (state) => {
			return (studentId: string) =>
				state.students.find((student) => student.id === studentId);
		},
	},
	actions: {
		async fetchStudents() {
			try {
				this.isStudentLoading = true;
				this.students = await getUsersByRole(ROLES.STUDENTS_ROLE);
			} catch {
				const toastStore = useToastStore();
				toastStore.showToastMessage({
					message: "Error: Can't get students",
					type: ToastType.FAILURE,
				});
			} finally {
				this.isStudentLoading = false;
			}
		},
		async updateStudent(payload: AppUser) {
			try {
				this.isStudentLoading = true;
				await updateUserByID(payload.id, payload);
				const toastStore = useToastStore();
				toastStore.showToastMessage({
					message: "Student successfully updated",
					type: ToastType.SUCCESS,
				});
			} catch {
				const toastStore = useToastStore();
				toastStore.showToastMessage({
					message: "Error: Can't updated student",
					type: ToastType.FAILURE,
				});
			} finally {
				this.isStudentLoading = false;
			}
		},
		async createStudent(payload: RegisterUserBody) {
			try {
				this.isStudentLoading = true;
				const student = await registerUser(payload);
				let studentCourse: Course | null = null;

				if (student && student.course) {
					studentCourse = await getCourseByName(student.course);
				}

				if (studentCourse && student) {
					let homework: Homework[] = [];
					if (!!studentCourse.homework_results.length) {
						homework = [...studentCourse.homework_results[0].homework];
						for (const hw of homework) {
							hw.rate = 0;
							hw.link = "";
						}
					}

					studentCourse.group.push(new CourseMember(student).asObject());
					studentCourse.results.push(new CourseResult(student).asObject());
					studentCourse.homework_results.push(
						new CourseHomeworkResult(student, homework).asObject(),
					);

					console.log({studentCourse});
					
					await updateCourseById(`${studentCourse.id}`, studentCourse);

					const toastStore = useToastStore();
					toastStore.showToastMessage({
						message: "Student successfully created",
						type: ToastType.SUCCESS,
					});
				}
			} catch {
				const toastStore = useToastStore();
				toastStore.showToastMessage({
					message: "Error: Can't create student",
					type: ToastType.SUCCESS,
				});
			} finally {
				this.isStudentLoading = false;
			}
		},
		async deleteStudent(id: string) {
			try {
				this.isStudentLoading = true;
				const student = this.studentById(id);
				let studentCourse: Course | null = null;
		
				if (student && student.course) {
					studentCourse = await getCourseByName(student.course);
				}

				if (studentCourse && student) {
					const courseMemberIndex = studentCourse.group.findIndex(
						(member) => member.email === student.email,
					);
					const courseResultIndex = studentCourse.results.findIndex(
						(member) => member.email === student.email,
					);
					const courseHomeworkResultIndex =
						studentCourse.homework_results.findIndex(
							(member) => member.id === student.id,
						);

					studentCourse.group.splice(courseMemberIndex, 1);
					studentCourse.results.splice(courseResultIndex, 1);
					studentCourse.homework_results.splice(courseHomeworkResultIndex, 1);

					await updateCourseById(`${studentCourse.id}`, studentCourse);
					await deleteUserById(student.id);

					const toastStore = useToastStore();
					toastStore.showToastMessage({
						message: "Student successfully deleted",
						type: ToastType.SUCCESS,
					});
				}
			} catch {
				const toastStore = useToastStore();
				toastStore.showToastMessage({
					message: "Error: Can't delete student",
					type: ToastType.SUCCESS,
				});
			} finally {
				this.isStudentLoading = false;
			}
		},
	},
});
