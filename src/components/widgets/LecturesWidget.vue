<template>
	<div class="lecture__container">
		<div class="flex align-middle justify-between">
			<div class="flex items-center">
				<h2 class="lecture__header mr-3">Lectures</h2>
				<Spinner v-if="courseDetailsStore.lecturesWidgetLoading" />
			</div>
			<div>
				<BaseButton v-if="userStore.isAdmin || userStore.isMentor" @click="openModal()">
					Add
				</BaseButton>
			</div>
		</div>
		<div class="mt-5">
			<BaseTableEditable :column-defs="columnDefs" :row-data="courseDetailsStore.lectures"
				:uniq-identifier="uniqIdentifier" @cellValueChanged="onCellEdit($event)"
				@deleteRow="onLectureDelete($event)" @rowClick="onLectureSelect($event)" />
		</div>
		<div v-if="courseDetailsStore.selectedHomework">
			<HomeworkWidget></HomeworkWidget>
		</div>
		<CreateLectureModal @lectureCreated="onLectureCreated()" :toggle-modal="isModalOpen"></CreateLEctureModal>
	</div>
</template> 

<script lang="ts">
import BaseTableEditable from "../baseComponents/BaseTableEditable.vue";
import { mapStores } from 'pinia';
import { useUserStore } from '../../store/user';
import { PropType } from "vue";
import { Course } from "../../api/models/course.model";
import BaseButton from "../baseComponents/BaseButton.vue";
import CreateMaterialModal from "../modals/CourseDetailsModals/CreateMaterialModal.vue";
import { useCourseDetailsStore } from "../../store/course-details.store";
import CreateCommentModal from "../modals/CourseDetailsModals/CreateCommentModal.vue";
import { deleteLecture, updateLectureById } from "../../api/lectures";
import { Lecture } from "../../api/models/lecture.model";
import {UpdateEvent} from "../../api/models/update.model"
import HomeworkWidget from "./HomeworkWidget.vue";
import CreateLectureModal from "../modals/CourseDetailsModals/CreateLectureModal.vue";
import Spinner from "../Spinner.vue";
export default {
	components: {
		BaseTableEditable,
		BaseButton,
		CreateMaterialModal,
		CreateCommentModal,
		HomeworkWidget,
		CreateLectureModal,
		Spinner
	},
	props: {
		currentCourse: {
			type: Object as PropType<Course>
		}
	},
	data(): {
		columnDefs: any,
		uniqIdentifier: any,
		isModalOpen: boolean,
	} {
		return {
			columnDefs: [],
			uniqIdentifier: 'id',
			isModalOpen: true,
		};
	},
	computed: {
		...mapStores(useUserStore, useCourseDetailsStore),
		mentorsOptions() {
			return this.courseDetailsStore.mentors.map((mentor) => {
				return { label: mentor.fullName, value: mentor.id }
			});
		}
	},
	beforeMount() { 
		if (this.userStore.isAdmin || this.userStore.isMentor) {
			this.columnDefs = [
			{ field: "name", headerName: "Name", sortable: false, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 300, filter: true },
			{ field: "dateOfLecture", headerName: "Date", sortable: true, date: true, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 200, },
			{ field: "timeOfLecture", headerName: "Time", sortable: false, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 100 },
			{ field: "dateOfDeadline", headerName: "Homework deadline", sortable: true, date: true, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 200 },
			{ field: "mentor", headerName: "Mentor", sortable: true, editable: this.userStore.isAdmin, width: 200, dropdown: true, options: this.mentorsOptions, filter: true },
			{ field: "meet_link", headerName: "Meeting link", editable: this.userStore.isAdmin || this.userStore.isMentor, link: true, width: 300 },
			{ field: "presentation", headerName: "Presentation link", sortable: false, editable: this.userStore.isAdmin || this.userStore.isMentor, link: true, width: 300 },
			{ field: "", headerName: "Homework", sortable: false, editable: false, width: 120, actionColumn: true, homework: true, headerCentered:true },
			{ field: "", headerName: "Delete", sortable: false, editable: false, width: 120, actionColumn: true, delete: this.userStore.isAdmin,headerCentered:true }
		]
		}
		if (this.userStore.isStudent) {
			this.columnDefs = [
			{ field: "name", headerName: "Name", sortable: false, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 300, filter: true },
			{ field: "dateOfLecture", headerName: "Date", sortable: true, date: true, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 200, },
			{ field: "timeOfLecture", headerName: "Time", sortable: false, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 100 },
			{ field: "dateOfDeadline", headerName: "Homework deadline", sortable: true, date: true, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 200 },
			{ field: "mentor", headerName: "Mentor", sortable: true, editable: this.userStore.isAdmin, width: 200, dropdown: true, options: this.mentorsOptions, filter: true },
			{ field: "meet_link", headerName: "Meeting link",editable: false, link: true, width: 300 },
			{ field: "presentation", headerName: "Presentation link", sortable: false, editable: this.userStore.isAdmin || this.userStore.isMentor, link: true, width: 300 },
			{ field: "", headerName: "Homework", sortable: false, editable: false, width: 120, actionColumn: true, homework: true,headerCentered:true },
		]
		}
		
	},
	methods: {
		async onCellEdit(event: UpdateEvent<Lecture>) {
			if (event.colDef.field === 'mentor') {
				event.data.mentorId = event.newValue;
			}
			await this.courseDetailsStore.updateLecture(event);
		},
		onLectureSelect(id: string) {
			this.courseDetailsStore.selectLecture(id);
		},
		openModal() {
			this.isModalOpen = !this.isModalOpen;
		},
		async onLectureCreated() {
			this.courseDetailsStore.fetchLectures();
		},
		async onLectureDelete(lectureId: string) {
			await deleteLecture(lectureId);
			this.courseDetailsStore.resetLecture();
			this.courseDetailsStore.fetchLectures();
		}
	}
};
</script>
  
<style lang="scss" scoped>
.lecture__container {
	@apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full;
}

.lecture__header {
	@apply text-xl text-gray-700
}
</style>