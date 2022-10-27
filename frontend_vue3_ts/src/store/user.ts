import { defineStore } from "pinia";
import router from "../router";
import { deleteUserById, getAllUsers, gethUserByID, updateUserByID, registerUser} from "../api/user/index";
import { createImageUrl, createImageRef, uploadImage, deleteImage } from "../api/storage/index";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../main";
import { ROUTE_NAMES } from "../models/router.model";

class UserInfo {
  avatarUrl!: string;
  email!: string;
  fullName!: string;
  id!: string;
  role!: string;
  class!: string;
}

interface IUserStoreState {
  user: UserInfo,
  isImageLoading: boolean
}

export const useUserStore = defineStore("user", {
  state: (): IUserStoreState => {return {
    user: new UserInfo,
    isImageLoading: false,
  }},
  getters: {
    user: (state) => state.user,
    isImageLoading: (state) => state.isImageLoading,
    isUser: (state) => state.user.id !== null,
  },
  actions: {
    setUser(user:UserInfo) {
      this.user = user
    },
    toggle_image_loading() {
      this.isImageLoading = !this.isImageLoading;
    },
    async fetchUser(id: string){
      try {
        const user = await gethUserByID(id);
        localStorage.setItem("currentUser", JSON.stringify(user));
        if (user) {this.setUser(user)};
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true }
        );
      } finally {
        if (this.isImageLoading) {
          this.toggle_image_loading()
        }
      }
    },
    async changePassword(password:any) {
      try {
        await updateUserByID(this.user.id, password);
        store.dispatch(
          "toast/show",
          { message: "Password succesfully changed", type: "success" },
          { root: true }
        );
      } catch (error:any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true }
        );
      }
    },
    async changeProfileImage(image: any) {
      try {
				this.toggle_image_loading();
				const imageRef = createImageRef(this.user.email);
				await uploadImage(imageRef, image);
				const imageUrl = await createImageUrl(imageRef);
				await updateUserByID(this.user.id, { avatarUrl: imageUrl });
        this.fetchUser(this.user.id);
        store.dispatch(
          "toast/show",
          { message: "Profile image successfully changed", type: "success" },
          { root: true }
        );
      } catch (error:any) {
        console.log(error);
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true }
        );
      }
    },
    async logoutUser() {
      try {
        await signOut(firebaseAuth);
        localStorage.removeItem('currentUser');
        this.user = new UserInfo;
        router.push({ name: ROUTE_NAMES.LOGIN });
      } catch (error:any) {
        store.dispatch(
          "toast/show",
          { message: error.response.data.message, type: "error" },
          { root: true }
        );
      }
    },
  },
});
