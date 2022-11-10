import { acceptHMRUpdate, defineStore } from "pinia";
import { getCourseById } from "../api/course";
import { getMaterialsByCourse } from "../api/materials";
import { Course } from "../api/models/course.model";
import { Material } from "../api/models/material.model";
import { AppUser } from "../api/models/user.model";
import { getResultsByCourse } from "../api/results";
import { getStudentsByCourse } from "../api/user";

interface CourseDetailsStoreState {
  _mainInfo: Course[];
  _group: AppUser[];
  _results: any[]; // TODO create type
  _materials: Material[];
  _comments: Comment[];
}

const useCourseDetailsStore = defineStore("courseDetails", {
  state: (): CourseDetailsStoreState => {
    return {
      _mainInfo: [],
      _group: [],
      _results: [],
      _materials: [],
      _comments: [],
    };
  },
  getters: {
    selectedCourse: (state) => state._mainInfo,
    selectedCourseId: (state) => state._mainInfo[0].id,
    group: (state) => state._group,
    results: (state) => state._results,
    materials: (state) => state._materials,
  },
  actions: {
    async setCourseDetails(course: Course) {
      this._mainInfo = [course];
      const materials = await getMaterialsByCourse(course.id);
      const group = await getStudentsByCourse(course.id);
      const results = await getResultsByCourse(course.id);
      this._materials = [...materials];
      this._group = [...group];
      this._results = [
        ...results.map((result) => ({
          ...result,
          fullName: group.find((student) => student.id === result.studentId)
            ?.fullName,
        })),
      ];
    },
    async updatedCourseInfo() {
      const course = await getCourseById(this.selectedCourseId);
      this._mainInfo = [course];
    },
    async updatedMaterials() {
      const materials = await getMaterialsByCourse(this.selectedCourseId);
      this._materials = [...materials];
    },
    async updatedGroupOrResult() {
      const group = await getStudentsByCourse(this.selectedCourseId);
      const results = await getResultsByCourse(this.selectedCourseId);
      this._group = [...group];
      this._results = [
        ...results.map((result) => ({
          ...result,
          fullName: group.find((student) => student.id === result.studentId)
            ?.fullName,
        })),
      ];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCourseDetailsStore, import.meta.hot),
  );
}

export { useCourseDetailsStore };
