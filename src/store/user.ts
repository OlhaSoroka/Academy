import { AppUser } from "./../api/models/user.model";
import { acceptHMRUpdate, defineStore } from "pinia";
import router from "../router";
import {
  changePassword,
  gethUserByID,
  updateUserByID,
} from "../api/user/index";
import {
  createImageUrl,
  createImageRef,
  uploadImage,
} from "../api/storage/index";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../main";
import { ROLES, ROUTE_NAMES } from "../models/router.model";
import { ToastType, useToastStore } from "../store/toast.store";

interface UserStoreState {
  user: AppUser | null;
  imageLoading: boolean;
}

const useUserStore = defineStore("user", {
  state: (): UserStoreState => {
    return {
      user: null,
      imageLoading: false,
    };
  },
  getters: {
    currentUser: (state) => state.user,
    isImageLoading: (state) => state.imageLoading,
    isAdmin:(state)=> state.user?.role===ROLES.ADMIN_ROLE,
    isMentor:(state)=> state.user?.role===ROLES.MENTOR_ROLE,
    isStudent:(state)=>state.user?.role===ROLES.STUDENTS_ROLE,
  },
  actions: {
    setUser(user: AppUser | null) {
      this.user = user;
    },
    async fetchUser(id: string) {
      try {
        const user = await gethUserByID(id);
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.user = user;
      } catch (error) {
        console.log({ error });
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't fetch this user",
          type: ToastType.FAILURE,
        });
      } finally {
        if (this.isImageLoading) {
          this.imageLoading = false;
        }
      }
    },
    async changePassword(password: string) {
      try {
        await changePassword(password);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Password successfully changed!",
          type: ToastType.SUCCESS,
        });
      } catch (error) {
        console.log({ error });

        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't change your password",
          type: ToastType.FAILURE,
        });
      }
    },
    async changeProfileImage(image: any) {
      try {
        if (this.user) {
          this.imageLoading = true;
          const imageRef = createImageRef(this.user.email);
          await uploadImage(imageRef, image);
          const imageUrl = await createImageUrl(imageRef);
          await updateUserByID(this.user.id, { avatarUrl: imageUrl });
          this.fetchUser(this.user.id);
          const toastStore = useToastStore();
          toastStore.showToastMessage({
            message: "Profile image successfully changed",
            type: ToastType.SUCCESS,
          });
        }
      } catch (error) {
        console.log({ error });
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't update profile image",
          type: ToastType.FAILURE,
        });
      }
    },
    async logoutUser() {
      try {
        this.setUser(null);
        await signOut(firebaseAuth);
        localStorage.removeItem("currentUser");
        router.push({ name: ROUTE_NAMES.LOGIN });
      } catch (error) {
        console.log({ error });
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Something went wrong",
          type: ToastType.FAILURE,
        });
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}

export { useUserStore };
