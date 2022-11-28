<template>
	<div class="result__container">
		<div class="flex items-center">
			<h2 class="result__header mr-3">Entry</h2>
			<Spinner v-if="courseDetailsStore.resultWidgetLoading" />
		</div>
		<div>
			<BaseTableEditable :column-defs="columnDefs" :row-data="courseDetailsStore.results" class="mt-5"
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
import { EntryResult } from "../../api/models/result.model";
import { useCourseDetailsStore } from "../../store/course-details.store";
import Spinner from "../baseComponents/spinner/Spinner.vue";

export default {
	components: {
		BaseTableEditable,
		Spinner
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
				width: 120,
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
				editable: true,
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
				field: "total_with_eng",
				headerName: "Total with eng",
				sortable: true,
				editable: true,
				width: 100,
				solid: true
			},
			{
				field: "entry_tech_interview",
				headerName: "Interview",
				sortable: true,
				editable: this.isAdmin || this.isMentor,
				width: 120,
			},
			{
				field: "total_with_interview",
				headerName: "Total with interview",
				sortable: true,
				editable: this.isAdmin || this.isMentor,
				width: 120,
			},
			{
				field: "entry_tech_interviewer_comments",
				headerName: "Interviewer comments",
				sortable: false,
				editable: this.isAdmin || this.isMentor,
				width: 250,
			},
			{
				field: "entry_hr_interviewer_comments",
				headerName: "HR interviewer comments",
				sortable: false,
				editable: this.isAdmin,
				width: 250,
			},

		];
	},
	methods: {
		async onCellEdit(event: { uniqIdentifier: string, data: EntryResult }) {

			await this.updateResult(event);
		},
		async updateResult(event: { uniqIdentifier: string, data: EntryResult }): Promise<void> {
			await updateResultById(event.uniqIdentifier, event.data);
			this.courseDetailsStore.updatedGroupOrResult();
		}
	},

};
</script>
<style lang="scss" scoped>
.result__container {
	@apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full;
}

.result__header {
	@apply text-xl text-gray-700
}
</style>