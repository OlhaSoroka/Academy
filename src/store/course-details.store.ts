import { acceptHMRUpdate, defineStore } from "pinia";
import { getCourseById } from "../api/course";
import { getMaterialsByCourse } from "../api/materials";
import { Course } from "../api/models/course.model";
import { Material } from "../api/models/material.model";
import { Comment } from "../api/models/comment.model";
import { AppUser } from "../api/models/user.model";
import { getResultsByCourse } from "../api/results";
import { getMentorsAndAdmins, getStudentsByCourse } from "../api/user";
import { getCommentsByCourse } from "../api/comments";
import { Result } from "../api/models/result.model";
import { getLectureByCourse } from "../api/lectures";
import { Lecture } from "../api/models/lecture.model";

interface CourseDetailsStoreState {
  _mainInfo: Course[];
  _group: AppUser[];
  _results: Result[];
  _materials: Material[];
  _comments: Comment[];
  _lectures: Lecture[];
  _mentors: AppUser[];
  _courseDetailsLoading: boolean;
}

const useCourseDetailsStore = defineStore("courseDetails", {
  state: (): CourseDetailsStoreState => {
    return {
      _mainInfo: [],
      _group: [],
      _results: [],
      _materials: [],
      _comments: [],
      _lectures: [],
      _mentors: [],
      _courseDetailsLoading: false,
    };
  },
  getters: {
    selectedCourse: (state) => state._mainInfo,
    selectedCourseId: (state) => state._mainInfo[0].id,
    group: (state) => state._group,
    results: (state) => state._results,
    materials: (state) => state._materials,
    comments: (state) => state._comments,
    lectures: (state) => state._lectures,
    mentors: (state) => state._mentors,
    isCourseDetailsLoading: (state) => state._courseDetailsLoading,
  },
  actions: {
    async setCourseDetails(course: Course) {
      this._courseDetailsLoading = true;

      this._mainInfo = [course];
      const materials = await getMaterialsByCourse(course.id);
      const group = await getStudentsByCourse(course.id);
      const results = await getResultsByCourse(course.id);
      const comments = await getCommentsByCourse(course.id);
      const lectures = await getLectureByCourse(course.id);
      const adminAndMentors = await getMentorsAndAdmins();
      this._materials = materials;
      this._group = group;
      this._mentors = adminAndMentors;
      this._results = results.map((result) => {
        result.student = group.find(
          (student) => student.id === result.studentId,
        )?.fullName;
        return result;
      });
      this._comments = comments.map((comment) => {
        comment.author = adminAndMentors.find(
          (user) => user.id === comment.authorId,
        )?.fullName!;
        comment.createdAt = new Date(comment.createdAt)
          .toISOString()
          .split("T")[0] as any;
        return comment;
      });
      this._lectures = lectures.map((lecture) => {
        lecture.mentor = adminAndMentors.find(
          (user) => user.id === lecture.mentorId,
        )?.fullName!;
        return lecture;
      });

      this._courseDetailsLoading = false;
    },
    async updatedCourseInfo() {
      const course = await getCourseById(this.selectedCourseId);
      this._mainInfo = [course];
    },
    async updatedMaterials() {
      const materials = await getMaterialsByCourse(this.selectedCourseId);
      this._materials = materials;
    },
    async updateComments() {
      const comments = await getCommentsByCourse(this.selectedCourseId);
      this._comments = comments.map((comment) => {
        comment.author = this.mentors.find(
          (user) => user.id === comment.authorId,
        )?.fullName!;
        comment.createdAt = new Date(comment.createdAt)
          .toISOString()
          .split("T")[0] as any;
        return comment;
      });
    },
    async updatedGroupOrResult() {
      const group = await getStudentsByCourse(this.selectedCourseId);
      const results = await getResultsByCourse(this.selectedCourseId);
      this._group = group;
      this._results = results.map((result) => {
        result.student = group.find(
          (student) => student.id === result.studentId,
        )?.fullName;
        return result;
      });
    },
    async updateLectures() {
      const lectures = await getLectureByCourse(this.selectedCourseId);
      this._lectures = lectures.map((lecture) => {
        lecture.mentor = this.mentors.find(
          (user) => user.id === lecture.mentorId,
        )?.fullName!;
        return lecture;
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCourseDetailsStore, import.meta.hot),
  );
}

export { useCourseDetailsStore };
