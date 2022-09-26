<template>
  <div class="courses__container">
    <h2 class="courses__header">
      Course Details
    </h2>
    <h3 
      v-if="courseItem" 
      class="courses__subheader"
    >
      Details of {{ courseItem.name }} course
    </h3>
    <div v-if="isUser">
      <nav class="nav my-3">
        <BaseButton
          class="nav__btn"
          variant="btn_black"
          @click="getBackCourseDetailsView"
        >
          Back
        </BaseButton>
      </nav>
      <div v-if="courseItem">
        <div
          class="
            grid grid-cols-2 grid-rows-2
            gap-x-5 gap-y-5
            xl:gap-x-10 xl:gap-y-10
          "
        >
          <div class="part col-span-1 col-start-1 row-span-1">
            <div class="header">
              <h2 class="part__text">
                Main info
              </h2>
            </div>
            <div class="flex flex-col gap-5">
              <div class="text-left">
                <label class="main__header_label">Name
                  <p class="main__header_text">{{ courseItem.name }}</p>
                </label>
              </div>
              <div class="text-left">
                <label class="main__header_label">Date of starting
                  <p class="main__header_text">{{ courseItem.date }}</p>
                </label>
              </div>
              <div class="text-left">
                <label class="main__header_label">Date of starting project
                  <p class="main__header_text">{{ courseItem.date_project_start }}</p>
                </label>
              </div>
              <div class="text-left">
                <label class="main__header_label">Date of demo
                  <p class="main__header_text">{{ courseItem.date_project_demo }}</p>
                </label>
              </div>
              <div class="text-left">
                <label class="main__header_label">Date of final interview
                  <p class="main__header_text">{{ courseItem.date_final_interview }}</p>
                </label>
              </div>
              <div
                class="text-left p-1 rounded-md w-fit"
                :class="{
                  'bg-blue-300/25': courseItem.status === 'not started',
                  'bg-green-500/25': courseItem.status === 'in progress',
                  'bg-red-400/25': courseItem.status === 'finished',
                }"
              >
                <label class="text-xs">Status
                  <p class="text-xl">{{ courseItem.status }}</p>
                </label>
              </div>
            </div>
          </div>
          <div class="part col-span-1 col-start-2 row-start-2 row-span-1">
            <h2 class="part__text">
              Homework
            </h2>
            <BaseTable
              class="table"
              :table-data="{
                headingData: headerHomework,
                bodyData: courseItem.homework,
              }"
              :edit-btns="false"
              :is-data-loading="loadingStatus"
              :delete-btns="false"
            />
          </div>
          <div class="part col-span-1 col-start-1">
            <h2 class="part__text">
              Group
            </h2>
            <BaseTable
              class="table"
              :table-data="{
                headingData: headersGroup,
                bodyData: courseItem.group,
              }"
              :edit-btns="false"
              :is-data-loading="loadingStatus"
              :delete-btns="false"
            />
          </div>
          <div 
            v-if="courseItem.materials"
            class="part col-start-2 row-start-1 col-span-1"
          >
            <div class="header">
              <h2 class="part__text">
                Materials
              </h2>
            </div>
            <BaseTable
              class="table"
              :table-data="{
                headingData: headerMaterials,
                bodyData: courseItem.materials,
              }"
              :edit-btns="false"
              :is-data-loading="loadingStatus"
              :delete-btns="false"
              @delete="deleteMaterialRow"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="isMentor || isAdmin">
      <div
        v-if="courseItem"
        class="text-center my-3"
      >
        <nav class="nav flex-wrap my-3">
          <BaseButton
            class="nav__btn"
            variant="btn_black"
            @click="getBackCourseDetailsView"
          >
            Back
          </BaseButton>

          <div class="nav__courses">
            <div class="flex">
              <BaseButton
                :disabled="isFirstCourse"
                class="nav__btn"
                @click="previousPage"
              >
                Prev
              </BaseButton>
              <BaseButton
                :disabled="isLatsCourse"
                class="nav__btn"
                @click="nextPage"
              >
                Next
              </BaseButton>
            </div>
          </div>
        </nav>
        <div
          class="
            grid grid-cols-4 grid-rows-4 auto-rows-fr
            gap-x-5 gap-y-5
            xl:gap-x-15 xl:gap-y-10
          "
        >
          <div class="part col-span-2 col-start-1 row-span-1">
            <div class="header">
              <h2 class="part__text">
                Main info
              </h2>
              <BaseButton
                class="nav__btn"
                @click="toggleUpdateModal"
              >
                <BaseEditIcon />
              </BaseButton>
            </div>
            <div class="flex flex-col gap-5">
              <div class="text-left">
                <label class="main__header_label">Name
                  <p class="main__header_text">{{ courseItem.name }}</p>
                </label>
              </div>
              <div class="text-left">
                <label class="main__header_label">Date of starting
                  <p class="main__header_text">{{ courseItem.date }}</p>
                </label>
              </div>
              <div class="text-left">
                <label class="main__header_label">Date of starting project
                  <p class="main__header_text">{{ courseItem.date_project_start }}</p>
                </label>
              </div>
              <div class="text-left">
                <label class="main__header_label">Date of demo
                  <p class="main__header_text">{{ courseItem.date_project_demo }}</p>
                </label>
              </div>
              <div class="text-left">
                <label class="main__header_label">Date of final interview
                  <p class="main__header_text">{{ courseItem.date_final_interview }}</p>
                </label>
              </div>
              <div
                class="text-left p-1 rounded-md w-fit"
                :class="{
                  'bg-blue-300/25': courseItem.status === 'not started',
                  'bg-green-500/25': courseItem.status === 'in progress',
                  'bg-red-400/25': courseItem.status === 'finished',
                }"
              >
                <label class="text-xs">Status
                  <p class="text-xl">{{ courseItem.status }}</p>
                </label>
              </div>
            </div>
          </div>
          <div
            class="part col-span-2 col-start-3"
          >
            <div class="header">
              <h2 class="part__text">
                Comments
              </h2>
              <BaseButton
                class="nav__btn"
                @click="openAddCommentModal"
              >
                <BasePlus />
              </BaseButton>
            </div>
            <BaseTable
              class="table"
              :table-data="{
                headingData: headerComments,
                bodyData: courseItem.comments,
              }"
              :edit-btns="false"
              :is-data-loading="loadingStatus"
              :delete-btns="true"
              @delete="deleteComment"
            />
          </div>
          <div class="part col-span-4 col-start-1">
            <GroupWidget :course="courseItem" />
          </div>
          <div class="part col-span-4 col-start-1">
            <ResultWidget :course="courseItem" />
          </div>
          <div class="part col-start-1 col-span-4">
            <div class="header">
              <h2 class="part__text">
                Homework
              </h2>
              <BaseButton
                class="nav__btn"
                @click="toggleNewHomeworkModal"
              >
                <BasePlus />
              </BaseButton>
            </div>

            <BaseTable
              class="table"
              :table-data="{
                headingData: headerHomework,
                bodyData: courseItem.homework,
              }"
              :edit-btns="false"
              :is-data-loading="loadingStatus"
              :delete-btns="true"
              @delete="deleteHomework"
            />
          </div>
          <div 
            v-if="courseItem.homework_results"
            class="part col-start-1 col-span-4"
          >
            <div class="header">
              <h2 class="part__text">
                Homework Results
              </h2>
            </div>
            <BaseTable
              class="table"
              :table-data="{
                headingData: cutHeaderHomeworkResults(),
                bodyData: courseItem.homework_results,
              }"
              :edit-btns="true"
              :is-data-loading="loadingStatus"
              :delete-btns="false"
              @edit="openEditHomeworkResultModal"
            />
          </div>
          <div 
            v-if="courseItem.materials"
            class="part col-start-1 col-span-4"
          >
            <div class="header">
              <h2 class="part__text">
                Materials
              </h2>
              <BaseButton
                class="nav__btn"
                @click="toggleNewMaterialModal"
              >
                <BasePlus />
              </BaseButton>
            </div>
            <BaseTable
              class="table"
              :table-data="{
                headingData: headerMaterials,
                bodyData: courseItem.materials,
              }"
              :edit-btns="false"
              :is-data-loading="loadingStatus"
              :delete-btns="true"
              @delete="deleteMaterialRow"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>No courses</h3>

      <BaseButton
        variant="btn_black"
        @click="getBackCourseDetailsView"
      >
        Back
      </BaseButton>
    </div>
    <CourseDetailsUpdateModal 
      :id="+$route.params.id" 
      :toggle-modal="isUpdateModalOpened"
    />
    <NewApplicantModal 
      :id="+$route.params.id" 
      :toggle-modal="isModalOpened" 
    />
    <NewGroupMember 
      :id="+$route.params.id" 
      :toggle-modal="isNewGroupMemberModal" 
    />
    <NewHomeWorkModal :toggle-modal="isNewHomeworkModal" />
    <HomeworkResaltsModal 
      :id="+$route.params.id" 
      :toggle-modal="isEditHomeworkResultModalOpen"
      :student-id="studentId"
    />
    <NewCommentModal :toggle-modal="isAddCommentModalOpen" />
    <NewMaterialModal :toggle-modal="isNewMaterialModal" />
    <BaseDeleteModal
      :toggle-modal="isDeleteModalOpen"
      :target-value="targetRow"
      @delete="submitDelete"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseButton from "../components/BaseComponents/BaseButton.vue";
