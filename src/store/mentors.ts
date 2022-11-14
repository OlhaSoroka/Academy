import { acceptHMRUpdate, defineStore } from "pinia";
import { ROLES } from "../models/router.model";
import {
  deleteUserById,
  updateUserByID,
  registerUser,
  getUsersByRole,
} from "../api/user/index";
import { AppUser, RegisterUserBody } from "../api/models/user.model";
import { ToastType, useToastStore } from "../store/toast.store";

interface MentorStoreState {
  users: AppUser[];
  mentorLoading: boolean;
}

const useMentorStore = defineStore("mentor", {
  state: (): MentorStoreState => {
    return {
      users: [],
      mentorLoading: false,
    };
  },
  getters: {
    mentors: (state) => state.users,
    isMentorsLoading: (state) => state.mentorLoading,
  },
  actions: {
    async fetchMentors() {
      try {
        this.mentorLoading = true;
        const mentors = await getUsersByRole(ROLES.MENTOR_ROLE);
        this.users = mentors;
      } catch (error) {
        console.log({ error });
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't load mentors",
          type: ToastType.FAILURE,
        });
      } finally {
        this.mentorLoading = false;
      }
    },
    async createMentor(mentor: RegisterUserBody) {
      try {
        this.mentorLoading = true;
        await registerUser(mentor);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Mentor successfully created!",
          type: ToastType.SUCCESS,
        });
      } catch (error) {
        console.log({ error });
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't create mentor",
          type: ToastType.FAILURE,
        });
      } finally {
        this.mentorLoading = false;
        this.fetchMentors();
      }
    },
    async deleteMentor(id: string) {
      try {
        this.mentorLoading = true;
        await deleteUserById(id);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Mentor successfully deleted!",
          type: ToastType.SUCCESS,
        });
      } catch (error) {
        console.log({ error });
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't delete mentor",
          type: ToastType.FAILURE,
        });
      } finally {
        this.mentorLoading = false;
        this.fetchMentors();
      }
    },
    async updateMentor(mentorData: AppUser) {
      try {
        this.mentorLoading = true;
        await updateUserByID(mentorData.id, mentorData);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Mentor successfully updated!",
          type: ToastType.SUCCESS,
        });
      } catch (error) {
        console.log({ error });
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't update mentor",
          type: ToastType.FAILURE,
        });
      } finally {
        this.mentorLoading = false;
        this.fetchMentors();
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMentorStore, import.meta.hot));
}

export { useMentorStore };
