<template>
	<div class="result__container">
		<div class="result__header flex">
			<div>Results</div>
			<div v-if="courseDetailsStore.resultWidgetLoading">...Loading...</div>
		</div>
		<div>
			<BaseTableEditable :column-defs="columnDefs" :row-data="courseDetailsStore.results"
				:uniq-identifier="uniqIdentifier" @cellValueChanged="onCellEdit($event)" />
		</div>
	</div>
</template>
	
<script lang="ts">
import { ROLES } from "../../models/router.model";
import BaseTableEditable from "../baseComponents/BaseTableEditable.vue";
import { mapStores } from 'pinia';
import { useUserStore } from '../../store/user';
import { updateResultById } from "../../api/results";
import { Result } from "../../api/models/result.model";
import { useCourseDetailsStore } from "../../store/course-details.store";

export default {
	components: {
		BaseTableEditable,
	},
	props: {
		courseId: {
			type: String
		},
	},
	data(): {
		columnDefs: any,
		uniqIdentifier: string,
	} {
		return {
			columnDefs: [],
			uniqIdentifier: 'id',
		};
	},
	computed: {
		...mapStores(useUserStore, useCourseDetailsStore),
		isAdmin() {
			if (this.userStore.user) {
				return this.userStore.user.role === ROLES.ADMIN_ROLE
			}
		},
		isMentor() {
			if (this.userStore.user) {
				return this.userStore.user.role === ROLES.MENTOR_ROLE
			}
		}
	},
	beforeMount() {
		this.columnDefs = [
			{
				field: "student",
				headerName: "Name",
				sortable: true,
				editable: false,
				width: 300,
			},
			{
				field: "multiple_choice",
				headerName: "Multiple choice",
				sortable: true,
				editable: this.isAdmin,
				width: 150,
			},
			{
				field: "tech_task",
				headerName: "Tech Task",
				sortable: true,
				editable: this.isAdmin,
				width: 100,
			},
			{
				field: "start_total",
				headerName: "Total",
				sortable: true,
				editable: false,
				width: 100,
				solid: true
			},
			{
				field: "eng_test",
				headerName: "English Test",
				sortable: true,
				editable: this.isAdmin,
				width: 100,
			},
			{
				field: "middle_total",
				headerName: "Total",
				sortable: true,
				editable: false,
				width: 100,
				solid: true
			},
			{
				field: "interview_result",
				headerName: "Interview Result",
				sortable: true,
				editable: this.isAdmin || this.isMentor,
				width: 150,
			},
			{
				field: "interviewer_comments",
				headerName: "Interviewer comments",
				sortable: false,
				editable: this.isAdmin || this.isMentor,
				width: 250,
			},
			{
				field: "hr_interviewer_comments",
				headerName: "HR interviewer comments",
				sortable: false,
				editable: this.isAdmin,
				width: 250,
			},
			{
				field: "average_homework_score",
				headerName: "Average homework score",
				sortable: true,
				editable: false,
				width: 120,
			},
			{
				field: "mentors_feedback",
				headerName: "Mentor's Feedback",
				sortable: false,
				editable: this.isAdmin || this.isMentor,
				width: 250,
			},
			{
				field: "exit_tech_interview",
				headerName: "Exit Tech interview",
				sortable: true,
				editable: this.isAdmin || this.isMentor,
				width: 120,
			},
			{
				field: "final_interviewer_comments",
				headerName: "Interviewer comments",
				sortable: false,
				editable: this.isAdmin || this.isMentor,
				width: 250,
			},
			{
				field: "final_hr_interviewer_comments",
				headerName: "HR Interviewer comment",
				sortable: false,
				editable: this.isAdmin,
				width: 250,

			},
			{
				field: "final_english_interviewer_comments",
				headerName: "English Interviewer comment",
				sortable: false,
				editable: this.isAdmin,
				width: 250,
			},
		];
	},
	methods: {
		async onCellEdit(event: { uniqIdentifier: string, data: Result }) {
			await this.updateResult(event);
		},
		async updateResult(event: { uniqIdentifier: string, data: Result }): Promise<void> {
			await updateResultById(event.uniqIdentifier, event.data);
			this.courseDetailsStore.updatedGroupOrResult();
		}
	},

};
</script>
<style lang="postcss" scoped>
.result__container {
	@apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full;
}

.result__header {
	@apply text-xl text-gray-700 mb-5
}
</style>