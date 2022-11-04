<template>
  <div class="relative flex">
    <div class="bg-slate-400">Navigation menu</div>
    <div class="h-screen w-full overflow-hidden">
      <div class="bg-sky-400">
        TopBar
        <div class="m-3">
          <button class="bg-red-500 text-white" @click="deleteStudent">
            Delete
          </button>
          <button class="bg-green-500 text-white" @click="update">
            Update
          </button>
          <button class="bg-yellow-500 text-white" @click="putUserInStore">
            Fetch
          </button>
          <button class="bg-blue-500 text-white" @click="createUser">
            Create
          </button>

          <button class="bg-pink-500" @click="openModal">MODAL</button>
        </div>
      </div>
      <RouterView class="h-full overflow-auto bg-primary-100" />
    </div>

    <button @click="editCourse">edit course</button>

    <CourseDetailsUpdateModal :toggle-modal="isOpen" :id="courseId"></CourseDetailsUpdateModal>

    <ToastMessage />
    <div>

      <input type="date" v-model="test" @change="openModal($event)"
						/>
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from "pinia";
import { useToastStore } from "./store/toast.store";
import { useStudentStore } from "./store/students";
import ToastMessage from "./components/ToastMessage.vue";
import { useCoursesStore } from "./store/courses";

import { defineComponent } from "vue";
import { ROLES } from "./models/router.model";
import CourseCreateModal from "./components/modals/CourseCreateModal.vue";
import BaseDeleteModal from "./components/baseComponents/BaseDeleteModal.vue";
import ChangeImageModal from "./components/modals/ChangeImageModal.vue";
import ChangePasswordModal from "./components/modals/ChangePasswordModal.vue";
import UserCreateModal from "./components/modals/UserCreateModal.vue";
import CourseDetailsUpdateModal from "./components/modals/CourseDetailsModals/CourseDetailsUpdateModal.vue";
import BaseInput from "./components/baseComponents/BaseInput.vue";


export default defineComponent({
  computed: {
    ...mapStores(useToastStore, useCoursesStore, useStudentStore),
    userRole(): string {
      return ROLES.ADMIN_ROLE
    }
  },
  methods: {
    getCourses() {
      this.coursesStore.getCourses();
    },
    putUserInStore() {
      this.studentsStore.fetchStudents();
      this.coursesStore.getCourses();
    },
    createUser() {
      this.studentsStore.createStudent({
        email: "jonipaperoni@gmail.com",
        password: "qwe123QWE!",
        role: ROLES.STUDENTS_ROLE,
        fullName: "Papers ",
        course: "Test Course",
      });
    },
    update() {
      this.studentsStore.updateStudent({
        email: "jonipaperoni@gmail.com",
        avatarUrl: "qwe123QWE!",
        role: ROLES.STUDENTS_ROLE,
        fullName: "Red Papers ",
        course: "Test Course",
        id: "lFrIJv0scpci8flGl7hqyS4y3mz2",
      });
    },
    deleteStudent() {
      this.studentsStore.deleteStudent("lFrIJv0scpci8flGl7hqyS4y3mz2");
    },
    openModal(e: any) {
      console.log({e});
      
  
    },
    editCourse() {
      // this.courseId = 'a1464c30-881e-4209-a4e6-30919b1af7f8';
      // this.openModal()
    }
  },
  data() {
    return {
      isOpen: false,
      courseId: "",
      test: "2022-11-06"
    };
  },
  components: { ToastMessage, CourseCreateModal, BaseDeleteModal, ChangeImageModal, ChangePasswordModal, UserCreateModal, CourseDetailsUpdateModal, BaseInput },
});
</script>
