import { defineStore } from "pinia";
import { ROLES } from "../models/router.model";
import {
  deleteUserById,
  getAllUsers,
  gethUserByID,
  updateUserByID,
  registerUser,
} from "../api/user/index";
import { RegisterUserBody } from "../api/models/user.model";
import { ToastType, useToastStore } from "../store/toast.store";

export class MentorAdminInfo {
  avatarUrl!: string;
  email!: string;
  fullName!: string;
  id!: string;
  role!: string;
}

interface IMentorStoreState {
  mentors: MentorAdminInfo[];
  isMentorsLoading: boolean;
}

export const useMentorStore = defineStore("mentor", {
  state: (): IMentorStoreState => {
    return {
      mentors: [],
      isMentorsLoading: false,
    };
  },
  getters: {
    mentors: (state) => state.mentors,
    isMentorsLoading: (state) => state.isMentorsLoading,
  },
  actions: {
    SET_MENTORS(mentors: MentorAdminInfo[]) {
      this.mentors = mentors;
    },
    TOGGLE_MENTORS_LOADING() {
      this.isMentorsLoading = !this.isMentorsLoading;
    },
    async fetchMentors() {
      try {
        this.TOGGLE_MENTORS_LOADING;
        const users = await getAllUsers();
        const mentors = users.filter(
          (user: MentorAdminInfo) => user.role === ROLES.MENTOR_ROLE,
        );
        this.SET_MENTORS(mentors);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: errorMessage,
          type: ToastType.FAILURE,
        });
      } finally {
        this.TOGGLE_MENTORS_LOADING;
      }
    },
    async createMentor(mentor: RegisterUserBody) {
      try {
        this.TOGGLE_MENTORS_LOADING;
        await registerUser(mentor);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "User succesfully created!",
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
      } finally {
        this.TOGGLE_MENTORS_LOADING;
        this.fetchMentors;
      }
    },
    async deleteMentor(id: string) {
      try {
        this.TOGGLE_MENTORS_LOADING;
        await deleteUserById(id);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "User succesfully deleted!",
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
      } finally {
        this.TOGGLE_MENTORS_LOADING;
        this.fetchMentors;
      }
    },
    async updateMentor(mentorData: any) {
      try {
        this.TOGGLE_MENTORS_LOADING;
        await updateUserByID(mentorData.id, mentorData);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "User succesfully updated!",
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
      } finally {
        this.TOGGLE_MENTORS_LOADING;
        this.fetchMentors;
      }
    },
  },
});
