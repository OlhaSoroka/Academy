import { acceptHMRUpdate, defineStore } from "pinia";

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

const useToastStore = defineStore("toast", {
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
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToastStore, import.meta.hot));
}

export { useToastStore };
