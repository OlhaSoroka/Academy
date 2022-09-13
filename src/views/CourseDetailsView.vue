<template>
  <div class="courses__container">
    <h2 class="courses__header">
      Course Details
    </h2>
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
          <div class="part col-span-1 col-start-1">
            <h2 class="part__text">
              Main info
            </h2>
            <div class="flex justify-between flex-wrap">
              <div class="text-left">
                <label class="main__header_label">Name
                  <p class="main__header_text">{{ courseItem.name }}</p>
                </label>
              </div>
              <div class="text-left">
                <label class="main__header_label">Date
                  <p class="main__header_text">{{ courseItem.date }}</p>
                </label>
              </div>
              <div
                v-if="courseItem.docs_link"
                class="text-left"
              >
                <BaseTooltip :text="courseItem.docs_link">
                  <label class="main__header_label">
                    Docs :
                    <p class="main__header_text">
                      <a
                        target="”_blank”"
                        :href="courseItem.docs_link"
                      >{{
                        courseItem.docs_link.slice(0, 20)
                      }}</a>
                    </p>
                  </label>
                </BaseTooltip>
              </div>
              <div
                v-if="courseItem.status === 'not started'"
                class="text-left p-1 rounded-md"
                :class="{
                  'bg-blue-300': courseItem.status === 'not started',
                  'bg-green-500': courseItem.status === 'in progress',
                  'bg-red-400': courseItem.status === 'finished',
                }"
              >
                <label class="main__header_label">Status
                  <p class="main__header_text">{{ courseItem.status }}</p>
                </label>
              </div>
            </div>
          </div>
          <div class="part col-span-1 col-start-2 row-span-2">
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
            <BaseButton
              class="nav__btn whitespace-nowrap"
              @click="openAddCommentModal"
            >
              Add comment
            </BaseButton>
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
            grid grid-cols-5 grid-rows-3
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
                <label class="main__header_label">Date
                  <p class="main__header_text">{{ courseItem.date }}</p>
                </label>
              </div>
              <div
                v-if="courseItem.docs_link"
                class="text-left"
              >
                <BaseTooltip :text="courseItem.docs_link">
                  <label class="text-xs">
                    Docs

                    <p class="text-2xl">
                      <a
                        target="”_blank”"
                        :href="courseItem.docs_link"
                      >{{
                        courseItem.docs_link.slice(0, 20)
                      }}</a>
                    </p>
                  </label>
                </BaseTooltip>
              </div>
              <div
                class="text-left p-1 rounded-md w-fit"
                :class="{
                  'bg-blue-300': courseItem.status === 'not started',
                  'bg-green-500': courseItem.status === 'in progress',
                  'bg-red-400': courseItem.status === 'finished',
                }"
              >
                <label class="text-xs">Status
                  <p class="text-2xl">{{ courseItem.status }}</p>
                </label>
              </div>
            </div>
          </div>
          <div class="part col-span-3 col-start-3">
            <div class="header">
              <h2 class="part__text">
                Applicants
              </h2>
              <BaseButton
                class="nav__btn"
                @click="openModal"
              >
                <BasePlus />
              </BaseButton>
            </div>
            <BaseTable
              class="table"
              :table-data="{
                headingData: headerApplicants,
                bodyData: courseItem.applicants,
              }"
              :edit-btns="false"
              :is-data-loading="loadingStatus"
              :delete-btns="true"
              @delete="deleteApplicant"
            />
          </div>
          <div class="part col-span-2 col-start-1 row-span-1 xl:row-span-2">
            <div class="header">
              <h2 class="part__text">
                Group
              </h2>
              <BaseButton
                class="nav__btn"
                @click="toggleNewGroupMemberModal"
              >
                <BasePlus />
              </BaseButton>
            </div>

            <BaseTable
              class="table"
              :table-data="{
                headingData: headersGroup,
                bodyData: courseItem.group,
              }"
              :edit-btns="false"
              :is-data-loading="loadingStatus"
              :delete-btns="true"
              @delete="deleteGroupMember"
            />
          </div>
          <div class="part col-start-3 col-span-3 xl:col-span-2">
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
          <div class="part col-start-1 col-span-2 xl:col-span-1">
            <div class="header">
              <h2 class="part__text">
                Results
              </h2>
              <BaseButton
                class="nav__btn"
                @click="toggleNewResultModal"
              >
                <BasePlus />
              </BaseButton>
            </div>
            <BaseTable
              class="table"
              :table-data="{
                headingData: headerResults,
                bodyData: courseItem.results,
              }"
              :edit-btns="false"
              :is-data-loading="loadingStatus"
              :delete-btns="true"
              @delete="deleteResultRow"
            />
          </div>
          <div
            v-if="courseItem.comments.length"
            class="part col-span-3 col-start-3"
          >
            <h2 class="part__text">
              Comments
            </h2>
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
    <NewResultModal 
      :id="+$route.params.id" 
      :toggle-modal="isNewResultModal" 
    />
    <NewHomeWorkModal :toggle-modal="isNewHomeworkModal" />
    <NewCommentModal :toggle-modal="isAddCommentModalOpen" />
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
import BaseTooltip from "../components/BaseComponents/BaseTooltip/BaseTooltip.vue";
import CourseDetailsUpdateModal from "@/components/Modals/CourseDetailsModals/CourseDetailsUpdateModal.vue";
import NewGroupMember from "../components/Modals/CourseDetailsModals/NewGroupMemberModal.vue";
import NewResultModal from "../components/Modals/CourseDetailsModals/NewResultModal.vue";
import NewHomeWorkModal from "../components/Modals/CourseDetailsModals/NewHomeWorkModal.vue";
import BaseDeleteModal from "../components/BaseComponents/BaseDeleteModal";

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

