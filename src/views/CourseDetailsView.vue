<template>
  <div 
    v-if="courseItem" 
    class="flex justify-center flex-col">
    <h2>CoursesDetailsView</h2>
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
    <form 
      class="border" 
      @submit.prevent="submit">
      <textarea 
        v-model="comments" 
        class="border" 
        cols="50" 
        rows="5" 
      />
      <BaseButton
        :disabled="comments === ''"
        type="submit"
        :class="{
          disable: !comments,
        }"
        class="m-3 relative bottom-5"
      >
        Send comment
      </BaseButton>
    </form>
    <BaseButton @click="nextPage"> Next course </BaseButton>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import BaseButton from "../components/BaseButton.vue";
import BaseTable from "../components/UI/BaseTable/BaseTable.vue";
import { COURSE_DETAILS } from "../constants/routes.constant";

export default {
  components: {
    BaseTable,
    BaseButton,
  },
  data() {
    return {
      comments: "",
      COURSE_DETAILS,
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
      "courseById",
      "courseIndex",
      "nextCourseId",
    ]),
    courseItem() {
      return this.courseById(this.$route.params.id);
    },
  },
  mounted() {
    this.getCourses();
  },
  methods: {
    ...mapActions(["getCourses", "newComment"]),
    nextPage() {
      this.$router.push({
        name: COURSE_DETAILS,
        params: { id: this.nextId() },
      });
    },
    nextId() {
      return this.nextCourseId(
        this.courseIndex(this.courseById(this.$route.params.id))
      );
    },
    submit() {
      let newItem = this.courseById(this.$route.params.id);
      newItem.comments.push({
        id: Date.now(),
        message: this.comments,
        createdAt: Date(),
        author: "User User",
        author_id: "User ID",
        author_email: "User email",
      });
      let payload = {
        newCourseItem: newItem,
        id: this.$route.params.id,
      };
      this.newComment(payload);
      this.comments = "";
    },
  },
};
</script>

<style lang="postcss" scoped>
.table {
  @apply border border-black mb-10 min-w-[50%] max-w-screen-lg mx-auto;
}
.disable {
  @apply bg-slate-300 hover:bg-slate-300;
}
</style>
