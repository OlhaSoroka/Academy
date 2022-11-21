import { acceptHMRUpdate, defineStore } from "pinia";
import {
  getAllCourses,
  updateCourseById,
  deleteCourse,
  createCourse,
} from "../api/course";
import { ToastType, useToastStore } from "../store/toast.store";
import { Course } from "../api/models/course.model";
import { deleteCoursesResults, deleteResult } from "../api/results";
import { deleteCoursesLectures } from "../api/lectures";
import { deleteCoursesHomeworks } from "../api/homework";
import { deleteCoursesComments } from "../api/comments";
import { deleteCoursesMaterials } from "../api/materials";

interface CoursesStoreState {
  courses: Course[];
  selectedCourseIndex: number;
  courseLoading: boolean;
}

const useCoursesStore = defineStore("courses", {
  state: (): CoursesStoreState => {
    return {
      courses: [],
      selectedCourseIndex: 0,
      courseLoading: false,
    };
  },
  getters: {
    allCourses: (state: CoursesStoreState) => state.courses,
    coursesLength: (state) => state.courses.length,
    lastCourseId(state: CoursesStoreState) {
      return state.courses[state.courses.length - 1].id;
    },
    firstCourseId(state: CoursesStoreState) {
      return state.courses[0].id;
    },
    loadingStatus(state: CoursesStoreState) {
      return state.courseLoading;
    },
    getCourseById(state: CoursesStoreState) {
      return (id: string) => {
        return state.courses.find((course) => course.id === id);
      };
    },
    courseIndex(state: CoursesStoreState) {
      return (courseItem: Course) => state.courses.indexOf(courseItem);
    },
    currentSelectedCourse(state: CoursesStoreState) {
      return state.courses[state.selectedCourseIndex];
    },
  },
  actions: {
    async fetchCourses() {
      try {
        this.courseLoading = true;
        const courses = await getAllCourses();
        if (courses) {
          this.courses = courses;
        }
      } catch (error) {
        console.log({ error });
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't load courses",
          type: ToastType.FAILURE,
        });
      } finally {
        this.courseLoading = false;
      }
    },
    async createNewCourse(data: Course) {
      try {
        this.courseLoading = true;
        await createCourse(data);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Course successfully created!",
          type: ToastType.SUCCESS,
        });
      } catch (error) {
        console.log({ error });
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't create a new course",
          type: ToastType.FAILURE,
        });
      } finally {
        this.fetchCourses();
      }
    },
    async updateCourse(payload: Course) {
      try {
        this.courseLoading = true;
        await updateCourseById(payload.id, payload);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Course successfully updated!",
          type: ToastType.SUCCESS,
        });
      } catch (error) {
        console.log({ error });

        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't update this course",
          type: ToastType.FAILURE,
        });
      } finally {
        this.fetchCourses();
      }
    },
    async deleteCourse(courseId: string) {
      try {
        this.courseLoading = true;
        await deleteCoursesResults(courseId);
        await deleteCoursesLectures(courseId);
        await deleteCoursesHomeworks(courseId);
        await deleteCoursesComments(courseId);
        await deleteCoursesMaterials(courseId);
        // TODO?: update users course id
        await deleteCourse(courseId);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Course successfully deleted!",
          type: ToastType.SUCCESS,
        });
      } catch (error) {
        console.log({ error });
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't delete this course",
          type: ToastType.FAILURE,
        });
      } finally {
        this.fetchCourses();
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCoursesStore, import.meta.hot));
}

export { useCoursesStore };
