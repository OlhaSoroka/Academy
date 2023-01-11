import { defineStore } from "pinia";
import { getAllCourses } from "../api/course";
import { Update } from "../api/models/update.model";
import { createUpdate, getAllUpdates } from "../api/updates";
import { getAllUsers } from "../api/user";
import { ROLES } from "../models/router.model";
import { ToastType, useToastStore } from "./toast.store";

interface UpdateStoreState {
  _updates: Update[];
  _updatesLoading: boolean;
}

export const useUpdateStore = defineStore("update", {
  state: (): UpdateStoreState => {
    return {
      _updates: [],
      _updatesLoading: false,
    };
  },
  getters: {
    updates: (state) => state._updates,
    updatesLoading: (state) => state._updatesLoading,
  },
  actions: {
    async fetchUpdates() {
      try {
        this._updatesLoading = true;
        const updates = await getAllUpdates();
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
            update.createdAt = new Date(update.createdAt).toISOString().split("T")[0] as string;
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
