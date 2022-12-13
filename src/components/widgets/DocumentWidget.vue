<template>
	<div class="document__container ">
		<div class="flex align-middle justify-between">
			<div class="flex items-center">
				<h2 class="document__header mr-3">Documents</h2>
				<Spinner v-if="courseDetailsStore.documentsWidgetLoading"/>
			</div>
			<div>
				<BaseButton v-if="userStore.isAdmin || userStore.isMentor" @click="openModal()">
					Add
				</BaseButton>
			</div>
		</div>
		<div class="mt-5 min-h-[130px]">
			<BaseTableEditable :column-defs="columnDefs" :row-data="courseDetailsStore.documents"
				:uniq-identifier="uniqIdentifier" @cellValueChanged="onCellEdit($event)"
				@deleteRow="onDocumentDelete($event)" />
		</div>
		<CreateDocumentModal :toggle-modal="isModalOpen" @documentAdded="onNewDocumentAdded" />
	</div>
</template>

<script lang="ts">
import BaseTableEditable from "../baseComponents/BaseTableEditable.vue";
import { mapStores } from 'pinia';
import { useUserStore } from '../../store/user';
import { PropType } from "vue";
import { Course } from "../../api/models/course.model";
import BaseButton from "../baseComponents/BaseButton.vue";
import { deleteDocument, updateDocumentById } from "../../api/document";
import { Document } from "../../api/models/documents.model";
import { useCourseDetailsStore } from "../../store/course-details.store";
import Spinner from "../baseComponents/spinner/Spinner.vue";
import CreateDocumentModal from "../modals/CourseDetailsModals/CreateDocumentModal.vue";
export default {
	components: {
    BaseTableEditable,
    BaseButton,
    Spinner,
    CreateDocumentModal
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
	},
	beforeMount() {
		if (this.userStore.isStudent) {
			this.columnDefs = [
				{ field: "name", headerName: "Document name", sortable: true, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 400 , filter:true  },
				{ field: "link", headerName: "Document link", sortable: true, editable: this.userStore.isAdmin || this.userStore.isMentor, link:true,  width: 400 },
			]
		}
		if (this.userStore.isAdmin || this.userStore.isMentor) {
			this.columnDefs = [
				{ field: "name", headerName: "Document name", sortable: true, editable:this.userStore.isAdmin || this.userStore.isMentor, width: 400 , filter:true },
				{ field: "link", headerName: "Document link", sortable: true, editable: this.userStore.isAdmin || this.userStore.isMentor, link:true,  width: 400 },
				{ field: "", headerName: "", sortable: false, editable: false, width: 120, actionColumn: true, delete: this.userStore.isAdmin || this.userStore.isMentor },
			]
		}
	},
	methods: {
		async onCellEdit(event: { uniqIdentifier: string, data: Document }) {
			await updateDocumentById(event.uniqIdentifier, event.data);
			this.courseDetailsStore.updatedDocuments();
		},
		openModal() {
			this.isModalOpen = !this.isModalOpen;
		},
		onNewDocumentAdded() {
			this.courseDetailsStore.updatedDocuments();
		},
		async onDocumentDelete(materialId: string) {
			await deleteDocument(materialId);
			this.courseDetailsStore.updatedDocuments();
		}
	}
};
</script>
  
<style lang="scss" scoped>
.document__container {
	@apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full;
}

.document__header {
	@apply text-xl text-gray-700
}
</style>
  