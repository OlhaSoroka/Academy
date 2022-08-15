<template>
  <BaseModal
    ref="baseDeleteModal"
    :header="'Confirm delete'"
  >
    <template #body>
      <div
        v-if="targetValue"
        class="max-w-md"
      >
        Do you really want to delete:
        <span class="font-bold break-all">{{ targetValue }}</span>?
      </div>
      <div class="flex justify-evenly mt-5">
        <div class="mx-2">
          <BaseButton
            :variant="'btn_red'"
            @click="submit()"
          >
            Delete
          </BaseButton>
        </div>
        <div class="mx-2">
          <BaseButton @click="cancel">
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
export default {
  name: "BaseDeleteModal",
  components: { BaseButton, BaseModal },
  props: {
    toggleModal: {
      type: Boolean,
      default: false,
    },
    targetValue: {
      type: [Object, Array, String],
      default: null,
    },
  },
  data() {
    return {
      test: {},
    };
  },
  watch: {
    toggleModal() {
      this.$refs.baseDeleteModal.openModal();
    },
  },
  methods: {
    submit() {
      this.$emit("delete");
      this.$refs.baseDeleteModal.closeModal();
    },
    cancel() {
      this.$refs.baseDeleteModal.closeModal();
    },
  },
};
</script>
