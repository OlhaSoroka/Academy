<template>
	<div class="material__container">
		<div class="flex align-middle justify-between">
			<div class="material__header">
				Lectures
			</div>
			<div>
				<BaseButton @click="openModal()">
					<BasePlus />
				</BaseButton>
			</div>
		</div>


		<div class="mt-4">
			<BaseTableEditable :column-defs="columnDefs" :row-data="courseDetailsStore.lectures"
				:uniq-identifier="uniqIdentifier" @cellValueChanged="onCellEdit($event)"
				@rowClick="onLectureSelect($event)" />
		</div>

		<div>
			<HomeworkWidget></HomeworkWidget>
		</div>
		<CreateLectureModal @lectureCreated="onLectureCreated()" :toggle-modal="isModalOpen"></CreateLEctureModal>
	</div>
</template> 

<script lang="ts">
import { ROLES } from "../../models/router.model";
import BaseTableEditable from "../baseComponents/BaseTableEditable.vue";
import { mapStores } from 'pinia';
import { useUserStore } from '../../store/user';
import { PropType } from "vue";
import { Course } from "../../api/models/course.model";
import BaseButton from "../baseComponents/BaseButton.vue";
import BasePlus from "../baseComponents/BaseIcons/BasePlus.vue";
import NewMaterialModal from "../modals/CourseDetailsModals/NewMaterialModal.vue";
import { useCourseDetailsStore } from "../../store/course-details.store";
import NewCommentModal from "../modals/CourseDetailsModals/NewCommentModal.vue";
import { updateLectureById } from "../../api/lectures";
import { Lecture } from "../../api/models/lecture.model";
import HomeworkWidget from "./HomeworkWidget.vue";
import CreateLectureModal from "../modals/CourseDetailsModals/CreateLectureModal.vue";
export default {
	components: {
		BaseTableEditable,
		BaseButton,
		BasePlus,
		NewMaterialModal,
		NewCommentModal,
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

		isAdmin() {
			if (this.userStore.user) {
				return this.userStore.user.role === ROLES.ADMIN_ROLE
			}
		},
		isMentor() {
			if (this.userStore.user) {
				return this.userStore.user.role === ROLES.MENTOR_ROLE
			}
		},
		isStudent() {
			if (this.userStore.user) {
				return this.userStore.user.role === ROLES.STUDENTS_ROLE
			}
		},
		mentorsOptions() {
			return this.courseDetailsStore.mentors.map((mentor) => {
				return { label: mentor.fullName, value: mentor.id }
			});
		}

	},
	beforeMount() {
		this.columnDefs = [
			{ field: "name", headerName: "Name", sortable: true, editable: this.isAdmin || this.isMentor, width: 300 },
			{ field: "dateOfDeadline", headerName: "Homework Deadline", sortable: true, date: true, editable: this.isAdmin || this.isMentor, width: 200 },
			{ field: "dateOfLecture", headerName: "Lecture Date", sortable: true, date: true, editable: this.isAdmin || this.isMentor, width: 200 },
			{ field: "mentor", headerName: "Mentor", sortable: true, editable: this.isAdmin || this.isMentor, width: 200, dropdown: true, options: this.mentorsOptions },
			{ field: "presentation", headerName: "Presentation", sortable: true, editable: this.isAdmin || this.isMentor, width: 300 },
			{ field: "", headerName: "", sortable: false, editable: false, width: 20, actionColumn: true, homework: true },
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
			console.log(this.mentorsOptions);

		},
		openModal() {
			this.isModalOpen = !this.isModalOpen;
		},
		async onLectureCreated() {
			this.courseDetailsStore.updateLectures();
		}
	}
};
</script>
  
<style lang="postcss" scoped>
.material__container {
	@apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full;
}

.material__header {
	@apply text-xl text-gray-700
}
</style>
  