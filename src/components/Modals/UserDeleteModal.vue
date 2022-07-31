<template>
  <BaseModal
    ref="userDeleteModal"
    :header="'Confirm delete'"
  >
    <template #body>
      <div v-if="targetUserValue">
        Do you really want to delete
        <span class="font-bold">{{ targetUserValue.fullName }}</span>?
      </div>
      <div class="flex justify-center mt-7">
        <div class="mx-1">
          <BaseButton
            :variant="'btn_red'"
            @click="submitUserDeleteButton(targetUserValue.id)"
          >
            Delete
          </BaseButton>
        </div>
        <div class="mx-1">
          <BaseButton @click="cancelUserDeleteButton">
            Cancel
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import BaseModal from "@/components/BaseComponents/BaseModal.vue";
import { mapActions } from "vuex";
export default {
  components: { BaseButton, BaseModal },
  props: {
    isOpenedUserDeleteModal: {
      type: Boolean,
      default: false,
    },
    targetUserValue: {
      type: Object,
      default: null,
    },
  },
  watch: {
    isOpenedUserDeleteModal() {
      this.$refs.userDeleteModal.openModal();
    },
  },
  methods: {
    ...mapActions("users", ["deleteUser"]),
    submitUserDeleteButton(id) {
      this.deleteUser(id);
      this.$refs.userDeleteModal.closeModal();
    },
    cancelUserDeleteButton() {
      this.$refs.userDeleteModal.closeModal();
    },
  },
};
</script>
