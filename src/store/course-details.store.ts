import { acceptHMRUpdate, defineStore } from "pinia";
import { uuidv4 } from "@firebase/util";
import { getCourseById } from "../api/course";
import { createMaterial, getMaterialsByCourse } from "../api/materials";
import { Course } from "../api/models/course.model";
import { Material } from "../api/models/material.model";
import { Document } from "../api/models/documents.model";
import { Comment } from "../api/models/comment.model";
import { AppUser } from "../api/models/user.model";
import { getEntryResultsByCourse } from "../api/entry_results";
import { getExitResultsByCourse } from "../api/exit_results";
import { getMentorsAndAdmins, getStudentsByCourse } from "../api/user";
import { createComment, getCommentsByCourse } from "../api/comments";
import { EntryResult } from "../api/models/result.model";
import { ExitResult } from "../api/models/result.model";
import {
  createLecture,
  getLectureByCourse,
  updateLectureById,
} from "../api/lectures";
import { Lecture } from "../api/models/lecture.model";
import { LectureHomework } from "../api/models/homework.model";
import { getCoursesHomeworks, getHomeworksByLecture } from "../api/homework";
import { createDocument, getDocumentByCourse } from "../api/document";
import { ToastType, useToastStore } from "./toast.store";
import { useUpdateStore } from "./update";
import {
  Update,
  UpdateCategory,
  UpdateEvent,
  UpdateType,
} from "../api/models/update.model";
import { useUserStore } from "./user";
import { ROLES } from "../models/router.model";

interface CourseDetailsStoreState {
  _mainInfo: Course[];
  _group: AppUser[];
  _entryResults: EntryResult[];
  _exitResults: ExitResult[];
  _materials: Material[];
  _documents: Document[];
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
  _documentsWidgetLoading: boolean;
}

const useCourseDetailsStore = defineStore("courseDetails", {
  state: (): CourseDetailsStoreState => {
    return {
      _mainInfo: [],
      _group: [],
      _entryResults: [],
      _exitResults: [],
      _materials: [],
      _comments: [],
      _documents: [],
      _lectures: [],
      _mentors: [],
      _selectedHomework: null,

      _courseDetailsLoading: false,
      _mainInfoWidgetLoading: false,
      _groupWidgetLoading: false,
      _resultWidgetLoading: false,
      _commentsWidgetLoading: false,
      _documentsWidgetLoading: false,
      _materialsWidgetLoading: false,
      _lecturesWidgetLoading: false,
      _homeworkWidgetLoading: false,
    };
  },
  getters: {
    selectedCourse: (state) => state._mainInfo,
    selectedCourseId: (state) => state._mainInfo[0].id,
    group: (state) => state._group,
    entryResults: (state) => state._entryResults,
    exitResults: (state) => state._exitResults,
    materials: (state) => state._materials,
    comments: (state) => state._comments,
    documents: (state) => state._documents,
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
    documentsWidgetLoading: (state) => state._documentsWidgetLoading,
  },
  actions: {
    async setCourseDetails(course: Course) {
      this._courseDetailsLoading = true;
      this.resetLecture();

      this._mainInfo = [course];
      const materials = await getMaterialsByCourse(course.id);
      const documents = await getDocumentByCourse(course.id);
      const group = await getStudentsByCourse(course.id);
      const exitResults = await getExitResultsByCourse(course.id);
      const entryResults = await getEntryResultsByCourse(course.id);
      const comments = await getCommentsByCourse(course.id);
      const lectures = await getLectureByCourse(course.id);
      const adminAndMentors = await getMentorsAndAdmins();
      this._materials = materials;
      this._documents = documents;
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
      comments.sort((a, b) => b.createdAt - a.createdAt);
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
    async createMaterial(material: Material) {
      console.log({ createMaterial: material });

      try {
        await createMaterial(material);
        const updateStore = useUpdateStore();
        const userStore = useUserStore();
        const update = new Update(
          uuidv4(),
          material.courseId,
          userStore.currentUser!.id,
          ROLES.STUDENTS_ROLE,
          UpdateType.CREATE,
          UpdateCategory.MATERIAL,
        );
        updateStore.createUpdate(update);
      } catch (error) {}
    },
    async updatedMaterials() {
      this._materialsWidgetLoading = true;
      const materials = await getMaterialsByCourse(this.selectedCourseId);
      this._materials = materials;
      this._materialsWidgetLoading = false;
    },
    async createDocument(document: Document) {
      console.log({ createDocument: document });
      try {
        await createDocument(document);
        const updateStore = useUpdateStore();
        const userStore = useUserStore();
        const update = new Update(
          uuidv4(),
          document.courseId,
          userStore.currentUser!.id,
          ROLES.STUDENTS_ROLE,
          UpdateType.CREATE,
          UpdateCategory.DOCUMENT,
        );
        updateStore.createUpdate(update);
      } catch (error) {}
    },
    async updatedDocuments() {
      this._documentsWidgetLoading = true;
      const documents = await getDocumentByCourse(this.selectedCourseId);
      this._documents = documents;
      this._documentsWidgetLoading = false;
    },
    async createComment(comment: Comment) {
      console.log({ createComment: comment });
      try {
        await createComment(comment);
        const updateStore = useUpdateStore();
        const userStore = useUserStore();
        const update = new Update(
          uuidv4(),
          comment.courseId,
          userStore.currentUser!.id,
          ROLES.STUDENTS_ROLE,
          UpdateType.CREATE,
          UpdateCategory.COMMENT,
        );
        updateStore.createUpdate(update);
      } catch (error) {}
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
      const exitResults = await getExitResultsByCourse(this.selectedCourseId);
      const entryResults = await getEntryResultsByCourse(this.selectedCourseId);
      this._group = group;
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

      this._groupWidgetLoading = false;
      this._resultWidgetLoading = false;
    },
    async createLecture(lecture: Lecture) {
      try {
        await createLecture(lecture);
        const updateStore = useUpdateStore();
        const userStore = useUserStore();
        const update = new Update(
          uuidv4(),
          lecture.courseId,
          userStore.currentUser!.id,
          ROLES.STUDENTS_ROLE,
          UpdateType.CREATE,
          UpdateCategory.LECTURE,
        );
        updateStore.createUpdate(update);
      } catch (error) {}
    },
    async fetchLectures() {
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
    async updateLecture(event: UpdateEvent<Lecture>) {
      try {
        this._lecturesWidgetLoading = true;
        await updateLectureById(event.uniqIdentifier, event.data);
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Lecture successfully updated",
          type: ToastType.SUCCESS,
        });
        const updateStore = useUpdateStore();
        const userStore = useUserStore();
        const update = new Update(
          uuidv4(),
          event.data.courseId,
          userStore.currentUser!.id,
          ROLES.STUDENTS_ROLE,
          UpdateType.UPDATE,
          UpdateCategory.LECTURE,
        );
        update.oldValue = event.oldValue;
        update.newValue = event.newValue;
        update.field = event.colDef.field;
        updateStore.createUpdate(update);
      } catch (error) {
        const toastStore = useToastStore();
        toastStore.showToastMessage({
          message: "Error: Can't update lecture",
          type: ToastType.SUCCESS,
        });
      } finally {
        this._lecturesWidgetLoading = false;
      }
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
