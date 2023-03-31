<template>
	<div class="result__container">
		<div class="flex items-center">
			<h2 class="result__header mr-3">Exit Results</h2>
			<CustomSpinner v-if="courseDetailsStore.resultWidgetLoading" />
		</div>
		<div>
			<BaseTableEditable :column-defs="columnDefs" :row-data="courseDetailsStore.exitResults" class="mt-5 min-h-[200px]"
				:uniq-identifier="uniqIdentifier" @cellValueChanged="onCellEdit($event)" />
		</div>
	</div>
</template>
	
<script lang="ts">
import { ROLES } from "../../models/router.model";
import BaseTableEditable from "../baseComponents/BaseTableEditable.vue";
import { mapStores } from 'pinia';
import { useUserStore } from '../../store/user';
import { updateExitResultById } from "../../api/exit_results";
import { ExitResult } from "../../api/models/result.model";
import { useCourseDetailsStore } from "../../store/course-details.store";
import { defineComponent } from "vue";
import CustomSpinner from "../CustomSpinner.vue";

export default defineComponent({
	components: {
    BaseTableEditable,
    CustomSpinner
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
				sortable: false,
				editable: false,
				width: 300,
				filter: true,
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
				headerName: "Tech interview",
				sortable: true,
				editable: this.isAdmin || this.isMentor,
				centered:true,
				width: 120,
			},
			{
				field: "average_homework_score",
				headerName: "Average homework score",
				sortable: true,
				editable: false,
				centered:true,
				width: 200,
			},
			{
				field: "final_interviewer_comments",
				headerName: "Interviewer comment",
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
		async onCellEdit(event: { uniqIdentifier: string, data: ExitResult }) {

			await this.updateResult(event);
		},
		async updateResult(event: { uniqIdentifier: string, data: ExitResult }): Promise<void> {
			await updateExitResultById(event.uniqIdentifier, event.data);
			this.courseDetailsStore.updatedGroupOrResult();
		}
	},

});
</script>
<style lang="scss" scoped>
.result__container {
	@apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full;
}

.result__header {
	@apply text-xl text-gray-700
}
</style>