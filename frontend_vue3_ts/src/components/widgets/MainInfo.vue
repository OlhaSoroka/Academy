<template>
	<div v-if="currentCourse" class="main__widget_container">
		<div class="header">
			<h2 class="main__header">
				Main info
			</h2>
		</div>
		<BaseTableEditable :column-defs="columnDefs" :row-data="rowData"
		:uniq-identifier="uniqIdentifier" ></BaseTableEditable>
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
export default {
	props: {
		currentCourse:{
			type: Object as PropType<Course>
		}
	},
	data(): {
		isModalOpen:boolean,
		columnDefs: any,
		rowData: any,
		uniqIdentifier: any,
	} {
		return {
			isModalOpen:false,
			columnDefs: [],
			rowData: [],
			uniqIdentifier: 'id',
		};
	},
	computed: {
		...mapStores(useCoursesStore),
	},
	components: { BaseButton, BaseEditIcon, BaseTableEditable },
	methods: {
		toggleModal() {
			this.isModalOpen = !this.isModalOpen
		}
	},
	beforeMount() {
		this.columnDefs=[
			{
				field: "name",
				headerName: "Name",
				sortable: true,
				editable: false,
				width: 200,
			},
			{
				field: "date",
				headerName: "Date of starting course",
				sortable: true,
				editable: false,
				width: 200,
			},
			{
				field: "date_project_start",
				headerName: "Date of starting project",
				sortable: true,
				editable: false,
				width: 200,
			},
			{
				field: "date_project_demo",
				headerName: "Date of demo",
				sortable: true,
				editable: false,
				width: 200,
			},
			{
				field: "date_final_interview",
				headerName: "Date of final interview",
				sortable: true,
				editable: false,
				width: 200,
			},
			{
				field: "status",
				headerName: "Status",
				sortable: true,
				editable: true,
				width: 200,
			}
		]
		this.rowData=[this.currentCourse]
	}
}
</script>

<style>
.main__widget_container {
	@apply shadow-lg bg-stone-50 border-primary-100 border-2 rounded-md p-14 w-full;
}
.main__header {
	@apply text-xl text-gray-700 mb-5;
}
.nav__btn {
  @apply w-fit mx-1 my-2;
}
</style>