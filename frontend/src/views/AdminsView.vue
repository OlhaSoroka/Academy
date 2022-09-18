/* eslint-disable no-console *
<template>
  <div class="admins__container">
    <div class="admins__topbar_container">
      <div>
        <h2 class="admins__header">
          Admins Dashboard
        </h2>
        <h3 class="admins__subheader">
          Admins list of InventorSoft Academy
        </h3>
      </div>
      <div>
        <BaseButton
          :loading="isAdminsLoading"
          @click="toggleCreateUpdateModal(null, false)"
        >
          Add new admin
        </BaseButton>
      </div>
    </div>
    <div class="admins__table_container">
      <BaseTable
        :table-data="{
          headingData: [{ fullName: 'Full Name' }, { email: 'Email' }],
          bodyData: admins,
        }"
        :edit-btns="true"
        :is-data-loading="isAdminsLoading"
        :delete-btns="true"
        @delete="toggleDeleteAdminModal($event)"
        @edit="toggleCreateUpdateModal($event, true)"
      />
    </div>
    <CreateUpdateAdminModal
      :admin="selectedAdmin"
      :update-mode="isUpdateMode"
      :toggle-modal="isCreateUpdateModalOpen"
    />
    <BaseDeleteModal
      :toggle-modal="isDeleteModalOpen"
      :target-value="fullName"
      @delete="submitDelete"
    />
  </div>
</template>
<script>
import BaseTable from "@/components/BaseComponents/BaseTable/BaseTable.vue";
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import CreateUpdateAdminModal from "@/components/Modals/CreateUpdateAdminModal.vue";
import BaseDeleteModal from "../components/BaseComponents/BaseDeleteModal";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    BaseTable,
    BaseButton,
    CreateUpdateAdminModal,
    BaseDeleteModal,
  },
  data() {
    return {
      selectedAdminId: null,
      isCreateUpdateModalOpen: false,
      isUpdateMode: false,
      isDeleteModalOpen: false,
      fullName: null,
    };
  },
  computed: {
    ...mapGetters("admins", ["admins", "isAdminsLoading"]),
    selectedAdmin() {
      return this.admins.find((admins) => {
        return admins.id === this.selectedAdminId;
      });
    },
  },
  async mounted() {
    await this.fetchAdmins();
  },
  methods: {
    ...mapActions("admins", ["fetchAdmins", "deleteAdmin"]),
    toggleCreateUpdateModal(id, updateMode) {
      this.selectedAdminId = id;
      this.isUpdateMode = updateMode;
      this.isCreateUpdateModalOpen = !this.isCreateUpdateModalOpen;
    },
    toggleDeleteAdminModal(id) {
      this.selectedAdminId = id;
      this.isDeleteModalOpen = !this.isDeleteModalOpen;
      this.fullName = this.selectedAdmin.fullName;
      console.log(this.selectedAdmin.fullName, "selectedAdmin");
    },
    submitDelete() {
      this.deleteAdmin(this.selectedAdminId);
    },
  },
};
</script>

<style lang="postcss" scoped>
.admins__container {
  @apply w-full p-10 mx-auto flex flex-col justify-start items-start;
}

.admins__topbar_container {
  @apply w-full flex justify-between items-center;
}

.admins__header {
  @apply font-semibold text-lg text-start text-sky-700;
}

.admins__subheader {
  @apply mt-2 font-normal text-stone-400;
}

.admins__table_container {
  @apply w-full border-2 border-stone-200 shadow-md rounded-md mt-5 p-5 bg-white;
}
</style>
