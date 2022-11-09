<template>
	Courses Dashboard Views
	<div class="flex justify-end"><button class="bg-red-500 text-white" @click="addCourse">Add course</button></div>
	<div>
		<BaseTableEditable style="height: 400px;" :column-defs="columnDefs" :row-data="rowData" uniq-identifier="id"
			@rowClick="onRowSelect" />
	</div>
	<CourseCreateModal :toggle-modal="isAddCourseModalOpen"></CourseCreateModal>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { Course } from '../api/models/course.model';
import BaseTableEditable from '../components/baseComponents/BaseTableEditable.vue';
import CourseCreateModal from '../components/modals/CourseCreateModal.vue';
import { ROUTE_NAMES } from '../models/router.model';
import { useCoursesStore } from '../store/courses';

export default {
	components: { BaseTableEditable, CourseCreateModal },
	mounted() {
		this.coursesStore.fetchCourses();
	},
	data() {
		return {
			isAddCourseModalOpen: false,
			columnDefs: [
				{ field: "name", headerName: "Course Name", sortable: true, editable: false, minWidth: 150, width: 200 },
				{ field: "date", headerName: "Date", sortable: true, editable: false, minWidth: 150, width: 200 },
				{ field: "status", headerName: "Status", sortable: true, editable: false, minWidth: 150, width: 200 }
			],
		}
	},
	computed: {
		...mapStores(useCoursesStore),
		rowData(): any {
			return this.coursesStore.courses.map((course: Course) => ({
				id: course.id,
				name: course.name,
				date: course.date,
				status: course.status
			}))
		}
	},
	methods: {
		onRowSelect(courseId: string) {
			this.$router.push({ name: ROUTE_NAMES.COURSE_DETAILS, params: { id: courseId } })

		},
		addCourse() {
			this.isAddCourseModalOpen = !this.isAddCourseModalOpen
		}
	}
}
</script>