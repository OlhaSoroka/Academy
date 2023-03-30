<template> 
	<div class="courses__container">
		<div class="courses__header_container">
			<div>
				<div class="flex items-center h-16">
					<h1 class="courses__header mr-3">Courses Dashboard
					</h1>
					<Spinner v-if="coursesStore.loadingStatus" />
				</div>
				<div class="courses__subheader">{{ !isArchive ? 'Current Academy courses' : 'Finished Academy courses' }}</div>
			</div>
			<div class="flex">
				<BaseButton v-if="userStore.isAdmin" :variant="'btn_blue'" @click="addCourse">Add new course
				</BaseButton>
			</div>
		</div>
		<div class="courses__widget">
			<div v-if="userStore.isAdmin" class="flex justify-end mb-4">
				<div class="flex rounded-lg">
					<div @click="showActive()"
						class="py-2 px-6 font-semibold text-slate-400 cursor-pointer border-2 border-slate-400 rounded-lg rounded-r-none hover:bg-primary-100"
						:class="!isArchive ? 'bg-primary-200 !text-primary-700 !border-primary-700' : 'border-r-0'">
						Active</div>
					<div @click="showArchive()"
						class="py-2 px-6 font-semibold text-slate-400 cursor-pointer border-2 border-slate-400 rounded-lg rounded-l-none hover:bg-primary-100"
						:class="isArchive ? 'bg-primary-200 !text-primary-700 !border-primary-700' : 'border-l-0'">
						Archive</div>
				</div>
			</div>
			<BaseTableEditable :column-defs="columnDefs"
				:row-data="isArchive ? coursesStore.archiveCourses : coursesStore.activeCourses" uniq-identifier="id"
				@deleteRow="onCourseDelete($event)" @rowClick="onRowSelect" class="min-h-[230px]"/>
		</div>
		<CourseCreateModal :toggle-modal="isAddCourseModalOpen"></CourseCreateModal>
	</div>

</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { getCourseById } from '../api/course';
import BaseButton from '../components/baseComponents/BaseButton.vue';
import BaseTableEditable from '../components/baseComponents/BaseTableEditable.vue';
import Spinner from '../components/Spinner.vue';
import CourseCreateModal from '../components/modals/CourseCreateModal.vue';
import { ROUTE_NAMES } from '../models/router.model';
import { useCourseDetailsStore } from '../store/course-details.store';
import { useCoursesStore } from '../store/courses';
import { useUserStore } from '../store/user';
import { defineComponent } from 'vue';


export default defineComponent({
	components: { BaseTableEditable, CourseCreateModal, BaseButton, Spinner },
	mounted() {
		this.coursesStore.fetchCourses();
	},
	data(): {
		columnDefs: any,
		isAddCourseModalOpen: boolean,
		isArchive: boolean
	} {
		return {
			isAddCourseModalOpen: false,
			columnDefs: [],
			isArchive: false
		};
	},
	beforeMount() {
		if (this.userStore.isStudent) {
			this.columnDefs = [
				{ field: "name", headerName: "Name", sortable: true, editable: false, minWidth: 150, width: 200 },
				{ field: "createdDate", headerName: "Created Date", sortable: true, editable: false, minWidth: 150, width: 200 },
			]
		}
		if (this.userStore.isMentor) {
			this.columnDefs = [
				{ field: "name", headerName: "Name", sortable: true, editable: false,filter:true, minWidth: 150, width: 200 },
				{ field: "createdDate", headerName: "Created Date", sortable: true, editable: false,filter:true, minWidth: 150, width: 200  },
				{ field: "status", headerName: "Status", sortable: true, editable: false,filter:true, minWidth: 150, width: 200 },
			]
		}
		if (this.userStore.isAdmin) {
			this.columnDefs = [
				{ field: "name", headerName: "Name", sortable: true, editable: false,filter:true, minWidth: 150, width: 200 },
				{ field: "createdDate", headerName: "Created Date", sortable: true, editable: false,filter:true, minWidth: 150, width: 200  },
				{ field: "status", headerName: "Status", sortable: true, editable: false,filter:true, minWidth: 150, width: 200 },
				{ field: "", headerName: "Delete", sortable: false, editable: false, width: 120, actionColumn: true, delete: true ,headerCentered:true },
			]
		}
	},
	computed: {
		...mapStores(useCoursesStore, useCourseDetailsStore, useUserStore),
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
		async onCourseDelete(courseId: string) {
			this.coursesStore.deleteCourse(courseId);
		},
		showActive(): void {
			this.isArchive = false;
		},
		showArchive(): void {
			this.isArchive = true;
		}
	}
});
</script>

<style lang="css" scoped>
.courses__container {
	@apply p-10 bg-primary-100 min-h-full;
}

.courses__header_container {
	@apply flex justify-between items-center mb-6;
}

.courses__header {
	@apply font-semibold text-slate-400 text-lg text-start !text-primary-700;
}

.courses__subheader {
	@apply mt-2 font-normal text-stone-400 text-start;
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