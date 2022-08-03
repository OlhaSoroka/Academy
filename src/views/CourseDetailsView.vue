<template>
  <div>
    <div class="mt-3 flex justify-end">
      <div class="w-56">
        <BaseButton
          class="mb-3"
          @click="openAddCommentModal"
        >
          Add comment
        </BaseButton>
      </div>
    </div>
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
		AddCommentModal,
	},
	data() {
		return {
			isAddCommentModalOpen: false,
			headersUser: [{ name: 'Course Name' }, { date: 'Date' }, { status: 'Status' }],
			headerMainInfo: [{ name: 'Course Name' }, { date: 'Date' }, { docs_link: 'Docs Link' }],
			headerApplicants: [{ fullName: 'Fullname' }, { initialScore: 'initialScore' }],
			headerHomework: [{ name: 'Homework Name' }, { date: 'Date' }],
			headerResults: [{ 'result in results': 'Results' }],
      headerComments: [{ message: 'Message' }, { createdAt: 'Date' }, { author: 'Author' }],
		};
	},
	computed: {
		...mapGetters('courses', ['loadingStatus', 'getCourseById', 'courseIndex', 'nextCourseId']),
		...mapGetters('user', ['user']),
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
		...mapActions('courses', ['getCourses', 'addNewComment']),
		openAddCommentModal() {
			this.isAddCommentModalOpen = !this.isAddCommentModalOpen;
		},
		nextPage() {
			this.$router.push({
				name: COURSE_DETAILS,
				params: { id: this.nextCourseId(this.$route.params.id) },
			});
			this.comments = '';
		},
		getBackCourseDetailsView() {
			this.$router.push({ name: COURSE_DASHBOARD });
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
