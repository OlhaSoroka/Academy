import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { defineStore } from "pinia";
import { getAllCourses } from "../api/course";
import { Update } from "../api/models/update.model";
import {
  createUpdate,
  getAllUpdates,
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
    isLastPage: (state) => state._currentPage === Math.ceil(state._totalUpdates / 5)
  },
  actions: {
    async fetchUpdates() {
      try {
        this._updatesLoading = true;
        const userStore = useUserStore();
        const { updates, lastVisible, firstUpdate, total } = await getFirstPageUpdates(userStore.currentUser!.courseId);
        this._totalUpdates = total;
        this._firstUpdate = firstUpdate;
        this._lastVisible = lastVisible;
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
    async fetchNextPage() {
      try {
        this._updatesLoading = true;
        const userStore = useUserStore();
        this._currentPage = this._currentPage + 1;
        const { updates, lastVisible, firstVisible } = await getNextPageUpdates(this._lastVisible!, userStore.currentUser!.courseId);
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
        const { updates, lastVisible, firstVisible } = await getPrevPageUpdates(this._firstVisible!, userStore.currentUser!.courseId);
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
    async createUpdate(update: Update) {
      try {
        this._updatesLoading = true;
        await createUpdate(update);
      } catch (error) {
        console.log({ error });

        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Can't create update!",
          type: ToastType.FAILURE,
        });
      } finally {
        this.fetchUpdates();
      }
    },
  },
});
