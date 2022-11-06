import { AppUser } from "./../api/models/user.model";
import { defineStore } from "pinia";
import router from "../router";
import { gethUserByID, updateUserByID } from "../api/user/index";
import {
  createImageUrl,
  createImageRef,
  uploadImage,
} from "../api/storage/index";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../main";
import { ROUTE_NAMES } from "../models/router.model";
import { ToastType, useToastStore } from "../store/toast.store";

/* class UserInfo {
  avatarUrl!: string;
  email!: string;
  fullName!: string;
  id!: string;
  role!: string;
  class!: string;
} */

interface IUserStoreState {
  user: AppUser | null;
  isImageLoading: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): IUserStoreState => {
    return {
      user: null,
      isImageLoading: false,
    };
  },
  getters: {
    currentUser: (state) => state.user,
    isImageLoading: (state) => state.isImageLoading,
    isUser: (state) => state.user!.id !== null,
  },
  actions: {
    setUser(user: AppUser | null) {
      this.user = user;
    },
    toggle_image_loading() {
      this.isImageLoading = !this.isImageLoading;
    },
    async fetchUser(id: string) {
      try {
        const user = await gethUserByID(id);
        console.log({user});
        
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.setUser(user);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response?.data?.message;
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: errorMessage,
          type: ToastType.FAILURE,
        });
      } finally {
        if (this.isImageLoading) {
          this.toggle_image_loading();
        }
      }
    },
    async changePassword(password: any) {
      try {
        await updateUserByID(this.user!.id, password);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Password succesfully changed!",
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
      }
    },
    async changeProfileImage(image: any) {
      try {
        this.toggle_image_loading();
        const imageRef = createImageRef(this.user!.email);
        await uploadImage(imageRef, image);
        const imageUrl = await createImageUrl(imageRef);
        await updateUserByID(this.user!.id, { avatarUrl: imageUrl });
        this.fetchUser(this.user!.id);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Profile image successfully changed",
          type: ToastType.SUCCESS,
        });
      } catch (error: any) {
        console.log(error);
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: errorMessage,
          type: ToastType.FAILURE,
        });
      }
    }, 
    async logoutUser() {
      try {
        await signOut(firebaseAuth);
        localStorage.removeItem("currentUser");
        this.user = null;
        router.push({ name: ROUTE_NAMES.LOGIN });
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: errorMessage,
          type: ToastType.FAILURE,
        });
      }
    },
  },
});
