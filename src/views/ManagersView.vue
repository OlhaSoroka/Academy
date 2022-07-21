/* eslint-disable no-console *
<template>
  <div class="w-2/3 mt-10 mx-auto flex flex-col justify-start items-start">
    <div class="w-full flex justify-between items-center">
      <div>
        <h2 class="font-semibold text-start text-sky-700">
          Managers Dashboard
        </h2>
        <h3 class="mt-2 font-normal text-stone-400">
          Managers list of InventorSoft Academy
        </h3>
      </div>
      <div>
        <BaseButton
          variant="btn_blue"
          @click="toggleCreateUpdateModal(null, false)"
        >
          Add new manager
        </BaseButton>
      </div>
    </div>
    <div class="w-full border-2 border-stone-200 shadow-md rounded-md mt-5 p-5">
      <BaseTable
        :table-data="{
          headingData: [{ fullName: 'Fullname' }, { email: 'Email' }],
          bodyData: managers,
        }"
        :edit-btns="true"
        :is-data-loading="isManagersLoading"
        :delete-btns="true"
        @delete="toggleDeleteManagerModal($event)"
        @edit="toggleCreateUpdateModal($event, true)"
      />
    </div>
    <CreateUpdateManagerModal
      :manager="selectedManager"
      :update-mode="isUpdateMode"
      :toggle-modal="isCreateUpdateModalOpen"
    />
    <DeleteManagerModal
      :manager="selectedManager"
      :toggle-modal="isDeleteModalOpen"
    />
  </div>
</template>
<script>
import BaseTable from '@/components/UI/BaseTable/BaseTable.vue';
import BaseButton from '@/components/BaseButton.vue';
import DeleteManagerModal from '@/components/Modals/DeleteManagerModal.vue';
import CreateUpdateManagerModal from '@/components/Modals/CreateUpdateManagerModal.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
	components: {
		BaseTable,
		BaseButton,
		CreateUpdateManagerModal,
		DeleteManagerModal,
	},
	data() {
		return {
			selectedManagerId: null,
			isCreateUpdateModalOpen: false,
			isUpdateMode: false,
			isDeleteModalOpen: false,
		};
	},
	computed: {
		...mapGetters('managers', ['managers', 'isManagersLoading']),
		selectedManager() {
			return this.managers.find((manager) => {
				return manager.id === this.selectedManagerId;
			});
		},
	},
	async mounted() {
		await this.fetchManagers();
	},
	methods: {
		...mapActions('managers', ['fetchManagers', 'deleteManager']),
		toggleCreateUpdateModal(id, updateMode) {
      this.selectedManagerId = id;
			this.isUpdateMode = updateMode;
			this.isCreateUpdateModalOpen = !this.isCreateUpdateModalOpen;
		},
		toggleDeleteManagerModal(id) {
      this.selectedManagerId = id;
			this.isDeleteModalOpen = !this.isDeleteModalOpen;
		},
	},
};
</script>

<style></style>
