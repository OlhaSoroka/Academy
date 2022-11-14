<template>
	<div class="material__container ">
		<div class="flex align-middle justify-between">
			<div class="material__header">
				Materials
			</div>
			<div>
				<BaseButton @click="openModal()">
					<BasePlus />
				</BaseButton>
			</div>
		</div>


		<div class="mt-4">
			<BaseTableEditable :column-defs="columnDefs" :row-data="courseDetailsStore.materials"
				:uniq-identifier="uniqIdentifier" @cellValueChanged="onCellEdit($event)"
				@deleteRow="onMaterialDelete($event)" />
		</div>
		<NewMaterialModal :toggle-modal="isModalOpen" @materialAdded="onNewMaterialAdded" />
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
import { deleteMaterial, getMaterialsByCourse, updateMaterialById } from "../../api/materials";
import { Material } from "../../api/models/material.model";
import { getCourseById } from "../../api/course";
import { useCourseDetailsStore } from "../../store/course-details.store";
export default {
	components: {
		BaseTableEditable,
		BaseButton,
		BasePlus,
		NewMaterialModal
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
			{ field: "name", headerName: "Materials name", sortable: true, editable: this.isAdmin, width: 400 },
			{ field: "link", headerName: "Materials link", sortable: true, editable: this.isAdmin, width: 400 },
			{ field: "", headerName: "", sortable: false, editable: false, width: 20, actionColumn: true, delete: true },
		]
	},
	methods: {
		async onCellEdit(event: { uniqIdentifier: string, data: Material }) {
			await updateMaterialById(event.uniqIdentifier, event.data);
			this.courseDetailsStore.updatedMaterials();

		},
		openModal() {
			this.isModalOpen = !this.isModalOpen;
		},
		onNewMaterialAdded() {
			this.courseDetailsStore.updatedMaterials();
		},
		async onMaterialDelete(materialId: string) {
			await deleteMaterial(materialId);
			this.courseDetailsStore.updatedMaterials();
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
  