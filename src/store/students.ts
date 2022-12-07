import { acceptHMRUpdate, defineStore } from "pinia";
import { uuidv4 } from "@firebase/util";
import { getAllCourses, getCourseById } from "../api/course";
import { Course, CourseStatus } from "../api/models/course.model";
import { AppUser, RegisterUserBody } from "../api/models/user.model";
import { StudentHomework } from "../api/models/homework.model";
import {
  deleteUserById,
  getUsersByRole,
  registerUser,
  updateUserByID,
} from "../api/user";
import { ROLES } from "../models/router.model";
import { ToastType, useToastStore } from "./toast.store";
import { createEntryResult, deleteStudentEntryResults } from "../api/entry_results";
import { createExitResult, deleteStudentExitResults } from "../api/exit_results";
import { EntryResult } from "../api/models/result.model";
import { ExitResult } from "../api/models/result.model";
import { getCoursesHomeworks, updateHomeworkById } from "../api/homework";

interface StudentStoreState {
  students: AppUser[];
  studentLoading: boolean;
}

const useStudentStore = defineStore("student", {
  state: (): StudentStoreState => ({
    students: [],
    studentLoading: false,
  }),
  getters: {
    allStudents: (state: StudentStoreState) => state.students,
    archiveStudents: (state: StudentStoreState) => state.students.filter(student => student.archive),
    activeStudents: (state: StudentStoreState) => state.students.filter(student => !student.archive),
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
        const students = await getUsersByRole(ROLES.STUDENTS_ROLE);
        const courses = await getAllCourses();
        this.students = students.map((student) => {
          const studentCourse = courses?.find(
            (course) => course.id === student.courseId,
          );
          student.course = studentCourse?.name;
          student.archive = studentCourse?.status === CourseStatus.FINISHED;
          return student;
        });
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
            await createEntryResult(
              new EntryResult(uuidv4(), student.id, studentCourse.id),
            );
            await createExitResult(
              new ExitResult(uuidv4(), student.id, studentCourse.id),
            );
            const courseHomeworks = await getCoursesHomeworks(studentCourse.id);
            const promisesArray: Promise<boolean>[] = [];
            courseHomeworks.forEach((homework) => {
              homework.students.push(
                new StudentHomework(student.id).asObject(),
              );
              promisesArray.push(updateHomeworkById(homework.id, homework));
            });
            Promise.all(promisesArray);
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
    async updateStudentCourse(studentToUpdate: AppUser, newCourseId: string) {
      try {
        this.studentLoading = true;
        await updateUserByID(studentToUpdate.id, {
          ...studentToUpdate,
          courseId: newCourseId,
        });
        await deleteStudentEntryResults(studentToUpdate.id);
        await deleteStudentExitResults(studentToUpdate.id);
        await createEntryResult(
          new EntryResult(uuidv4(), studentToUpdate.id, newCourseId),
        );
        await createExitResult(
          new ExitResult(uuidv4(), studentToUpdate.id, newCourseId),
        );

        const oldCourseHomeworks = await getCoursesHomeworks(
          studentToUpdate.courseId!,
        );
        const oldHomeworksPromisesArray: Promise<boolean>[] = [];
        oldCourseHomeworks.forEach((homework) => {
          homework.students = homework.students.filter(
            (student) => student.studentId !== studentToUpdate.id,
          );
          oldHomeworksPromisesArray.push(
            updateHomeworkById(homework.id, homework),
          );
        });
        await Promise.all(oldHomeworksPromisesArray);

        const newCourseHomeworks = await getCoursesHomeworks(newCourseId);
        const newHomeworksPromisesArray: Promise<boolean>[] = [];
        newCourseHomeworks.forEach((homework) => {
          homework.students.push(new StudentHomework(studentToUpdate.id).asObject());
          newHomeworksPromisesArray.push(
            updateHomeworkById(homework.id, homework),
          );
        });
        await Promise.all(newHomeworksPromisesArray);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Student's course updated",
          type: ToastType.SUCCESS,
        });
      } catch (error) {
        console.log({ error });
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Can't updated student course",
          type: ToastType.SUCCESS,
        });
      } finally {
        this.fetchStudents();
        this.studentLoading = false;
      }
    },
    async deleteStudent(studentId: string) {
      try {
        this.studentLoading = true;
        const student = this.students.find(
          (student) => student.id === studentId,
        );
        if (student && student.courseId) {
          const studentsHomeworks = await getCoursesHomeworks(student.courseId);
          const deleteHomeworkPromises: Promise<boolean>[] = [];
          for (const homework of studentsHomeworks) {
            homework.students = homework.students.filter(
              (studentHomework) => studentHomework.studentId !== studentId,
            );
            deleteHomeworkPromises.push(
              updateHomeworkById(homework.id, homework),
            );
          }
          await Promise.all(deleteHomeworkPromises);
          await deleteStudentEntryResults(studentId);
          await deleteStudentExitResults(studentId);
          await deleteUserById(studentId);

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
        this.fetchStudents();
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStudentStore, import.meta.hot));
}

export { useStudentStore };
