<template>
	<div class="material__container">
		<div class="flex align-middle justify-between">
			<div class="material__header flex">
				<div>Comments</div>
				<div v-if="courseDetailsStore.commentsWidgetLoading">...Loading...</div>
			</div>
			<div>
				<BaseButton @click="openModal()">
					<PlusIcon />
				</BaseButton>
			</div>
		</div>
		<div class="mt-4">
			<BaseTableEditable :column-defs="columnDefs" :row-data="courseDetailsStore.comments"
				:uniq-identifier="uniqIdentifier" @cellValueChanged="onCellEdit($event)"
				@deleteRow="onCommentDelete($event)" />
		</div>
		<CreateCommentModal :toggle-modal="isModalOpen" @commentsAdded="onNewCommentAdded" />
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
import PlusIcon from "../baseComponents/icons/PlusIcon.vue";
import { useCourseDetailsStore } from "../../store/course-details.store";
import CreateCommentModal from "../modals/CourseDetailsModals/CreateCommentModal.vue";
import { Comment } from "../../api/models/comment.model";
import { deleteComment, updateCommentById } from "../../api/comments";
export default {
	components: {
		BaseTableEditable,
		BaseButton,
		PlusIcon,
		CreateCommentModal,
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
		}
	},
	beforeMount() {
		this.columnDefs = [
			{ field: "message", headerName: "Message", sortable: true, editable: this.isAdmin || this.isMentor, width: 400 },
			{ field: "author", headerName: "Author", sortable: true, editable: false, width: 400 },
			{ field: "createdAt", headerName: "Date", sortable: true, editable: false, width: 400 },
			{ field: "", headerName: "", sortable: false, editable: false, width: 120, actionColumn: true, delete: true }
		]
	},
	methods: {
		async onCellEdit(event: { uniqIdentifier: string, data: Comment }) {
			await updateCommentById(event.uniqIdentifier, event.data);
			this.courseDetailsStore.updateComments();

		},
		async onCommentDelete(commentId: string) {
			await deleteComment(commentId);
			this.courseDetailsStore.updateComments();
		},
		openModal() {
			this.isModalOpen = !this.isModalOpen;
		},
		onNewCommentAdded() {
			this.courseDetailsStore.updateComments();
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
  