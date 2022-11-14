import { defineStore, acceptHMRUpdate } from "pinia";
import { ROLES } from "../models/router.model";
import {
  deleteUserById,
  updateUserByID,
  registerUser,
  getUsersByRole,
} from "../api/user/index";
import { AppUser, RegisterUserBody } from "../api/models/user.model";
import { ToastType, useToastStore } from "../store/toast.store";

interface AdminStoreState {
  users: AppUser[];
  adminLoading: boolean;
}

const useAdminStore = defineStore("admin", {
  state: (): AdminStoreState => {
    return {
      users: [],
      adminLoading: false,
    };
  },
  getters: {
    admins: (state) => state.users,
    isAdminsLoading: (state) => state.adminLoading,
  },
  actions: {
    async fetchAdmins() {
      try {
        this.adminLoading = true;
        const admins = await getUsersByRole(ROLES.ADMIN_ROLE);
        this.users = admins;
      } catch (error) {
        console.log({ error });
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't load admins",
          type: ToastType.FAILURE,
        });
      } finally {
        this.adminLoading = false;
      }
    },
    async createAdmin(admin: RegisterUserBody) {
      try {
        this.adminLoading = true;
        await registerUser(admin);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Admin successfully created!",
          type: ToastType.SUCCESS,
        });
      } catch (error) {
        console.log({ error });
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't create admin",
          type: ToastType.FAILURE,
        });
      } finally {
        this.adminLoading = false;
        this.fetchAdmins();
      }
    },
    async deleteAdmin(id: string) {
      try {
        this.adminLoading = true;
        await deleteUserById(id);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Admin successfully deleted!",
          type: ToastType.SUCCESS,
        });
      } catch (error) {
        console.log({ error });
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't delete admin",
          type: ToastType.FAILURE,
        });
      } finally {
        this.adminLoading = false;
        this.fetchAdmins();
      }
    },
    async updateAdmin(adminData: AppUser) {
      try {
        this.adminLoading = true;
        await updateUserByID(adminData.id, adminData);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Admin successfully updated!",
          type: ToastType.SUCCESS,
        });
      } catch (error) {
        console.log({ error });
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't update admin",
          type: ToastType.FAILURE,
        });
      } finally {
        this.adminLoading = false;
        this.fetchAdmins();
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot));
}

export { useAdminStore };
