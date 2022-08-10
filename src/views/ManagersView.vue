/* eslint-disable no-console *
<template>
  <div class="managers__container">
    <div class="managers__topbar_container">
      <div>
        <h2 class="managers__header">
          Managers Dashboard
        </h2>
        <h3 class="managers__subheader">
          Managers list of InventorSoft Academy
        </h3>
      </div>
      <div>
        <BaseButton
          :loading="isManagersLoading"
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
import BaseTable from '@/components/BaseComponents/BaseTable/BaseTable.vue';
import BaseButton from '@/components/BaseComponents/BaseButton.vue';
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
    ...mapActions('managers', ['fetchManagers']),
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

<style lang="postcss" scoped>
.managers__container {
  @apply w-full p-10 mx-auto flex flex-col justify-start items-start;
}

.managers__topbar_container {
  @apply w-full flex justify-between items-center;
}

.managers__header {
  @apply font-semibold text-lg text-start text-sky-700;
}

.managers__subheader {
  @apply mt-2 font-normal text-stone-400;
}

.managers__table_container {
  @apply w-full border-2 border-stone-200 shadow-md rounded-md mt-5 p-5
}
</style>
