import { defineStore } from "pinia";
import { getCourseById } from "../api/course";
import { getLectureByCourse } from "../api/lectures";
import { Course } from "../api/models/course.model";
import { Lecture } from "../api/models/lecture.model";
import { useUserStore } from "./user";

interface RemindersStoreState {
  _course: Course | null;
  _loading: boolean;
  _finalInterviewRemind: boolean;
  _demoRemind: boolean;
  _projectStartRemind: boolean;
  _todaysLectures: Lecture[];
}

export const useRemindersStore = defineStore("reminders", {
  state: (): RemindersStoreState => {
    return {
      _course: null,
      _loading: false,
      _finalInterviewRemind: false,
      _demoRemind: false,
      _projectStartRemind: false,
      _todaysLectures: [],
    };
  },
  getters: {
    isFinalInterviewToday: (state) => state._finalInterviewRemind,
    isDemoToday: (state) => state._demoRemind,
    isProjectStartToday: (state) => state._projectStartRemind,
    todaysLectures: (state) => state._todaysLectures,
    isLoading: (state) => state._loading
  },
  actions: {
    async calculateCourseEventsDates() {
      try {
        this._loading = true;
        const currentUserCourseId = useUserStore().currentUser?.courseId;
        if (currentUserCourseId) {
          const currentUserCourse = await getCourseById(currentUserCourseId);
          this._finalInterviewRemind = this.isToday(
            currentUserCourse.date_final_interview,
          );
          this._demoRemind = this.isToday(currentUserCourse.date_project_demo);
          this._projectStartRemind = this.isToday(
            currentUserCourse.date_project_start,
          );
        }
      } catch (error) {
      } finally {
        this._loading = false;
      }
    },
    async calculateLecturesStartTime() {
      try {
        this._loading = true;
        this._todaysLectures = [];
        const currentUserCourseId = useUserStore().currentUser?.courseId;
        if (currentUserCourseId) {
          const currentUserLectures = await getLectureByCourse(
            currentUserCourseId,
          );
          currentUserLectures.forEach((lecture) => {
            if (lecture.dateOfLecture && this.isToday(lecture.dateOfLecture)) {
              this._todaysLectures.push(lecture);
            }
          });
        }
      } catch (error) {
      } finally {
        this._loading = false;
      }
    },
    isToday(date: string) {
      const [year, month, day] = date.split("-");

      const today = new Date().toISOString().split("T")[0];
      const [todayYear, todayMonth, todayDay] = today.split("-");

      return year === todayYear && month === todayMonth && day === todayDay;
    },
  },
});
