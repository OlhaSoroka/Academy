<template>
	<div class="material__container">
		<div class="flex align-middle justify-between">
			<div class="material__header flex">
				<div>Lectures</div>
				<div v-if="courseDetailsStore.lecturesWidgetLoading">...Loading...</div>
			</div>
			<div>
				<BaseButton v-if="userStore.isAdmin||userStore.isMentor" @click="openModal()">
					<PlusIcon />
				</BaseButton>
			</div>
		</div>


		<div class="mt-4">
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
import PlusIcon from "../baseComponents/icons/PlusIcon.vue";
import CreateMaterialModal from "../modals/CourseDetailsModals/CreateMaterialModal.vue";
import { useCourseDetailsStore } from "../../store/course-details.store";
import CreateCommentModal from "../modals/CourseDetailsModals/CreateCommentModal.vue";
import { deleteLecture, updateLectureById } from "../../api/lectures";
import { Lecture } from "../../api/models/lecture.model";
import HomeworkWidget from "./HomeworkWidget.vue";
import CreateLectureModal from "../modals/CourseDetailsModals/CreateLectureModal.vue";
export default {
	components: {
		BaseTableEditable,
		BaseButton,
		PlusIcon,
		CreateMaterialModal,
		CreateCommentModal,
		HomeworkWidget,
		CreateLectureModal
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
		this.columnDefs = [
			{ field: "name", headerName: "Name", sortable: true, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 300 },
			{ field: "dateOfLecture", headerName: "Date", sortable: true, date: true, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 200 },
			{ field: "timeOfLecture", headerName: "Time", sortable: true, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 100 },
			{ field: "dateOfDeadline", headerName: "Homework Deadline", sortable: true, date: true, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 200 },
			{ field: "mentor", headerName: "Mentor", sortable: true, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 200, dropdown: true, options: this.mentorsOptions },
			{ field: "presentation", headerName: "Presentation", sortable: true, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 300 },
			{ field: "", headerName: "", sortable: false, editable: false, width: 120, actionColumn: true, homework: true, delete:this.userStore.isAdmin || this.userStore.isMentor },
		]
	},
	methods: {
		async onCellEdit(event: { uniqIdentifier: string, data: Lecture, colDef: { field: string }, newValue: string }) {
			if (event.colDef.field === 'mentor') {
				event.data.mentorId = event.newValue;
			}
			await updateLectureById(event.uniqIdentifier, event.data);
			this.courseDetailsStore.updateLectures();
		},
		async onLectureSelect(id: string) {
			this.courseDetailsStore.selectLecture(id);
		},
		openModal() {
			this.isModalOpen = !this.isModalOpen;
		},
		async onLectureCreated() {
			this.courseDetailsStore.updateLectures();
		},
		async onLectureDelete(lectureId: string) {
			await deleteLecture(lectureId);
			this.courseDetailsStore.resetLecture();
			this.courseDetailsStore.updateLectures();
		}
	}
};
</script>
  
<style lang="scss" scoped>
.material__container {
	@apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full;
}

.material__header {
	@apply text-xl text-gray-700
}
</style>