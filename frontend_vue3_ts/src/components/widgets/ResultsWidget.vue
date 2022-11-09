<template>
	<div>
		<div class="flex justify-between">
			<div class="text-xl text-gray-700 mb-5">
				Results
			</div>
		</div>
		<div>
			<BaseTableEditable style="min-height: 400px" :column-defs="columnDefs" :row-data="rowData"
				uniq-identifier="email" @cellValueChanged="onCellEdit($event)" />
		</div>
	</div>
</template>
	
<script lang="ts">
import { ROLES } from "../../models/router.model";
import BaseTableEditable from "../baseComponents/BaseTableEditable.vue";
import { mapStores } from 'pinia';
import { useUserStore } from '../../store/user';
import { getResultsByCourse } from "../../api/results";
import {getStudentsByCourse} from "../../api/user"

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
		uniqIdentifier: any,
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
		const results = await getResultsByCourse(this.courseId!);
		const students = await getStudentsByCourse(this.courseId!);
		this.rowData = results.map(result => ({
			...result,
			fullName: students.find(student => student.id === result.studentId)?.fullName
		}))
	},
	methods: {
		async onCellEdit(event: any) {
			// const updatedMember = this.results.find((item) => item[this.uniqIdentifier] === event.uniqIdentifier);
			// const updatedIndex = this.results.findIndex((item) => item[this.uniqIdentifier] === event.uniqIdentifier);
			// updatedMember[event.colDef.field] = event.newValue;

			// updatedMember.start_total = +updatedMember.multiple_choice + +updatedMember.tech_task;
			// updatedMember.middle_total = +updatedMember.start_total + +updatedMember.eng_test;

			// this.results.splice(updatedIndex, 1, updatedMember);
			// this.rowData =  this.results;
			// await updateCourseById(this.course.id, {
			//   ...this.course,
			//   results: this.results,
			// });
		},
	},
};
</script>