import BaseTable from "../components/BaseComponents/BaseTable/BaseTable.vue";
import { COURSE_DETAILS, COURSE_DASHBOARD } from "../constants/routes.constant";
import BaseEditIcon from "@/components/BaseComponents/BaseIcons/BaseEditIcon.vue";

import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import {
  STUDENTS_ROLE,
  MENTOR_ROLE,
  ADMIN_ROLE,
} from "@/constants/roles.constant";
import BasePlus from "@/components/BaseComponents/BaseIcons/BasePlus.vue";

import NewApplicantModal from "@/components/Modals/CourseDetailsModals/NewApplicantModal.vue";
import NewCommentModal from "../components/Modals/CourseDetailsModals/NewCommentModal.vue";
import CourseDetailsUpdateModal from "@/components/Modals/CourseDetailsModals/CourseDetailsUpdateModal.vue";
import NewGroupMember from "../components/Modals/CourseDetailsModals/NewGroupMemberModal.vue";
import NewHomeWorkModal from "../components/Modals/CourseDetailsModals/NewHomeWorkModal.vue";
import NewMaterialModal from "../components/Modals/CourseDetailsModals/NewMaterialModal.vue";
import BaseDeleteModal from "../components/BaseComponents/BaseDeleteModal";
import HomeworkResaltsModal from "../components/Modals/CourseDetailsModals/HomeworkResaltsModal.vue";
import GroupWidget from '../components/GroupWidget.vue';
import ResultWidget from '../components/ResultWidget.vue';

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

