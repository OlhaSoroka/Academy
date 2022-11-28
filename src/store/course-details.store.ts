import { acceptHMRUpdate, defineStore } from "pinia";
import { getCourseById } from "../api/course";
import { getMaterialsByCourse } from "../api/materials";
import { Course } from "../api/models/course.model";
import { Material } from "../api/models/material.model";
import { Comment } from "../api/models/comment.model";
import { AppUser } from "../api/models/user.model";
import { getEntryResultsByCourse } from "../api/entry_results";
import { getExitResultsByCourse } from "../api/exit_results";
import { getMentorsAndAdmins, getStudentsByCourse } from "../api/user";
import { getCommentsByCourse } from "../api/comments";
import { EntryResult } from "../api/models/result.model";
import { ExitResult } from "../api/models/result.model";
import { getLectureByCourse } from "../api/lectures";
import { Lecture } from "../api/models/lecture.model";
import { LectureHomework } from "../api/models/homework.model";
import { getCoursesHomeworks, getHomeworksByLecture } from "../api/homework";

interface CourseDetailsStoreState {
  _mainInfo: Course[];
  _group: AppUser[];
  _entryResults: EntryResult[];
  _exitResults: ExitResult[];
  _materials: Material[];
  _comments: Comment[];
  _lectures: Lecture[];
  _mentors: AppUser[];
  _courseDetailsLoading: boolean;
  _selectedHomework: LectureHomework | null;

  _mainInfoWidgetLoading: boolean;
  _groupWidgetLoading: boolean;
  _resultWidgetLoading: boolean;
  _commentsWidgetLoading: boolean;
  _materialsWidgetLoading: boolean;
  _lecturesWidgetLoading: boolean;
  _homeworkWidgetLoading: boolean;
}

const useCourseDetailsStore = defineStore("courseDetails", {
  state: (): CourseDetailsStoreState => {
    return {
      _mainInfo: [],
      _group: [],
      _entryResults:[],
      _exitResults:[],
      _materials: [],
      _comments: [],
      _lectures: [],
      _mentors: [],
      _courseDetailsLoading: false,
      _selectedHomework: null,

      _mainInfoWidgetLoading: false,
      _groupWidgetLoading: false,
      _resultWidgetLoading: false,
      _commentsWidgetLoading: false,
      _materialsWidgetLoading: false,
      _lecturesWidgetLoading: false,
      _homeworkWidgetLoading: false,
    };
  },
  getters: {
    selectedCourse: (state) => state._mainInfo,
    selectedCourseId: (state) => state._mainInfo[0].id,
    group: (state) => state._group,
    entryResults: (state) =>state._entryResults,
    exitResults: (state) =>state._exitResults,
    materials: (state) => state._materials,
    comments: (state) => state._comments,
    lectures: (state) => state._lectures,
    mentors: (state) => state._mentors,
    isCourseDetailsLoading: (state) => state._courseDetailsLoading,
    selectedHomework: (state) => state._selectedHomework,

    mainInfoWidgetLoading: (state) => state._mainInfoWidgetLoading,
    groupWidgetLoading: (state) => state._groupWidgetLoading,
    resultWidgetLoading: (state) => state._resultWidgetLoading,
    commentsWidgetLoading: (state) => state._commentsWidgetLoading,
    materialsWidgetLoading: (state) => state._materialsWidgetLoading,
    lecturesWidgetLoading: (state) => state._lecturesWidgetLoading,
    homeworkWidgetLoading: (state) => state._homeworkWidgetLoading,
  },
  actions: {
    async setCourseDetails(course: Course) {
      this._courseDetailsLoading = true;
      this.resetLecture();
      
      this._mainInfo = [course];
      const materials = await getMaterialsByCourse(course.id);
      const group = await getStudentsByCourse(course.id);
      const results = await getResultsByCourse(course.id);
      const exitResults= await getExitResultsByCourse(course.id);
      const entryResults= await getEntryResultsByCourse(course.id);
      const comments = await getCommentsByCourse(course.id);
      const lectures = await getLectureByCourse(course.id);
      const adminAndMentors = await getMentorsAndAdmins();
      this._materials = materials;
      this._group = group;
      this._mentors = adminAndMentors;
  
      this._entryResults = entryResults.map((entryResults) => {
        entryResults.student = group.find(
          (student) => student.id === entryResults.studentId,
        )?.fullName;
        return entryResults;
      });
      this._exitResults = exitResults.map((exitResults) => {
        exitResults.student = group.find(
          (student) => student.id === exitResults.studentId,
        )?.fullName;
        return exitResults;
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
      this._mainInfoWidgetLoading = true;
      const course = await getCourseById(this.selectedCourseId);
      this._mainInfo = [course];
      this._mainInfoWidgetLoading = false;
    },
    async updatedMaterials() {
      this._materialsWidgetLoading = true;
      const materials = await getMaterialsByCourse(this.selectedCourseId);
      this._materials = materials;
      this._materialsWidgetLoading = false;
    },
    async updateComments() {
      this._commentsWidgetLoading = true;
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
      this._commentsWidgetLoading = false;
    },
    async updatedGroupOrResult() {
      this._groupWidgetLoading = true;
      this._resultWidgetLoading = true;
      const group = await getStudentsByCourse(this.selectedCourseId);
      const results = await getResultsByCourse(this.selectedCourseId);
      this._group = group;
      this._results = results.map((result) => {
        result.student = group.find(
          (student) => student.id === result.studentId,
        )?.fullName;
        return result;
      });
      this._groupWidgetLoading = false;
      this._resultWidgetLoading = false;
    },
    async updateLectures() {
      this._lecturesWidgetLoading = true;
      const lectures = await getLectureByCourse(this.selectedCourseId);
      this._lectures = lectures.map((lecture) => {
        lecture.mentor = this.mentors.find(
          (user) => user.id === lecture.mentorId,
        )?.fullName!;
        return lecture;
      });
      this._lecturesWidgetLoading = false;
    },
    async selectLecture(lectureId: string) {
      this._homeworkWidgetLoading = true;
      const lectureHomework = await getHomeworksByLecture(lectureId);

      

      lectureHomework.lecture = this.lectures.find(
        (lecture) => lecture.id === lectureId,
      )?.name;
      lectureHomework.students.forEach((studentHomework) => {
        studentHomework.student = this.group.find(
          (student) => student.id === studentHomework.studentId,
        )!.fullName;
      });
      this._selectedHomework = lectureHomework;
      this._homeworkWidgetLoading = false;
    },
    resetLecture() {
      this._selectedHomework = null;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCourseDetailsStore, import.meta.hot),
  );
}

export { useCourseDetailsStore };
