<template>
  <div class="courses__container">
    <h2 class="courses__header">
      Course Details
    </h2>
    <div v-if="isUser">
      <nav class="nav">
        <BaseButton
          class="nav__btn"
          variant="btn_black"
          @click="getBackCourseDetailsView"
        >
          Back
        </BaseButton>
      </nav>
      <div v-if="courseItem">
        <h2>Main Info</h2>
        <BaseTable
          :table-data="{
            headingData: headersUser,
            bodyData: [courseItem],
          }"
          :edit-btns="false"
          :is-data-loading="loadingStatus"
          :delete-btns="false"
        />
        <h2>Group</h2>
        <BaseTable
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
    <div v-else-if="isManagerOrAdmin">
      <div
        v-if="courseItem"
        class="text-center my-3"
      >
        <nav class="nav">
          <BaseButton
            class="nav__btn"
            variant="btn_black"
            @click="getBackCourseDetailsView"
          >
            Back
          </BaseButton>

          <div class="nav__courses">
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
            <BaseButton @click="openModal">
              Add new applicant
            </BaseButton>
          </div>
        </nav>
        <div class="grid grid-cols-5 grid-rows-3 gap-x-20 gap-y-10 bg-stone-50">
          <div class="part col-span-2 col-start-1">
            <div class="flex justify-between">
              <div class="text-left">
                <label class="text-xs">Name
                  <p class="text-2xl">{{ courseItem.name }}</p>
                </label>
              </div>
              <div class="text-left">
                <label class="text-xs">Date
                  <p class="text-2xl">{{ courseItem.date }}</p>
                </label>
              </div>
              <div
                v-if="courseItem.docs_link"
                class="text-left"
              >
                <label class="text-xs">Docs
                  <p class="text-2xl">{{ courseItem.docs_link }}</p>
                </label>
              </div>
              <div
                v-if="courseItem.status === 'not started'"
                class='text-left p-1 rounded-md'
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
            <h2 class="text-left text-3xl">Applicants</h2>
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
          <div class="part col-span-2 col-start-1">
            <h2>Group</h2>
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
          <div class="part col-span-2 col-start-3">
            <h3>Homeworks</h3>
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
          <div class="part">
            <h3>Results</h3>
            <BaseTable
              class="table"
              :table-data="{
                headingData: headerResults,
                bodyData: courseItem.results,
              }"
              :edit-btns="false"
              :is-data-loading="loadingStatus"
              :delete-btns="false"
            />
          </div>
          <div class="part col-span-4">
            <h3>Comments</h3>
            <BaseTable
              class="table"
              :table-data="{
                headingData: headerComments,
                bodyData: courseItem.comments,
              }"
              :edit-btns="false"
              :is-data-loading="loadingStatus"
              :delete-btns="false"
            />
          </div>
          <BaseButton class="nav__btn ">
            Add comment
          </BaseButton>
        </div>






        <ValidationObserver v-slot="{ invalid }">
          <form
            class="border flex items-center flex-col"
            @submit.prevent="submit"
          >
            <ValidationProvider rules="required">
              <textarea
                v-model="comments"
                class="border"
                cols="50"
                rows="5"
              />
            </ValidationProvider>
            <BaseButton
              class="mb-3"
              :disabled="invalid"
              type="submit"
            >
              Send comment
            </BaseButton>
          </form>
        </ValidationObserver>
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
    <NewApplicantModal :toggle-modal="isModalOpened" />

    <AddCommentModal :toggle-modal="isAddCommentModalOpen" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseButton from "../components/BaseComponents/BaseButton.vue";
import BaseTable from "../components/BaseComponents/BaseTable/BaseTable.vue";
import { COURSE_DETAILS, COURSE_DASHBOARD } from "../constants/routes.constant";
import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import {
  USER_ROLE,
  MANAGER_ROLE,
  ADMIN_ROLE,
} from "@/constants/roles.constant";
import NewApplicantModal from "@/components/Modals/NewApplicantModal.vue";
import { patchCourse } from '.././api/course/index'

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

export default {
  components: {
    BaseTable,
    BaseButton,
    NewApplicantModal,
  },
  data() {
    return {
      comments: "",
      isModalOpened: false,
      headersUser: [
        { name: "Course Name" },
        { date: "Date" },
        { status: "Status" },
      ],
      headersGroup: [
        { fullName: "Fullname" },
        { email: "Email" },
      ],
      headerMainInfo: [
        { name: "Course Name" },
        { date: "Date" },
        { docs_link: "Docs Link" },
      ],
      headerApplicants: [
        { fullName: "Fullname" },
        { initialScore: "initialScore" },
      ],
      headerHomework: [{ name: "Homework Name" }, { date: "Date" }],
      headerResults: [{ "result in results": "Results" }],
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
      // "lastCourseId",
      // "firstCourseId",
    ]),
    ...mapGetters("user", ["user"]),
    isUser() {
      if (this.user) {
        return this.user.role === USER_ROLE;
      } else {
        return false;
      }
    },
    isManagerOrAdmin() {
      if (this.user) {
        return this.user.role === MANAGER_ROLE || ADMIN_ROLE;
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
    ...mapActions("courses", ["getCourses", "addNewComment"]),
    openModal() {
      this.isModalOpened = !this.isModalOpened
    },
    deleteApplicant(id) {
      const currentCourse = this.getCourseById(this.$route.params.id)
      const { applicants } = currentCourse
      const filteredApplicants = applicants.filter(applicant => applicant.id !== id)

      patchCourse(this.$route.params.id, 'applicants', filteredApplicants)
        .then(() => this.getCourses())
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
      let currentItem = JSON.parse(JSON.stringify(this.getCourseById(this.$route.params.id)))
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
  },
};
</script>

<style lang="postcss" scoped>
.table {
  @apply border border-black mb-10 min-w-[50%] max-w-screen-lg mx-auto;
}

.part {
  @apply shadow-lg
}

button {
  @apply max-w-xs;
}

.courses__header {
  @apply font-semibold text-lg text-start text-sky-700;
}

.courses__container {
  @apply flex justify-center flex-col mt-10;
}

.nav {
  @apply flex justify-between px-0
}

.nav__btn {
  @apply w-fit mx-1
}
</style>