export default {
  components: {
    BaseTable,
    BaseButton,
    NewApplicantModal,
    NewCommentModal,
    CourseDetailsUpdateModal,
    NewGroupMember,
    NewHomeWorkModal,
    HomeworkResaltsModal,
    NewMaterialModal,
    BasePlus,
    BaseEditIcon,
    BaseDeleteModal,
    GroupWidget,
    ResultWidget
  },
  data() {
    return {
      comments: "",
      payload: {},
      homeworkPayload: {},
      targetRow: {},
      studentId: null,
      isAddCommentModalOpen: false,
      isModalOpened: false,
      isUpdateModalOpened: false,
      isNewGroupMemberModal: false,
      isNewResultModal: false,
      isNewHomeworkModal: false,
      isDeleteModalOpen: false,
      isEditHomeworkResultModalOpen: false,
      isNewMaterialModal: false,
      headersUser: [
        { name: "Course Name" },
        { date: "Date" },
        { status: "Status" },
      ],
      headersGroup: [{ fullName: "Full Name" }, { email: "Email" }],
      headerMainInfo: [
        { name: "Course Name" },
        { date: "Date of starting" },
        { date_project_start: "Date of starting project"},
        { date_project_demo: "Date of demo"},
        { date_final_interview: "Date of final interview"},
      ],
      headerApplicants: [
        { fullName: "Full Name" },
        { initialScore: "Initial Score" },
      ],
      headerHomework: [{ name: "Homework Name" }, { date: "Date" }],
      headerHomeworkResults: [
        { students_name: "Students Name" }, 
        { hw1: "HW 1" },
        { hw2: "HW 2" },
        { hw3: "HW 3" },
        { hw4: "HW 4" },
        { hw5: "HW 5" },
        { hw6: "HW 6" },
        { hw7: "HW 7" },
        { hw8: "HW 8" },
        { hw9: "HW 9" },
        { hw10: "HW 10" },
        { hw11: "HW 11" },
        { total: "Total"},
      ],
      headerResults: [{ fullName: "Name" }, { score: "Results" }],
      headerMaterials: [{ name: "Material name" }, { link: "Link" }],
      headerComments: [
        { message: "Message" },
        { createdAt: "Date" },
        { author: "Author" },
      ],
    };
  },
  computed: {
    ...mapGetters("courses", [
      "loadingStatus",
      "getCourseById",
      "courseIndex",
      "nextCourseId",
      "previousCourseId",
      "lastCourseId",
      "firstCourseId",
    ]),
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
    courseItem() {
      return this.getCourseById(this.$route.params.id);
    },
    isLatsCourse() {
      return this.$route.params.id === this.lastCourseId;
    },
    isFirstCourse() {
      return this.$route.params.id === this.firstCourseId;
    },
  },
  mounted() {
    this.getCourses();
  },
  methods: {
    ...mapActions("courses", ["getCourses", "addNewComment", "patchCourses"]),
    openModal() {
      this.isModalOpened = !this.isModalOpened;
    },
    openDeleteModal() {
      this.isDeleteModalOpen = !this.isDeleteModalOpen;
    },
    submitDelete() {
      this.patchCourses(this.payload);
      this.patchCourses(this.homeworkPayload);
    },
    deleteApplicant(id) {
      this.openDeleteModal();
      const currentCourse = this.getCourseById(this.$route.params.id);
      const { applicants } = currentCourse;
      const filteredApplicants = applicants.filter(
        (applicant) => applicant.id !== id
      );
      this.targetRow = applicants.filter(
        (applicant) => applicant.id === id
      )[0].fullName;
      this.payload = {
        id: this.$route.params.id,
        field: "applicants",
        value: filteredApplicants,
      };
    },
    deleteHomework(id) {
      this.openDeleteModal();
      const currentCourse = this.getCourseById(this.$route.params.id);
      const { homework } = currentCourse;
      const filteredHomework = homework.filter((task) => task.id !== id);
      this.targetRow = homework.filter((task) => task.id === id)[0].name;
      this.payload = {
        id: this.$route.params.id,
        field: "homework",
        value: filteredHomework,
      };
    },
    openEditHomeworkResultModal(id){
      /* const currentCourse = this.getCourseById(this.$route.params.id); */
      this.studentId = id;/* 
      this.targetStudent = currentCourse.homework_results.find((e) => e.id === id);
      console.log(currentCourse.homework_results, this.studentId , this.targetStudent) */
      this.isEditHomeworkResultModalOpen = !this.isEditHomeworkResultModalOpen;
    },
    deleteComment(id) {
      this.openDeleteModal();
      const currentCourse = this.getCourseById(this.$route.params.id);
      const { comments } = currentCourse;
      const filteredComments = comments.filter((comment) => comment.id !== id);
      this.targetRow = comments.filter(
        (comment) => comment.id === id
      )[0].message;
      this.payload = {
        id: this.$route.params.id,
        field: "comments",
        value: filteredComments,
      };
    },
    deleteGroupMember(id) {
      this.openDeleteModal();
      const currentCourse = this.getCourseById(this.$route.params.id);
      const { group } = currentCourse;
      const filteredGroup = group.filter(
        (groupMember) => groupMember.id !== id
      );
      const { homework_results } = currentCourse;
      const filteredHomeworkResalts = homework_results.filter(
        (groupMember) => groupMember.id !== id
      );
      this.targetRow = group.filter(
        (groupMember) => groupMember.id === id
      )[0].fullName;
      this.homeworkPayload = {
        id: this.$route.params.id,
        field: "homework_results",
        value: filteredHomeworkResalts,
      };
      this.payload = {
        id: this.$route.params.id,
        field: "group",
        value: filteredGroup,
      };
    },
    deleteResultRow(id) {
      this.openDeleteModal();
      const currentCourse = this.getCourseById(this.$route.params.id);
      const { results } = currentCourse;
      const filteredResults = results.filter(
        (resultRow) => resultRow.id !== id
      );
      this.targetRow = results.filter(
        (resultRow) => resultRow.id === id
      )[0].fullName;
      this.payload = {
        id: this.$route.params.id,
        field: "results",
        value: filteredResults,
      };
    },
    deleteMaterialRow(id) {
      this.openDeleteModal();
      const currentCourse = this.getCourseById(this.$route.params.id);
      const { materials } = currentCourse;
      const filteredResults = materials.filter(
        (materialRow) => materialRow.id !== id
      );
      this.targetRow = materials.filter(
        (materialRow) => materialRow.id === id
      )[0].name;
      this.payload = {
        id: this.$route.params.id,
        field: "materials",
        value: filteredResults,
      };
    },
    previousPage() {
      this.$router.push({
        name: COURSE_DETAILS,
        params: { id: this.previousCourseId(this.$route.params.id) },
      });
      this.comments = "";
    },
    nextPage() {
      this.$router.push({
        name: COURSE_DETAILS,
        params: { id: this.nextCourseId(this.$route.params.id) },
      });
      this.comments = "";
    },
    getBackCourseDetailsView() {
      this.$router.push({ name: COURSE_DASHBOARD });
    },
    submit() {
      let currentItem = JSON.parse(
        JSON.stringify(this.getCourseById(this.$route.params.id))
      );
      currentItem.comments.push({
        id: Date.now(),
        message: this.comments,
        createdAt: new Date().toLocaleString(),
        author: this.user.fullName,
        author_id: this.user.id,
        author_email: this.user.email,
      });
      let payload = {
        currentItemUpdate: currentItem,
        id: this.$route.params.id,
      };
      this.addNewComment(payload);
      this.comments = "";
    },
    openAddCommentModal() {
      this.isAddCommentModalOpen = !this.isAddCommentModalOpen;
    },
    toggleUpdateModal() {
      this.isUpdateModalOpened = !this.isUpdateModalOpened;
    },
    toggleNewGroupMemberModal() {
      this.isNewGroupMemberModal = !this.isNewGroupMemberModal;
    },
    toggleNewResultModal() {
      this.isNewResultModal = !this.isNewResultModal;
    },
    toggleNewMaterialModal() {
      this.isNewMaterialModal = !this.isNewMaterialModal;
    },
    toggleNewHomeworkModal() {
      this.isNewHomeworkModal = !this.isNewHomeworkModal;
    },
    cutHeaderHomeworkResults() {
    return this.headerHomeworkResults.slice(0, +this.courseItem.homework_quantity + 1).concat(this.headerHomeworkResults.slice(-1))
    }
  },
};
</script>

<style lang="postcss" scoped>
.table {
  @apply border border-black mb-10 min-w-[50%] max-w-screen-xl mx-auto;
}

.header {
  @apply flex justify-between items-center;
}

.part {
  @apply shadow-lg bg-stone-50 p-6 border-primary-100 border-2 rounded-md;
}

button {
  @apply max-w-xs;
}

.courses__header {
  @apply font-semibold text-lg text-start text-primary-700;
}

.courses__subheader {
  @apply mt-2 font-normal text-stone-400 text-start;
}

.part__text {
  @apply text-left text-xl text-gray-700 mb-2;
}

.courses__container {
  @apply flex justify-center flex-col p-10;
}

.courses__container > * {
  @apply pb-0.5;
}

.nav {
  @apply flex justify-between px-0;
}

.nav__btn {
  @apply w-fit mx-1 my-2;
}

.nav__courses {
  @apply flex justify-between;
}

.main__header_label {
  @apply font-semibold text-primary-800;
}

.main__header_text {
  @apply /* text-2xl  */font-thin text-slate-700;
}
</style>
