<template>
	<div v-if="currentCourse" class="main__container">
		<div class="flex items-center">
			<h2 class="main__header mr-3">Main Info</h2>
			<CustomSpinner v-if="courseDetailsStore.mainInfoWidgetLoading" />
		</div>
		<BaseTableEditable :column-defs="columnDefs" :row-data="courseDetailsStore.selectedCourse"
			class="mt-5" :uniq-identifier="uniqIdentifier" @cellValueChanged="onCellEdit($event)">
		</BaseTableEditable>
	</div>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { defineComponent, PropType } from 'vue';
import { Course, CourseStatus } from '../../api/models/course.model';
import { useCoursesStore } from '../../store/courses';
import BaseButton from '../baseComponents/BaseButton.vue';
import BaseTableEditable from '../baseComponents/BaseTableEditable.vue'
import { useCourseDetailsStore } from '../../store/course-details.store';
import { useUserStore } from '../../store/user';
import { UpdateEvent } from '../../api/models/update.model';
import CustomSpinner from '../CustomSpinner.vue';
export default defineComponent({
	props: {
		currentCourse: {
			type: Object as PropType<Course>
		}
	},
	data(): {
		isModalOpen: boolean,
		columnDefs: any,
		uniqIdentifier: any,
	} {
		return {
			isModalOpen: false,
			columnDefs: [],
			uniqIdentifier: 'id',
		};
	},
	computed: {
		...mapStores(useCoursesStore, useCourseDetailsStore, useUserStore),
	},
	components: { BaseButton, BaseTableEditable, CustomSpinner },
	beforeMount() {
		this.columnDefs = [
			{
				field: "name",
				headerName: "Name",
				editable: this.userStore.isAdmin,
				width: 300,
			},
			{
				field: "date_course_start",
				headerName: "Date of starting course",
				editable: this.userStore.isAdmin,
				width: 200,
				date: true
			},
			{
				field: "date_project_start",
				headerName: "Date of starting project",
				editable: this.userStore.isAdmin,
				width: 200,
				date: true
			},
			{
				field: "date_project_demo",
				headerName: "Date of demo",
				editable: this.userStore.isAdmin,
				width: 200,
				date: true
			},
			{
				field: "date_final_interview",
				headerName: "Date of final interview",
				editable: this.userStore.isAdmin,
				width: 200,
				date: true
			},
			{
				field: "status",
				headerName: "Status",
				editable: this.userStore.isAdmin,
				width: 200,
				dropdown: true,
				options: [
					{ label: "Not Started", value: CourseStatus.NOT_STARTED },
					{ label: "In Progress", value: CourseStatus.IN_PROGRESS },
					{ label: "Finished", value: CourseStatus.FINISHED },
				]
			}
		]
	},
	methods: {
		toggleModal() {
			this.isModalOpen = !this.isModalOpen
		},
		async onCellEdit(event: UpdateEvent<Course>) {
			this.coursesStore.updateCourse(event);
			this.courseDetailsStore.updatedCourseInfo()
		},
	},
});
</script>

<style lang="scss" scoped>
.main__container {
	@apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full;
}

.main__header {
	@apply text-xl text-gray-700;
}

.nav__btn {
	@apply w-fit mx-1 my-2;
}
</style>