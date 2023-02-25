<template>
	<div class="guide__container">
		<div class="guide__header_container">
			<div class="guide__header">Guide adding</div>
			<div>
				<BaseButton v-if="(guideStore.guides.length < 2)" @click="openModal()">
					Add new guide
				</BaseButton>
			</div>
		</div>
		<div class="guide__widget">
			<BaseTableEditable :column-defs="columnDefs" :row-data="guideStore.guides" uniq-identifier="id"
				@deleteRow="onGuideDelete($event)" @cellValueChanged="onGuideEdit($event)" />
		</div>
		<CreateGuideModal :toggleModal="isModalOpen" :guidesOptions="availableGuides"></CreateGuideModal>
	</div>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import BaseTableEditable from '../components/baseComponents/BaseTableEditable.vue';
import Spinner from '../components/Spinner.vue';
import { useGuideStore } from '../store/guides';
import { Guide } from '../api/models/guide.model';
import { guideRoleOptions } from '../models/guide-role.model'
import BaseButton from '../components/baseComponents/BaseButton.vue';
import CreateGuideModal from '../components/modals/CourseDetailsModals/CreateGuideModal.vue';
import { SelectItem } from '../models/options.model';
import { IColumnDefs } from '../api/models/base-table.model';


export default {
	components: { BaseTableEditable, Spinner, BaseButton, CreateGuideModal },
	mounted() {
		this.guideStore.fetchGuides();
	},
	data(): {
		isModalOpen: boolean,
		columnDefs: IColumnDefs[]
	} {
		return {
			isModalOpen: false,
			columnDefs: [
				{ field: "roleLabel", headerName: "Name", editable: false, sortable: true, minWidth: 150, width: 400, dropdown: true,options: guideRoleOptions },
				{ field: "link", headerName: "Link", sortable: true, editable: true, minWidth: 150, width: 400, link: true },
				{ field: "", headerName: "Delete", sortable: false, editable: false, width: 120, actionColumn: true, delete: true ,headerCentered:true },
			],
		};
	},
	methods: {
		async onGuideDelete(guideId: string) {
			this.guideStore.deleteGuide(guideId);
		},
		async onGuideEdit(event: { uniqIdentifier: string, data: Guide }) {
			this.guideStore.updateGuideById(event.uniqIdentifier, event.data);
		},
		openModal() {
			this.isModalOpen = !this.isModalOpen;
		}

	},
	computed: {
		...mapStores(useGuideStore),
		availableGuides(): SelectItem[] {
			return guideRoleOptions.filter(option => this.guideStore.guides.findIndex(guide => guide.role === option.value) < 0)
		}
	}

}
</script>
<style lang="css" scoped>
.guide__container {
	@apply p-10 bg-primary-100 min-h-full
}

.guide__header_container {
	@apply flex justify-between items-center mb-6
}

.guide__header {
	@apply font-semibold text-lg text-start text-primary-700;
}

.guide__widget {
	@apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full
}
</style>
