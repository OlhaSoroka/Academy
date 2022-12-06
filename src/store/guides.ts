import { defineStore, acceptHMRUpdate } from "pinia";
import { ROLES } from "../models/router.model";
import {
  updateGuideById,
  deleteGuide,
  createGuide,
  getAllGuides,
} from "../api/guides/index";
import { Guide } from "../api/models/guide.model";
import { ToastType, useToastStore } from "../store/toast.store";
import { guideRoleOptions } from "../models/guide-role.model";

interface GuideStoreState {
  _guides: Guide[];
  _guidesLoading: boolean;
}

const useGuideStore = defineStore("guide", {
  state: (): GuideStoreState => {
    return {
      _guides: [],
      _guidesLoading: false,
    };
  },
  getters: {
    guides: (state) => state._guides,
    isGuidesLoading: (state) => state._guidesLoading,
  },
  actions: {
    async fetchGuides() {
      try {
        this._guidesLoading = true;
        const guides = await getAllGuides();
        this._guides = guides.map(guide => {
          guide.roleLabel = guideRoleOptions.find(option => option.value === guide.role)?.label;
          return guide
        });
      } catch (error) {
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: `Can't fetch guides`,
          type: ToastType.FAILURE,
        });
      } finally {
        this._guidesLoading = false;
      }
    },
    async deleteGuide(id: string) {
      try {
        this._guidesLoading = true;
        await deleteGuide(id);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Guide successfully deleted!",
          type: ToastType.SUCCESS,
        });
      } catch (error) {
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Can't delete guide!",
          type: ToastType.FAILURE,
        });
      } finally {
        this.fetchGuides();
      }
    },
    async createGuide(guide: Guide) {
      try {
        this._guidesLoading = true;
        await createGuide(guide);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Guide successfully created!",
          type: ToastType.SUCCESS,
        });
      } catch (error) {
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Can't create guide!",
          type: ToastType.FAILURE,
        });
      } finally {
        this.fetchGuides();
      }
    },
    async updateGuideById(id: string, guide: Guide) {
      try {
        this._guidesLoading = true;
        await updateGuideById(id, guide);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Guide successfully updated!",
          type: ToastType.SUCCESS,
        });
      } catch (error) {
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Can't update guide!",
          type: ToastType.FAILURE,
        });
      } finally {
        this.fetchGuides();
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGuideStore, import.meta.hot));
}

export { useGuideStore };
