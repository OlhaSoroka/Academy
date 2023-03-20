import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { defineStore } from "pinia";
import { getAllCourses } from "../api/course";
import { getLectureByCourse, getLectureByMentor } from "../api/lectures";
import { Update } from "../api/models/update.model";
import {
  createUpdate,
  deleteUpdate,
  getAllUpdatesByCourseId,
  getFirstPageUpdates,
  getNextPageUpdates,
  getPrevPageUpdates,
} from "../api/updates";
import { getAllUsers } from "../api/user";
import { ROLES } from "../models/router.model";
import { ToastType, useToastStore } from "./toast.store";
import { useUserStore } from "./user";

interface UpdateStoreState {
  _updates: Update[];
  _currentPage: number;
  _totalUpdates: number;
  _firstUpdate: Update | null;
  _firstVisible: QueryDocumentSnapshot<DocumentData> | null;
  _lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  _updatesLoading: boolean;
}

export const useUpdateStore = defineStore("update", {
  state: (): UpdateStoreState => {
    return {
      _updates: [],
      _currentPage: 1,
      _totalUpdates: 0,
      _firstUpdate: null,
      _firstVisible: null,
      _lastVisible: null,
      _updatesLoading: false,
    };
  },
  getters: {
    updates: (state) => state._updates,
    updatesLoading: (state) => state._updatesLoading,
    firstUpdate: (state) => state._firstUpdate,
    isLastPage: (state) =>
      state._currentPage === Math.ceil(state._totalUpdates / 5),
  },
  actions: {
    async fetchUpdates() {
      try {
        this._updatesLoading = true;
        const userStore = useUserStore();
        const courseIds: string[] = [];
        if (userStore.currentUser?.role! === ROLES.STUDENTS_ROLE) {
          courseIds.push(userStore.currentUser!.courseId!)
        }
        if (userStore.currentUser?.role! === ROLES.MENTOR_ROLE) {
          const mentorsLectures = await getLectureByMentor(userStore.currentUser?.id!);
          mentorsLectures.forEach(lecture => courseIds.push(lecture.courseId));
        }
        const { updates, lastVisible, firstUpdate, total } = await getFirstPageUpdates(courseIds, userStore.currentUser?.role!);
        
        this._totalUpdates = total;
        this._firstUpdate = firstUpdate;
        this._lastVisible = lastVisible as QueryDocumentSnapshot;
        const users = await getAllUsers();
        const courses = await getAllCourses();
        this._updates = updates
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((update) => {
            const author = users.find((user) => {
              return user.id === update.authorId;
            });
            if (author) {
              update.authorId = author?.fullName;
            }
            const updatedCourse = courses?.find((course) => {
              return course.id === update.courseId;
            });
            if (updatedCourse) {
              update.courseId = updatedCourse.name;
            }
            if (update.field === 'mentor') {
              update.newValue = users.find((user) => user.id === update.newValue)!.fullName;
            }
            update.createdAt = new Date(update.createdAt)
              .toISOString()
              .split("T")[0] as string;
            return update;
          });
      } catch (error) {
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: `Can't fetch updates`,
          type: ToastType.FAILURE,
        });
      } finally {
        this._updatesLoading = false;
      }
    },
    async fetchNextPage() {
      try {
        this._updatesLoading = true;
        const userStore = useUserStore();
        this._currentPage = this._currentPage + 1;
        const courseIds: string[] = [];
        if (userStore.currentUser?.role! === ROLES.STUDENTS_ROLE) {
          courseIds.push(userStore.currentUser!.courseId!)
        }
        if (userStore.currentUser?.role! === ROLES.MENTOR_ROLE) {
          const mentorsLectures = await getLectureByMentor(userStore.currentUser?.id!);
          mentorsLectures.forEach(lecture => courseIds.push(lecture.courseId));
        }
        const { updates, lastVisible, firstVisible } = await getNextPageUpdates(
          this._lastVisible!,
          courseIds,
          userStore.currentUser!.role
        );
        this._lastVisible = lastVisible;
        this._firstVisible = firstVisible;
        const users = await getAllUsers();
        const courses = await getAllCourses();
        this._updates = updates
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((update) => {
            const author = users.find((user) => {
              return user.id === update.authorId;
            });
            if (author) {
              update.authorId = author?.fullName;
            }
            const updatedCourse = courses?.find((course) => {
              return course.id === update.courseId;
            });
            if (updatedCourse) {
              update.courseId = updatedCourse.name;
            }
            if (update.field === 'mentor') {
              update.newValue = users.find((user) => user.id === update.newValue)!.fullName;
            }
            // if (update.field === 'mentor' && update.oldValue) {
            //   update.oldValue = users.find((user) => user.id === update.oldValue)!.fullName;
            // }
            update.createdAt = new Date(update.createdAt)
              .toISOString()
              .split("T")[0] as string;
            return update;
          });
      } catch (error) {
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: `Can't fetch updates`,
          type: ToastType.FAILURE,
        });
      } finally {
        this._updatesLoading = false;
      }
    },
    async fetchPrevPage() {
      try {
        this._updatesLoading = true;
        const userStore = useUserStore();
        this._currentPage = this._currentPage - 1;
        const courseIds: string[] = [];
        if (userStore.currentUser?.role! === ROLES.STUDENTS_ROLE) {
          courseIds.push(userStore.currentUser!.courseId!)
        }
        if (userStore.currentUser?.role! === ROLES.MENTOR_ROLE) {
          const mentorsLectures = await getLectureByMentor(userStore.currentUser?.id!);
          mentorsLectures.forEach(lecture => courseIds.push(lecture.courseId));
        }
        const { updates, lastVisible, firstVisible } = await getPrevPageUpdates(
          this._firstVisible!,
          courseIds,
          userStore.currentUser!.role
        );
        this._lastVisible = lastVisible;
        this._firstVisible = firstVisible;
        const users = await getAllUsers();
        const courses = await getAllCourses();
        this._updates = updates
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((update) => {
            const author = users.find((user) => {
              return user.id === update.authorId;
            });
            if (author) {
              update.authorId = author?.fullName;
            }
            const updatedCourse = courses?.find((course) => {
              return course.id === update.courseId;
            });
            if (updatedCourse) {
              update.courseId = updatedCourse.name;
            }
            if (update.field === 'mentor') {
              update.newValue = users.find((user) => user.id === update.newValue)!.fullName;
            }
            update.createdAt = new Date(update.createdAt)
              .toISOString()
              .split("T")[0] as string;
            return update;
          });
      } catch (error) {
        console.log(error);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: `Can't fetch updates`,
          type: ToastType.FAILURE,
        });
      } finally {
        this._updatesLoading = false;
      }
    },
    async createUpdate(update: Update) {
      try {
        this._updatesLoading = true;
        await createUpdate(update);
      } catch (error) {
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Can't create update!",
          type: ToastType.FAILURE,
        });
      } finally {
        this.fetchUpdates();
      }
    },
    async deleteUpdatesByCourseId(courseId: string) {
      try {
        const updates = await getAllUpdatesByCourseId(courseId);
        const updatesToDelete: Promise<boolean>[] = [];
        updates.forEach((update) =>
          updatesToDelete.push(deleteUpdate(update.id)),
        );
        await Promise.all(updatesToDelete);
      } catch (error) {
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Can't delete updates!",
          type: ToastType.FAILURE,
        });
      } finally {
      }
    },
  },
});
