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
              class="nav__btn"
              @click="openAddCommentModal"
            >
              Add comment
            </BaseButton>
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
        </nav>
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
    <AddCommentModal :toggle-modal="isAddCommentModalOpen" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '../components/BaseComponents/BaseButton.vue';
import BaseTable from '../components/BaseComponents/BaseTable/BaseTable.vue';
import AddCommentModal from '../components/Modals/AddCommentModal.vue';
import { COURSE_DETAILS, COURSE_DASHBOARD } from '../constants/routes.constant';
import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { USER_ROLE, MANAGER_ROLE, ADMIN_ROLE } from '@/constants/roles.constant';

Object.keys(rules).forEach((rule) => {
	extend(rule, rules[rule]);
});

export default {
  components: {
    BaseTable,
    BaseButton,
    AddCommentModal
  },
  data() {
    return {
      isAddCommentModalOpen: false,
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
      "previousCourseId",
      "lastCourseId",
      "firstCourseId",
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
button {
	@apply max-w-xs;
}
.courses__header{
@apply font-semibold text-lg text-start text-sky-700;
}
.courses__container{
 @apply flex justify-center flex-col w-2/3 mt-10 mx-auto;
}
.nav{
 @apply flex justify-between px-0
}
.nav__btn{
  @apply w-fit mx-1
}
</style>
