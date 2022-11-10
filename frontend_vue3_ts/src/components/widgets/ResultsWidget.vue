<template>
	<div class="w-full overflow-x-auto  shadow-lg bg-stone-50 border-primary-100 border-2 rounded-md p-14">
		<div class="flex justify-between">
			<div class="text-xl text-gray-700 mb-5">
				Results
			</div>
		</div>
		<div>
			<BaseTableEditable :column-defs="columnDefs" :row-data="rowData" :uniq-identifier="uniqIdentifier"
				@cellValueChanged="onCellEdit($event)" />
		</div>
	</div>
</template>
	
<script lang="ts">
import { ROLES } from "../../models/router.model";
import BaseTableEditable from "../baseComponents/BaseTableEditable.vue";
import { mapStores } from 'pinia';
import { useUserStore } from '../../store/user';
import { getResultsByCourse, updateResultById } from "../../api/results";
import { getStudentsByCourse } from "../../api/user"
import { Result } from "../../api/models/result.model";

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
		rowData: any,
		uniqIdentifier: string,
	} {
		return {
			columnDefs: [],
			rowData: [],
			uniqIdentifier: 'id',
		};
	},
	computed: {
		...mapStores(useUserStore),
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
				field: "fullName",
				headerName: "Name",
				sortable: true,
				editable: false,
				width: 200,
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
	async mounted() {
		await this.fetchResults();
	},
	methods: {
		async onCellEdit(event: { uniqIdentifier: string, data: Result }) {
			await this.updateResult(event);
		},
		async fetchResults(): Promise<void> {
			const results = await getResultsByCourse(this.courseId!);
			const students = await getStudentsByCourse(this.courseId!);
			this.rowData = results.map(result => ({
				...result,
				fullName: students.find(student => student.id === result.studentId)?.fullName
			}))
		},
		async updateResult(event: { uniqIdentifier: string, data: Result }): Promise<void> {
			await updateResultById(event.uniqIdentifier, event.data);
			await this.fetchResults();
		}
	},

};
</script>