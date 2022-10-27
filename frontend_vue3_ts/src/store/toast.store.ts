import { defineStore } from "pinia";

export enum ToastType {
  SUCCESS = "Success",
  FAILURE = "Failure",
}

interface ToastState {
  show: boolean;
  message: string | null;
  type: ToastType | null;
}

interface ToastPayload {
  message: string;
  type: ToastType;
}

export const useToastStore = defineStore("toast", {
  state: (): ToastState => ({
    show: false,
    message: null,
    type: null,
  }),
  getters: {
    shouldShowToast: (state) => state.show,
    toastMessage: (state) => state.message,
    messageType: (state) => state.type,
  },
  actions: {
    showToastMessage(payload: ToastPayload) {
      this.message = payload.message;
      this.type = payload.type;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);

      // Example of usage in another store:
      //
      // actions: {
      //   updateUser() {
      //      ...
      //      const toastStore = useToastStore();
      //      toastStore.showToastMessage({ message: "User successfully updated!", type: ToastType.SUCCESS })
      //      ...
      //   }
      // }
    },
  },
});
