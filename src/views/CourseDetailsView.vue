<template>
  <div>
    <div v-if="isUser">
      <div v-if="courseItem">
        <BaseTable
          :table-data="{
            headingData: headersUser,
            bodyData: [courseItem],
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
        <h2>Main Info</h2>
        <BaseTable
          class="table"
          :table-data="{
            headingData: headerMainInfo,
            bodyData: [courseItem],
          }"
          :edit-btns="false"
          :is-data-loading="loadingStatus"
          :delete-btns="false"
        />
        <h3>Applicants</h3>
        <BaseButton @click="openModal">
          Add new applicant
        </BaseButton>
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
        <div class="flex justify-around my-2">
          <BaseButton @click="nextPage">
            Next course
          </BaseButton>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>No courses</h3>
    </div>
    <BaseButton
      variant="btn_black"
      @click="getBackCourseDetailsView"
    >
      Back
    </BaseButton>
    <NewApplicantModal :toggle-modal="isModalOpened" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseButton from "../components/BaseComponents/BaseButton.vue";
import BaseTable from "../components/BaseComponents/BaseTable/BaseTable.vue";
import { COURSE_DETAILS, COURSE_DASHBOARD } from "../constants/routes.constant";
import { ValidationObserver, ValidationProvider } from "vee-validate";
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
    ValidationObserver,
    ValidationProvider,
    NewApplicantModal
  },
  data() {
    return {
      isModalOpened: false,
      comments: "",
      headersUser: [
        { name: "Course Name" },
        { date: "Date" },
        { status: "Status" },
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
    ]),
    ...mapGetters("user", ["user"]),
    isUser() {
      return this.user.role === USER_ROLE;
    },
    isManagerOrAdmin() {
      return this.user.role === MANAGER_ROLE || ADMIN_ROLE;
    },
    courseItem() {
      return this.getCourseById(this.$route.params.id);
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
      let currentItem = this.getCourseById(this.$route.params.id);
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
  },
};
</script>

<style lang="postcss" scoped>
.table {
  @apply border border-black mb-10 min-w-[50%] max-w-screen-lg mx-auto;
}

button {
  @apply max-w-xs;
}
</style>
