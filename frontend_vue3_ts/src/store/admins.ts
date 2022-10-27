import { defineStore } from "pinia";
import { ROLES } from "../models/router.model";
import {
  deleteUserById,
  getAllUsers,
  gethUserByID,
  updateUserByID,
  registerUser,
} from "../api/user/index";
import { RegisterUserBody } from "../api/models/user.model";
import { MentorAdminInfo } from "./mentors";
import { ToastType, useToastStore } from "../store/toast.store";

interface IAdminsStoreState {
  admins: MentorAdminInfo[];
  isAdminsLoading: boolean;
}

export const useAdminStore = defineStore("admin", {
  state: (): IAdminsStoreState => {
    return {
      admins: [],
      isAdminsLoading: false,
    };
  },
  getters: {
    admins: (state) => state.admins,
    isAdminsLoading: (state) => state.isAdminsLoading,
  },
  actions: {
    SET_ADMINS(admins: MentorAdminInfo[]) {
      this.admins = admins;
    },
    TOGGLE_ADMINS_LOADING() {
      this.isAdminsLoading = !this.isAdminsLoading;
    },
    async fetchAdmins() {
      try {
        this.TOGGLE_ADMINS_LOADING;
        const users = await getAllUsers();
        const admins = users.filter(
          (user: MentorAdminInfo) => user.role === ROLES.ADMIN_ROLE,
        );
        this.SET_ADMINS(admins);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: errorMessage,
          type: ToastType.FAILURE,
        });
      } finally {
        this.TOGGLE_ADMINS_LOADING;
      }
    },
    async createAdmin(admin: RegisterUserBody) {
      try {
        this.TOGGLE_ADMINS_LOADING;
        await registerUser(admin);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "User succesfully created!",
          type: ToastType.SUCCESS,
        });
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: errorMessage,
          type: ToastType.FAILURE,
        });
      } finally {
        this.TOGGLE_ADMINS_LOADING;
        this.fetchAdmins;
      }
    },
    async deleteAdmin(id: string) {
      try {
        this.TOGGLE_ADMINS_LOADING;
        await deleteUserById(id);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "User succesfully deleted!",
          type: ToastType.SUCCESS,
        });
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: errorMessage,
          type: ToastType.FAILURE,
        });
      } finally {
        this.TOGGLE_ADMINS_LOADING;
        this.fetchAdmins;
      }
    },
    async updateAdmin(adminData: any) {
      try {
        this.TOGGLE_ADMINS_LOADING;
        await updateUserByID(adminData.id, adminData);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "User succesfully updated!",
          type: ToastType.SUCCESS,
        });
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: errorMessage,
          type: ToastType.FAILURE,
        });
      } finally {
        this.TOGGLE_ADMINS_LOADING;
        this.fetchAdmins;
      }
    },
  },
});
