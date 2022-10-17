/* eslint-disable no-console *
<template>
  <div class="mentors__container">
    <div class="mentors__topbar_container">
      <div>
        <h2 class="mentors__header">
          Mentors Dashboard
        </h2>
        <h3 class="mentors__subheader">
          Mentors list of InventorSoft Academy
        </h3>
      </div>
      <div>
        <BaseButton
          :loading="isMentorsLoading"
          @click="toggleCreateUpdateModal(null, false)"
        >
          Add new mentor
        </BaseButton>
      </div>
    </div>
    <div class="mentors__table_container">
      <BaseTable
        :table-data="{
          headingData: [{ fullName: 'Full Name' }, { email: 'Email' }],
          bodyData: mentors,
        }"
        :edit-btns="true"
        :is-data-loading="isMentorsLoading"
        :delete-btns="true"
        @delete="toggleDeleteMentorModal($event)"
        @edit="toggleCreateUpdateModal($event, true)"
      />
    </div>
    <CreateUpdateMentorModal
      :mentor="selectedMentor"
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
import CreateUpdateMentorModal from "@/components/Modals/CreateUpdateMentorModal.vue";
import BaseDeleteModal from "../components/BaseComponents/BaseDeleteModal";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    BaseTable,
    BaseButton,
    CreateUpdateMentorModal,
    BaseDeleteModal,
  },
  data() {
    return {
      selectedMentorId: null,
      isCreateUpdateModalOpen: false,
      isUpdateMode: false,
      isDeleteModalOpen: false,
      fullName: null,
    };
  },
  computed: {
    ...mapGetters("mentors", ["mentors", "isMentorsLoading"]),
    selectedMentor() {
      return this.mentors.find((mentor) => {
        return mentor.id === this.selectedMentorId;
      });
    },
  },
  async mounted() {
    await this.fetchMentors();
  },
  methods: {
    ...mapActions("mentors", ["fetchMentors", "deleteMentor"]),
    toggleCreateUpdateModal(id, updateMode) {
      this.selectedMentorId = id;
      this.isUpdateMode = updateMode;
      this.isCreateUpdateModalOpen = !this.isCreateUpdateModalOpen;
    },
    toggleDeleteMentorModal(id) {
      this.selectedMentorId = id;
      this.isDeleteModalOpen = !this.isDeleteModalOpen;
      this.fullName = this.selectedMentor.fullName;
    },
    submitDelete() {
      this.deleteMentor(this.selectedMentorId);
    },
  },
};
</script>

<style lang="postcss" scoped>
.mentors__container {
  @apply w-full p-10 mx-auto flex flex-col justify-start items-start;
}

.mentors__topbar_container {
  @apply w-full flex justify-between items-center;
}

.mentors__header {
  @apply font-semibold text-lg text-start text-primary-700;
}

.mentors__subheader {
  @apply mt-2 font-normal text-stone-400;
}

.mentors__table_container {
  @apply w-full border-2 border-stone-200 shadow-md rounded-md mt-5 p-5 bg-white;
}
</style>
