<template>
  <div>
    <div 
      v-if="courseItem" 
      class="text-center"
    >
      <h2>CoursesDetailsView</h2>
      <div class="flex justify-around">
        <BaseButton 
          variant="btn_black" 
          @click="getBackCourseDetailsView"
        >
          Back
        </BaseButton>
        <BaseButton @click="nextPage"> 
          Next course 
        </BaseButton>
      </div>
      <h3>Main Info</h3>
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
      <BaseTable
        class="table"
        :table-data="{
          headingData: headerApplicants,
          bodyData: courseItem.applicants,
        }"
        :edit-btns="false"
        :is-data-loading="loadingStatus"
        :delete-btns="false"
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
          class="border" 
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
          <p class="text-red-500">
            {{ getErrorNewComment }}
          </p>
          <BaseButton 
            :disabled="invalid" 
            type="submit"
          >
            Send comment
          </BaseButton>
        </form>
      </ValidationObserver>
    </div>
    <div v-else>
      <h3>There are no courses.</h3>
    </div>
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

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

export default {
  components: {
    BaseTable,
    BaseButton,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      comments: "",
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
    ...mapGetters([
      "loadingStatus",
      "getCourseById",
      "courseIndex",
      "nextCourseId",
      "getErrorNewComment",
    ]),
    courseItem() {
      return this.getCourseById(this.$route.params.id);
    },
  },
  mounted() {
    this.getCourses();
  },
  methods: {
    ...mapActions(["getCourses", "addNewComment"]),
    nextPage() {
      this.$router.push({
        name: COURSE_DETAILS,
        params: { id: this.nextCourseId(this.$route.params.id) },
      });
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
        author: "User User",
        author_id: "User ID",
        author_email: "User email",
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
</style>
