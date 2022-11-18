<template>
	<div class="courses__container">
		<div class="courses__header_container">
			<h1 class="courses__header">Courses Dashboard</h1>
			<div>
				<BaseButton :variant="'btn_blue'" @click="addCourse">Add new course</BaseButton>
			</div>
		</div>
		<div class="courses__widget">
			<BaseTableEditable :column-defs="columnDefs" :row-data="coursesStore.courses" uniq-identifier="id"
				@rowClick="onRowSelect"/>
		</div>
		<CourseCreateModal :toggle-modal="isAddCourseModalOpen"></CourseCreateModal>
	</div>

</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { getCourseById } from '../api/course';
import BaseButton from '../components/baseComponents/BaseButton.vue';
import BaseTableEditable from '../components/baseComponents/BaseTableEditable.vue';
import CourseCreateModal from '../components/modals/CourseCreateModal.vue';
import { ROUTE_NAMES } from '../models/router.model';
import { useCourseDetailsStore } from '../store/course-details.store';
import { useCoursesStore } from '../store/courses';

export default {
	components: { BaseTableEditable, CourseCreateModal, BaseButton },
	mounted() {
		this.coursesStore.fetchCourses();
	},
	data() {
		return {
			isAddCourseModalOpen: false,
			columnDefs: [
				{ field: "name", headerName: "Course Name", sortable: true, editable: false, minWidth: 150, width: 200 },
				{ field: "date", headerName: "Date", sortable: true, editable: false, minWidth: 150, width: 200 },
				{ field: "status", headerName: "Status", sortable: true, editable: false, minWidth: 150, width: 200 },
				{ field: "", headerName: "", sortable: false, editable: false, width: 120, actionColumn: true, delete: true },
			],
		}
	},
	computed: {
		...mapStores(useCoursesStore, useCourseDetailsStore),
	},
	methods: {
		async onRowSelect(courseId: string) {
			const course = await getCourseById(courseId);
			this.courseDetailsStore.setCourseDetails(course)
			this.$router.push({ name: ROUTE_NAMES.COURSE_DETAILS, params: { id: courseId } })

		},
		addCourse() {
			this.isAddCourseModalOpen = !this.isAddCourseModalOpen
		},
		// async onCourseDelete(courseId: string) {
		// 	await deleteCourse(courseId);
		// 	this.courseDetailsStore.updateLectures();
		// }
	}
}
</script>

<style lang="css" scoped>
.courses__container {
	@apply p-10 bg-primary-100 min-h-full;
}
.courses__header_container {
	@apply flex justify-between items-center mb-6;
}
.courses__header {
	@apply font-semibold text-lg text-start text-primary-700;
}

.courses__subheader {
	@apply mt-2 font-normal text-stone-400 text-start;
}

.courses__widget {
    @apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full
}
.courses__nav {
	@apply flex justify-between px-0;
}

.courses__nav__btn {
	@apply w-fit mx-1 my-2;
}
</style>