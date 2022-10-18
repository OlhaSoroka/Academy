import { createImageRef, createImageUrl, uploadImage } from "@/api/storage";
import { gethUserByID, updateUserByID } from "@/api/user";
import { LOGIN } from "@/constants/routes.constant";
import { firebaseAuth } from "@/main";
import { signOut } from "firebase/auth";
import router from "../../router";

export default {
  state: {
    user: null,
    isImageLoading: false,
  },
  getters: {
    user: (state) => state.user,
    isImageLoading: (state) => state.isImageLoading,
  },
  actions: {
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
    async fetchUser(store, id) {
      try {
        const user = await gethUserByID(id);
        localStorage.setItem("currentUser", JSON.stringify(user));
        store.commit("SET_USER", user);
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true }
        );
      } finally {
        if (store.getters.isImageLoading) {
          store.commit("TOGGLE_IMAGE_LOADING");
        }
      }
    },
    async changePassword(store, password) {
      try {
        await updateUserByID(
          store.state.user.id,
          {
            password,
          },
          store.getters.accessToken
        );
        store.dispatch(
          "toast/show",
          { message: "Password succesfully changed", type: "success" },
          { root: true }
        );
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true }
        );
      }
    },
    async changeProfileImage(store, image) {
      try {
				store.commit('TOGGLE_IMAGE_LOADING');
				const imageRef = createImageRef(store.state.user.email);
				await uploadImage(imageRef, image);

				const imageUrl = await createImageUrl(imageRef);

				await updateUserByID(store.state.user.id, { avatarUrl: imageUrl });

        store.dispatch("fetchUser", store.state.user.id);
        store.dispatch(
          "toast/show",
          { message: "Profile image successfully changed", type: "success" },
          { root: true }
        );
      } catch (error) {
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
    async logoutUser(store) {
      try {
        await signOut(firebaseAuth);
        localStorage.removeItem('currentUser');
        store.dispatch("setUser", null);
        router.push({ name: LOGIN });
      } catch (error) {
        store.dispatch(
          "toast/show",
          { message: error.response.data.message, type: "error" },
          { root: true }
        );
      }
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    TOGGLE_IMAGE_LOADING(state) {
      state.isImageLoading = !state.isImageLoading;
    },
  },
  namespaced: true,
};
