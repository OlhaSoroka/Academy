import { defineStore } from "pinia";
import { uuidv4 } from "@firebase/util";
import { getCourseById } from "../api/course";
import { createHomework, deleteStudentHomeworks } from "../api/homework";
import { Course } from "../api/models/course.model";
import { Homework } from "../api/models/homework.model";
import { AppUser, RegisterUserBody } from "../api/models/user.model";
import {
  deleteUserById,
  getUsersByRole,
  registerUser,
  updateUserByID,
} from "../api/user";
import { ROLES } from "../models/router.model";
import { ToastType, useToastStore } from "./toast.store";
import { Result } from "../api/models/result.model";
import { createResult, deleteStudentResults } from "../api/results";

interface StudentStoreState {
  students: AppUser[];
  studentLoading: boolean;
}

export const useStudentStore = defineStore("student", {
  state: (): StudentStoreState => ({
    students: [],
    studentLoading: false,
  }),
  getters: {
    allStudents: (state: StudentStoreState) => state.students,
    isStudentLoading: (state: StudentStoreState) => state.studentLoading,
    studentById: (state: StudentStoreState) => {
      return (studentId: string) =>
        state.students.find((student) => student.id === studentId);
    },
  },
  actions: {
    async fetchStudents() {
      try {
        this.studentLoading = true;
        this.students = await getUsersByRole(ROLES.STUDENTS_ROLE);
      } catch {
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't get students",
          type: ToastType.FAILURE,
        });
      } finally {
        this.studentLoading = false;
      }
    },
    async updateStudent(payload: AppUser) {
      try {
        this.studentLoading = true;
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
        this.fetchStudents();
      }
    },
    async createStudent(payload: RegisterUserBody) {
      try {
        this.studentLoading = true;
        const student = await registerUser(payload);
        let studentCourse: Course | null = null;

        if (student && student.courseId) {
          studentCourse = await getCourseById(student.courseId);
          if (studentCourse && student) {
            await createHomework(
              new Homework(uuidv4(), student.id, studentCourse.id),
            );
            await createResult(
              new Result(uuidv4(), student.id, studentCourse.id),
            );

            const toastStore = useToastStore();
            toastStore.showToastMessage({
              message: "Student successfully created",
              type: ToastType.SUCCESS,
            });
          }
        }
      } catch (error) {
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't create student",
          type: ToastType.FAILURE,
        });
      } finally {
        this.fetchStudents();
      }
    },
    async deleteStudent(studentId: string) {
      try {
        this.studentLoading = true;
        const student = this.students.find(
          (student) => student.id === studentId,
        );
        if (student) {
          await deleteUserById(studentId);
          await deleteStudentHomeworks(studentId);
          await deleteStudentResults(studentId);
          const toastStore = useToastStore();
          toastStore.showToastMessage({
            message: "Student successfully created",
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
        this.fetchStudents();
      }
    },
  },
});
