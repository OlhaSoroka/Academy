<template>
  <div class="page courses__container">
    <div class="courses__topbar_container">
      <div>
        <h2 class="courses__header">
          Courses Dashboard
        </h2>
        <h3 class="courses__subheader">
          Courses list of InventorSoft Academy
        </h3>
      </div>
      <div v-if="isMentor || isAdmin">
        <BaseButton
          :loading="loadingStatus"
          @click.prevent="openCourseViewCreateModal"
        >
          Add new course
        </BaseButton>
      </div>
    </div>
    <div v-if="isUser">
      <div class="courses__table_container">
        <BaseTable
          class="text-center"
          :table-data="{
            headingData: headersUser,
            bodyData: coursesForUser(),
          }"
          :edit-btns="false"
          :is-data-loading="loadingStatus"
          :delete-btns="false"
          :view-btns="true"
          @view="goToCourseDetails"
        />
      </div>
    </div>
    <div v-else-if="isMentor || isAdmin">
      <div class="courses__table_container">
        <BaseTable
          class="text-center"
          :table-data="{
            headingData: headersMentor,
            bodyData: courses,
          }"
          :edit-btns="false"
          :is-data-loading="loadingStatus"
          :delete-btns="true"
          :view-btns="true"
          @delete="openCoursesDeleteModal"
          @view="goToCourseDetails"
        />
      </div>
      <CourseCreateModal :is-opened-course-create-modal="isCreateModalOpen" />
      <BaseDeleteModal
        :toggle-modal="isDeleteModalOpen"
        :target-value="targetCourse.name"
        @delete="submitDelete"
      />
    </div>
    <div v-else>
      <h3>No courses</h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseTable from "../components/BaseComponents/BaseTable/BaseTable.vue";
import { COURSE_DETAILS } from "../constants/routes.constant";
import BaseButton from "../components/BaseComponents/BaseButton.vue";
import CourseCreateModal from "@/components/Modals/CourseCreateModal.vue";
import BaseDeleteModal from "../components/BaseComponents/BaseDeleteModal.vue";
import {
  STUDENTS_ROLE,
  MENTOR_ROLE,
  ADMIN_ROLE,
} from "@/constants/roles.constant";

export default {
  components: {
    BaseTable,
    BaseButton,
    BaseDeleteModal,
    CourseCreateModal,
  },
  data() {
    return {
      isCreateModalOpen: false,
      isDeleteModalOpen: false,
      targetCourse: {
        id: null,
        name: "",
        date: "",
        status: "",
        docs_link: "",
        applicants: [],
        group: [],
        homework: [],
        results: [],
        comments: [],
      },
      headersUser: [
        { name: "Course Name" },
        { date: "Date" },
        { status: "Status" },
      ],
      headersMentor: [{ name: "Course Name" }, { date: "Date" }],
    };
  },
  computed: {
    ...mapGetters("courses", ["loadingStatus", 'courses']),
    ...mapGetters("user", ["user"]),
    isUser() {
      if (this.user) {
        return this.user.role === STUDENTS_ROLE;
      } else {
        return false;
      }
    },
    isMentor() {
      if (this.user) {
        return this.user.role === MENTOR_ROLE;
      } else {
        return false;
      }
    },
    isAdmin() {
      if (this.user) {
        return this.user.role === ADMIN_ROLE;
      } else {
        return false;
      }
    },
  },
  async mounted() {
    await this.getCourses();
    this.sortCourses()
  },
  methods: {
    ...mapActions("courses", ["getCourses", "deleteCourseFromState", 'sortCourses']),
    goToCourseDetails(id) {
      this.$router.push({ name: COURSE_DETAILS, params: { id: id } });
    },
    openCoursesDeleteModal(id) {
      this.targetCourse = this.courses.find((e) => e.id === id);
      this.isDeleteModalOpen = !this.isDeleteModalOpen;
    },
    openCourseViewCreateModal() {
      this.isCreateModalOpen = !this.isCreateModalOpen;
    },
    submitDelete() {
      this.deleteCourseFromState(this.targetCourse.id);
    },
    coursesForUser() {
      let coursesWhereUserPresent = []
      let groups = this.courses.map(course => course.group);
      for (let i=0; i<groups.length; i++){
      let  emailsOfCourse = groups[i].map(course => course.email);
      if(emailsOfCourse.includes(this.user.email)){coursesWhereUserPresent.push(this.courses[i])}
      }
      return coursesWhereUserPresent
    }
  },
};
</script>

<style lang="postcss" scoped>
.courses__container {
  @apply p-10 m-auto flex flex-col justify-center;
}

.courses__header {
  @apply font-semibold text-lg text-start text-primary-700;
}

.courses__subheader {
  @apply mt-2 font-normal text-stone-400 text-start;
}

.courses__table_container {
  @apply w-full border-2 border-stone-200 shadow-md rounded-md mt-5 p-5 bg-white;
}

.courses__topbar_container {
  @apply w-full flex justify-between items-center;
}
</style>