export default {
  components: {
    BaseTable,
    BaseButton,
    NewApplicantModal,
    NewCommentModal,
    BaseTooltip,
    CourseDetailsUpdateModal,
    NewGroupMember,
    NewResultModal,
    NewHomeWorkModal,
    BasePlus,
    BaseEditIcon,
    BaseDeleteModal,
  },
  data() {
    return {
      comments: "",
      payload: {},
      targetRow: {},
      isAddCommentModalOpen: false,
      isModalOpened: false,
      isUpdateModalOpened: false,
      isNewGroupMemberModal: false,
      isNewResultModal: false,
      isNewHomeworkModal: false,
      isDeleteModalOpen: false,
      headersUser: [
        { name: "Course Name" },
        { date: "Date" },
        { status: "Status" },
      ],
      headersGroup: [{ fullName: "Full Name" }, { email: "Email" }],
      headerMainInfo: [
        { name: "Course Name" },
        { date: "Date" },
        { docs_link: "Docs Link" },
      ],
      headerApplicants: [
        { fullName: "Full Name" },
        { initialScore: "Initial Score" },
      ],
      headerHomework: [{ name: "Homework Name" }, { date: "Date" }],
      headerResults: [{ fullName: "Name" }, { score: "Results" }],
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
      this.targetRow = group.filter(
        (groupMember) => groupMember.id === id
      )[0].fullName;
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
    toggleNewHomeworkModal() {
      this.isNewHomeworkModal = !this.isNewHomeworkModal;
    },
  },
};
</script>

<style lang="postcss" scoped>
.table {
  @apply border border-black mb-10 min-w-[50%] max-w-screen-lg mx-auto;
}

.header {
  @apply flex justify-between items-center;
}

.part {
  @apply shadow-lg bg-stone-50 p-6 border-sky-100 border-2 rounded-md;
}

button {
  @apply max-w-xs;
}

.courses__header {
  @apply font-semibold text-lg text-start text-sky-700;
}

.part__text {
  @apply text-left text-xl text-gray-700 mb-2;
}

.courses__container {
  @apply flex justify-center flex-col mt-10 mx-3;
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
  @apply font-semibold text-sky-800;
}

.main__header_text {
  @apply text-2xl font-thin text-slate-700;
}
</style>
