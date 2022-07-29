import { gethUserByID, updateUserByID } from "@/api/user";
/* TODO: temporary. remove after Authorization implementation */
const token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmMWMyNzQzYTJhZmY3YmZmZDBmODRhODY0ZTljMjc4ZjMxYmM2NTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4NDM1ODkwLCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTg0MzU4OTAsImV4cCI6MTY1ODQzOTQ5MCwiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.bxV-jq5P2ir1XkQQREWii2kHEvNLEhHdR0FQTrNnpgRtjf4QtDZTbQBqlrv3lVkPIJzgTpTrZgaqpVpGP2LSpQFHDc2tsAh6kpjxKiQAwu3q8CediNy2ya4bHEyVb6IKY_GMdjjzwh2GPCE4joBDdbVd4xO_NskWe2dwezLpOh_tDVosWkjqGvELjPpiAke2OgXznDjsgvwxoeonktXnEMZsgUeot6Y9e3uFmGEhXO_XegkLuXLFcZ6vVG9ouZGUEqIWxZY_KJqcolp07BSZoZ77Vsctho-BFsUml7oufipLrsQzcjFoIdV0wKWbjNFj2uhESZt3vqDhEY97IMshhA";

export default {
  state: {
    user: null,
    isImageLoading: true,
  },
  getters: {
    user: (state) => state.user,
    isImageLoading: (state) => state.isImageLoading,
  },
  actions: {
    async fetchUser(store, id) {
      const user = await gethUserByID(id, token);
      store.commit("SET_USER", user);
      if (store.getters.isImageLoading) {
        store.commit("TOGGLE_IMAGE_LOADING");
      }
    },
    async changePassword(store, password) {
      await updateUserByID(
        store.state.user.id,
        {
          password,
          email: store.state.user.email,
        },
        token
      );
    },
    async changeProfileImage(store, image) {
      store.commit("TOGGLE_IMAGE_LOADING");
      const formData = new FormData();
      formData.append("avatar", image);
      await updateUserByID(store.state.user.id, formData, token);
      store.dispatch("fetchUser", store.state.user.id);
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
