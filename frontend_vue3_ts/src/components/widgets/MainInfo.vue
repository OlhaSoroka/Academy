<template>
	<div v-if="currentCourse" class="main__container">
		<h2 class="main__header">
			Main info
		</h2>
		<BaseTableEditable :column-defs="columnDefs" :row-data="courseDetailsStore.selectedCourse"
			:uniq-identifier="uniqIdentifier" @cellValueChanged="onCellEdit($event)"></BaseTableEditable>
	</div>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { PropType } from 'vue';
import { Course } from '../../api/models/course.model';
import { useCoursesStore } from '../../store/courses';
import BaseButton from '../baseComponents/BaseButton.vue';
import BaseEditIcon from '../baseComponents/BaseIcons/BaseEditIcon.vue';
import BaseTableEditable from '../../components/baseComponents/BaseTableEditable.vue'
import { getCourseById, updateCourseById } from '../../api/course';
import { useCourseDetailsStore } from '../../store/course-details.store';
export default {
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
		...mapStores(useCoursesStore, useCourseDetailsStore),
	},
	components: { BaseButton, BaseEditIcon, BaseTableEditable },
	beforeMount() {
		this.columnDefs = [
			{
				field: "name",
				headerName: "Name",
				sortable: false,
				editable: true,
				width: 200,
			},
			{
				field: "date",
				headerName: "Date of starting course",
				sortable: false,
				editable: true,
				width: 200,
				date: true
			},
			{
				field: "date_project_start",
				headerName: "Date of starting project",
				sortable: false,
				editable: true,
				width: 200,
				date: true
			},
			{
				field: "date_project_demo",
				headerName: "Date of demo",
				sortable: false,
				editable: true,
				width: 200,
				date: true
			},
			{
				field: "date_final_interview",
				headerName: "Date of final interview",
				sortable: false,
				editable: true,
				width: 200,
				date: true
			},
			{
				field: "status",
				headerName: "Status",
				sortable: false,
				editable: true,
				width: 200,
			}
		]
	},
	methods: {
		toggleModal() {
			this.isModalOpen = !this.isModalOpen
		},
		async onCellEdit(event: { uniqIdentifier: string, data: Course }) {
			await updateCourseById(event.uniqIdentifier, event.data);
			const updatedCourse = await getCourseById(event.uniqIdentifier)
			this.courseDetailsStore.updatedCourseInfo()
		},
	},
}
</script>

<style lang="scss" scoped>
.main__container {
	@apply shadow-lg bg-stone-50 border-primary-100 border-2 rounded-md p-14 w-full;
}

.main__header {
	@apply text-xl text-gray-700 mb-5;
}

.nav__btn {
	@apply w-fit mx-1 my-2;
}
</style>