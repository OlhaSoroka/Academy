import { defineStore } from "pinia";
import { ROLES } from "../models/router.model";

class MentorInfo {
  avatarUrl!: string;
  email!: string;
  fullName!: string;
  id!: string;
  role!: string;
}

interface IMentorStoreState {
  mentors: MentorInfo[];
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
    SET_MENTORS(mentors: MentorInfo[]) {
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
          (user: MentorInfo) => user.role === ROLES.MENTOR_ROLE,
        );
        this.SET_MENTORS(mentors);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true },
        );
      } finally {
        this.TOGGLE_MENTORS_LOADING;
      }
    },
    async createMentor(mentor: MentorInfo) {
      try {
        this.TOGGLE_MENTORS_LOADING;
        await registerUser(mentor);
        store.dispatch(
          "toast/show",
          { message: "User succesfully created", type: "success" },
          { root: true },
        );
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true },
        );
      } finally {
        this.TOGGLE_MENTORS_LOADING;
        this.fetchMentors;
      }
    },
    async deleteMentor(id: string) {
      try {
        this.TOGGLE_MENTORS_LOADING;
        await deleteUserById(id);
        store.dispatch(
          "toast/show",
          { message: "User succesfully deleted", type: "success" },
          { root: true },
        );
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true },
        );
      } finally {
        this.TOGGLE_MENTORS_LOADING;
        this.fetchMentors;
      }
    },
    async updateMentor(mentorData: any) {
      try {
        this.TOGGLE_MENTORS_LOADING;
        await updateUserByID(mentorData.id, mentorData);
        store.dispatch(
          "toast/show",
          { message: "User succesfully updated", type: "success" },
          { root: true },
        );
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || error.response.data.message;
        store.dispatch(
          "toast/show",
          { message: errorMessage, type: "error" },
          { root: true },
        );
      } finally {
        this.TOGGLE_MENTORS_LOADING;
        this.fetchMentors;
      }
    },
  },
});
