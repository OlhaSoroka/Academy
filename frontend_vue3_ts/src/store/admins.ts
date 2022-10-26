import { defineStore } from "pinia";
import { ROLES } from "../models/router.model";
import { deleteUserById, getAllUsers, gethUserByID, updateUserByID, registerUser} from "../api/user/index";
import { RegisterUserBody } from "../api/models/user.model";
class AdminInfo {
  avatarUrl!: string;
  email!: string;
  fullName!: string;
  id!: string;
  role!: string;
}

interface IAdminsStoreState {
  admins: AdminInfo[];
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
    SET_ADMINS(admins: AdminInfo[]) {
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
          (user: AdminInfo) => user.role === ROLES.ADMIN_ROLE,
        );
        this.SET_ADMINS(admins);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true },
        );
      } finally {
        this.TOGGLE_ADMINS_LOADING;
      }
    },
    async createAdmin(admin: RegisterUserBody) {
      try {
        this.TOGGLE_ADMINS_LOADING;
        await registerUser(admin);
        store.dispatch(
          "toast/show",
          { message: "User succesfully created", type: "success" },
          { root: true },
        );
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true },
        );
      } finally {
        this.TOGGLE_ADMINS_LOADING;
        this.fetchAdmins;
      }
    },
    async deleteAdmin(id: string) {
      try {
        this.TOGGLE_ADMINS_LOADING;
        await deleteUserById(id);
        store.dispatch(
          "toast/show",
          { message: "User succesfully deleted", type: "success" },
          { root: true },
        );
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true },
        );
      } finally {
        this.TOGGLE_ADMINS_LOADING;
        this.fetchAdmins;
      }
    },
    async updateAdmin(adminData: any) {
      try {
        this.TOGGLE_ADMINS_LOADING;
        await updateUserByID(adminData.id, adminData);
        store.dispatch(
          "toast/show",
          { message: "User succesfully updated", type: "success" },
          { root: true },
        );
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true },
        );
      } finally {
        this.TOGGLE_ADMINS_LOADING;
        this.fetchAdmins;
      }
    },
  },
});
